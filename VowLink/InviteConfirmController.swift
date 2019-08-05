//
//  InviteConfirmController.swift
//  VowLink
//
//  Created by Indutnyy, Fedor on 7/31/19.
//  Copyright © 2019 Indutnyy, Fedor. All rights reserved.
//

import UIKit
import Sodium

class InviteConfirmController : UITableViewController {
    var app: AppDelegate!
    var request: Proto_LinkRequest?
    var channel: Channel!
    
    @IBOutlet weak var publicKey: UILabel!
    @IBOutlet weak var peerID: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        app = (UIApplication.shared.delegate as! AppDelegate)
        let sodium = app.context.sodium
        
        if let pubKey = request?.trusteePubKey {
            publicKey.text = sodium.utils.bin2hex(Bytes(pubKey))
        } else {
            publicKey.text = "(missing)"
        }
        
        peerID.text = request?.peerID
    }
    
    @IBAction func doneClicked(_ sender: Any) {
        defer {
            if let nav = navigationController {
                // Pop to the channel view
                let preLast = nav.viewControllers[nav.viewControllers.endIndex.advanced(by: -3)]
                nav.popToViewController(preLast, animated: true)
            }
        }
        guard let request = request else {
            return
        }
        guard let id = app.identity else {
            return
        }

        // TODO(indutny): wait for peer to connect, or at least say that it is not connected
        
        do {
            let link = try id.issueLink(for: Bytes(request.trusteePubKey), andChannel: channel)
            
            guard let chain = try id.chain(for: channel)?.appendedLink(link) else {
                fatalError("no chain available for the channel \(channel!)")
            }
            
            let encryptedInvite = try chain.encrypt(withPublicKey: Bytes(request.boxPubKey), andChannel: channel)
            
            let packet = Proto_Packet.with { (packet) in
                packet.invite = encryptedInvite
            }
            
            try app.p2p.send(packet, to: app.p2p.peers(byDisplayName: request.peerID))
        } catch {
            fatalError("failed to issue invite \(request) due to error \(error)")
        }
    }
}
