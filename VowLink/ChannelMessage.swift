//
//  ChannelMessage.swift
//  VowLink
//
//  Created by Indutnyy, Fedor on 8/3/19.
//  Copyright © 2019 Indutnyy, Fedor. All rights reserved.
//

import Foundation
import Sodium

// TODO(indutny): implement EncryptedChannelMessage for the memory pools of non-subscribers
class ChannelMessage {
    struct Content {
    }

    let context: Context
    let channel: Channel
    let nonce: Bytes
    let height: UInt64
    let parents: [ChannelMessage]
    var content: Content
    
    lazy var hash: Bytes = {
        let message = try! toProto().serializedData()
        return self.context.sodium.genericHash.hash(message: Bytes(message),
                                                    key: "vowlink-message".bytes,
                                                    outputLength: ChannelMessage.MESSAGE_HASH_LENGTH)!
    }()

    static let MESSAGE_HASH_LENGTH = 32
    static let NONCE_LENGTH = 32
    
    init(context: Context, channel: Channel, content: Content, nonce: Bytes? = nil, parents: [ChannelMessage] = []) {
        self.context = context
        self.channel = channel
        self.nonce = nonce ?? context.sodium.randomBytes.buf(length: ChannelMessage.NONCE_LENGTH)!
        self.parents = parents
        self.height = self.parents.reduce(0, { (result, parent) -> UInt64 in
            max(result, parent.height + 1)
        })
        self.content = content
    }
    
    func toProto() -> Proto_ChannelMessage {
        return Proto_ChannelMessage.with({ (proto) in
            proto.channelID = Data(self.channel.channelID)
            proto.nonce = Data(self.nonce)
            proto.height = height
            proto.parents = self.parents.map({ (parent) -> Data in
                return Data(parent.hash)
            })
        })
    }
}
