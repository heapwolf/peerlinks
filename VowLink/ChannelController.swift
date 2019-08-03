//
//  ChannelController.swift
//  VowLink
//
//  Created by Indutnyy, Fedor on 8/3/19.
//  Copyright © 2019 Indutnyy, Fedor. All rights reserved.
//

import UIKit

class ChannelController : UIViewController {
    @IBOutlet weak var navItem: UINavigationItem!
    
    var channel: Channel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        navItem.title = channel.label
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let inviteController = segue.destination as? InviteController {
            inviteController.channel = channel
        }
    }
}
