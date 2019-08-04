//
//  Channel.swift
//  VowLink
//
//  Created by Indutnyy, Fedor on 8/1/19.
//  Copyright © 2019 Indutnyy, Fedor. All rights reserved.
//

import Foundation
import Sodium

protocol ChannelDelegate : AnyObject {
    func channel(_ channel: Channel, postedMessage message: ChannelMessage)
}

enum ChannelError : Error {
    case incomingMessageNotEncrypted
    case invalidSignature
    case invalidParentCount
    case parentNotFound(Bytes)
    case invalidHeight(UInt64)
    case invalidTimestamp(TimeInterval)
}

class Channel {
    let context: Context
    let publicKey: Bytes
    var name: String
    
    // TODO(indutny): sort in a CRDT way
    var messages = [ChannelMessage]()
    var leafs = [ChannelMessage]()
    var chain: Chain
    
    weak var delegate: ChannelDelegate? = nil
    
    lazy var channelID: Bytes = {
        return self.context.sodium.genericHash.hash(message: publicKey,
                                                    key: "vowlink-channel-id".bytes,
                                                    outputLength: Channel.CHANNEL_ID_LENGTH)!
    }()
    
    var rootHash: Bytes!
    
    static let CHANNEL_ID_LENGTH = 32
    static let FUTURE: TimeInterval = 10.0 // seconds
    
    init(context: Context, publicKey: Bytes, name: String, rootHash: Bytes, chain: Chain) {
        self.context = context
        self.publicKey = publicKey
        self.name = name
        self.rootHash = rootHash
        self.chain = chain
    }
    
    convenience init(context: Context, proto: Proto_Channel) throws {
        let links = proto.chain.map { (link) -> Link in
            return Link(context: context, link: link)
        }
        self.init(context: context,
                  publicKey: Bytes(proto.publicKey),
                  name: proto.name,
                  rootHash: Bytes(proto.rootHash),
                  chain: Chain(context: context, links: links))
        
        for protoMessage in proto.messages {
            let message = try ChannelMessage(context: context, proto: protoMessage)
            messages.append(try! message.decrypted(withChannel: self))
        }
        
        leafs = try computeLeafs()
    }
    
    init(_ identity: Identity) throws {
        self.context = identity.context
        self.publicKey = identity.publicKey
        self.name = identity.name
        self.chain = Chain(context: identity.context, links: [])
        
        // Only a temporary measure, we should be fine
        rootHash = nil
        
        let content = try identity.signContent(chain: chain,
                                               timestamp: NSDate().timeIntervalSince1970,
                                               json: "{\"type\":\"root\"}",
                                               parents: [],
                                               height: 0)
        let unencryptedRoot = try! ChannelMessage(context: context,
                                                  channelID: channelID,
                                                  content: .decrypted(content),
                                                  height: 0)
        let encryptedRoot = try unencryptedRoot.encrypted(withChannel: self)
        
        rootHash = encryptedRoot.hash!
        messages.append(unencryptedRoot)
        
        leafs = try computeLeafs()
    }
    
    func toProto() -> Proto_Channel {
        return Proto_Channel.with({ (channel) in
            channel.publicKey = Data(self.publicKey)
            channel.name = self.name
            channel.rootHash = Data(self.rootHash)
            channel.messages = self.messages.map({ (message) -> Proto_ChannelMessage in
                let encrypted = try! message.encrypted(withChannel: self)
                return encrypted.toProto()!
            })
            channel.chain = chain.links.map({ (link) -> Proto_Link in
                return link.toProto()
            })
        })
    }
    
    func message(byHash hash: Bytes) -> ChannelMessage? {
        for message in messages {
            let encrypted = try! message.encrypted(withChannel: self)
            if context.sodium.utils.equals(hash, encrypted.hash!) {
                return message
            }
        }
        
        return nil
    }

    func post(message json: String, by identity: Identity) throws -> ChannelMessage {
        let parents = try leafs.map({ (leaf) -> Bytes in
            return try leaf.encrypted(withChannel: self).hash!
        })
        let height = leafs.reduce(0) { (acc, leaf) -> UInt64 in
            return max(acc, leaf.height)
        } + 1
        
        let content = try identity.signContent(chain: chain,
                                               timestamp: NSDate().timeIntervalSince1970,
                                               json: json,
                                               parents: parents,
                                               height: height)
        
        let decrypted = try ChannelMessage(context: context,
                                           channelID: channelID,
                                           content: .decrypted(content),
                                           height: height,
                                           parents: parents)
        
        let encrypted = try decrypted.encrypted(withChannel: self)
        
        self.leafs = [ decrypted ]
        self.messages.append(decrypted)
        
        self.delegate?.channel(self, postedMessage: encrypted)
        
        return encrypted
    }
    
    // NOTE: It is important to receive encrypted message, so that its hash won't change
    func receive(encrypted: ChannelMessage) throws -> ChannelMessage {
        if !encrypted.isEncrypted {
            throw ChannelError.incomingMessageNotEncrypted
        }
        
        let decrypted = try encrypted.decrypted(withChannel: self)
        let isValid = try decrypted.verify(withChannel: self)
        
        if !isValid {
            throw ChannelError.invalidSignature
        }
        
        guard case .decrypted(let content) = decrypted.content else {
            fatalError("Unexpected content")
        }
        
        // Only root can sign root message
        if decrypted.parents.count == 0 && content.chain.links.count != 0 {
            throw ChannelError.invalidParentCount
        }
        
        var height: UInt64 = 0
        var parentTimestamp: TimeInterval = 0.0
        for parentHash in decrypted.parents {
            guard let parent = self.message(byHash: parentHash) else {
                throw ChannelError.parentNotFound(parentHash)
            }
            
            guard case .decrypted(let parentContent) = parent.content else {
                fatalError("Unexpected parent content")
            }
            
            height = max(height, parent.height + 1)
            parentTimestamp = max(parentTimestamp, parentContent.timestamp)
        }
        if height != decrypted.height {
            throw ChannelError.invalidHeight(decrypted.height)
        }
        
        let now = NSDate().timeIntervalSince1970
        let future = now + Channel.FUTURE
        if content.timestamp >= future || content.timestamp < parentTimestamp {
            throw ChannelError.invalidTimestamp(content.timestamp)
        }
        
        self.messages.append(decrypted)
        self.leafs = try computeLeafs()
        
        self.delegate?.channel(self, postedMessage: encrypted)
        
        return decrypted
    }
    
    private func computeLeafs() throws -> [ChannelMessage] {
        var parents = Set<Bytes>()
        for message in messages {
            for parentHash in message.parents {
                parents.insert(parentHash)
            }
        }
        
        var result = [ChannelMessage]()
        
        for message in messages {
            // NOTE: This is actually cached
            let encrypted = try message.encrypted(withChannel: self)
            
            if !parents.contains(encrypted.hash!) {
                result.append(message)
            }
        }
        
        return result
    }
}
