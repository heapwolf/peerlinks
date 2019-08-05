//
//  AppDelegate.swift
//  VowLink
//
//  Created by Indutnyy, Fedor on 7/29/19.
//  Copyright © 2019 Indutnyy, Fedor. All rights reserved.
//

import UIKit
import CoreData
import Sodium
import MultipeerConnectivity

protocol ChainNotificationDelegate: AnyObject {
    var boxPublicKey: Bytes? { get }
    var boxSecretKey: Bytes? { get }
    
    func chain(received chain: Chain)
}

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, PeerToPeerDelegate, ChannelDelegate, ChannelListDelegate {
    let context = Context()
    var channelList: ChannelList!

    var p2p: PeerToPeer!
    var identity: Identity?
    var window: UIWindow?
    
    weak var chainDelegate: ChainNotificationDelegate?
    weak var channelDelegate: ChannelDelegate?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        p2p = PeerToPeer(context: context, serviceType: "com-vowlink")
        p2p.delegate = self
        
        channelList = ChannelList(context: context)
        channelList.delegate = self
        channelList.channelDelegate = self
        
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
        // Saves changes in the application's managed object context before the application terminates.
        self.saveContext()
    }

    // MARK: - Core Data stack

    lazy var persistentContainer: NSPersistentContainer = {
        /*
         The persistent container for the application. This implementation
         creates and returns a container, having loaded the store for the
         application to it. This property is optional since there are legitimate
         error conditions that could cause the creation of the store to fail.
        */
        let container = NSPersistentContainer(name: "VowLink")
        container.loadPersistentStores(completionHandler: { (storeDescription, error) in
            if let error = error as NSError? {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                 
                /*
                 Typical reasons for an error here include:
                 * The parent directory does not exist, cannot be created, or disallows writing.
                 * The persistent store is not accessible, due to permissions or data protection when the device is locked.
                 * The device is out of space.
                 * The store could not be migrated to the current model version.
                 Check the error message to determine what the actual problem was.
                 */
                fatalError("Unresolved error \(error), \(error.userInfo)")
            }
        })
        return container
    }()

    // MARK: - Core Data Saving support

    func saveContext () {
        let context = persistentContainer.viewContext
        if context.hasChanges {
            do {
                try context.save()
            } catch {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                let nserror = error as NSError
                fatalError("Unresolved error \(nserror), \(nserror.userInfo)")
            }
        }
    }

    // MARK: Peer to Peer

    func peerToPeer(_ p2p: PeerToPeer, connectedTo peer: Peer) {
        // no-op
    }
    
    func peerToPeer(_ p2p: PeerToPeer, peerReady peer: Peer) {
        debugPrint("[app] new peer \(peer), syncing and subscribing to channels.count=\(channelList.channels.count)")
        for channel in channelList.channels {
            do {
                let _ = try peer.send(subscribeTo: channel.channelID)
            } catch {
                debugPrint("[app] failed to send subscribe to \(channel.channelID) due to error \(error)")
            }
            
            channel.sync(with: peer)
        }
    }
    
    func peerToPeer(_ p2p: PeerToPeer, didReceive packet: Proto_Packet, fromPeer peer: Peer) {
        DispatchQueue.main.async {
            debugPrint("[app] got packet \(packet) from peer \(peer)")
            
            switch packet.content {
            case .some(.invite(let encryptedInvite)):
                self.receive(encryptedInvite: encryptedInvite, from: peer)
                break
                
            case .some(.message(let message)):
                self.receive(encryptedMessage: message, from: peer)
                break
                
            case .some(.query(let query)):
                self.receive(query: query, from: peer)
                break
                
            default:
                debugPrint("[app] unhandled packet \(packet)")
                break
            }
        }
    }
    
    func receive(encryptedInvite proto: Proto_EncryptedInvite, from peer: Peer) {
        guard let _ = self.identity else {
            debugPrint("[app] no identity available, ignoring invite")
            return
        }
        
        guard let chainDelegate = chainDelegate else {
            return
        }
        
        do {
            let chain = try Chain(proto,
                                  withContext: context,
                                  publicKey: chainDelegate.boxPublicKey!,
                                  andSecretKey: chainDelegate.boxSecretKey!)
            
            chainDelegate.chain(received: chain)
        } catch {
            debugPrint("[app] failed to decrypt invite due to error \(error)")
            peer.destroy(reason: "failed to decrypt invite due to error \(error)")
        }
    }
    
    func receive(encryptedMessage proto: Proto_ChannelMessage, from peer: Peer) {
        guard let channel = channelList.find(byChannelID: Bytes(proto.channelID)) else {
            debugPrint("[app] channel \(proto.channelID) is unknown")
            return
        }
        
        do {
            let encrypted = try ChannelMessage(context: context, proto: proto)
            let _ = try channel.receive(encrypted: encrypted)
        } catch {
            debugPrint("[app] failed to create/receive ChannelMessage due to error \(error)")
            peer.destroy(reason: "failed to create/receive message du to error \(error)")
            return
        }
        
        debugPrint("[app] received new message from remote peer!")
    }
    
    func receive(query proto: Proto_Query, from peer: Peer) {
        let channelID = Bytes(proto.channelID)
        if channelID.count != Channel.CHANNEL_ID_LENGTH {
            peer.destroy(reason: "Invalid channel id length in query")
            return
        }
        
        guard let channel = channelList.find(byChannelID: channelID) else {
            debugPrint("[app] channel \(channelID) not found for query")
            return
        }
        
        do {
            var response: Channel.QueryResponse?
            
            if proto.cursor.isEmpty {
                response = try channel.query(withMinHeight: proto.minHeight, andLimit: Int(proto.limit))
            } else {
                response = try channel.query(withCursor: Bytes(proto.cursor), andLimit: Int(proto.limit))
            }
            
            let _ = try peer.send(queryResponse: response!, from: channel)
        } catch {
            debugPrint("[app] channel query failed due to \(error)")
            return
        }
    }
    
    // MARK: ChannelDelegate

    func channel(_ channel: Channel, postedMessage message: ChannelMessage) {
        channelDelegate?.channel(channel, postedMessage: message)
        
        guard let messageProto = message.toProto() else {
            debugPrint("[app] invalid message \(message)")
            return
        }

        do {
            // TODO(indutny): use DHT otherwise
            let subscribers = p2p.subscribedPeers(to: channel.channelID)
            
            try p2p.send(Proto_Packet.with({ (proto) in
                proto.message = messageProto
            }), to: subscribers)
        } catch {
            debugPrint("[app] failed to broadcast message due to error \(error)")
        }
        
        // TODO(indutny): CoreData
        do {
            try channelList.save()
        } catch {
            debugPrint("[app] failed to save channels due to \(error)")
        }
    }
    
    // MARK: ChannelListDelegate
    
    func channelList(added channel: Channel) {
        for peer in p2p.peers.values {
            do {
                let _ = try peer.send(subscribeTo: channel.channelID)
            } catch {
                debugPrint("[app] failed to send subscribe to new \(channel.channelID) due to error \(error)")
            }
        }
    }
}
