//
//  SubscrtiptionListController.swift
//  VowLink
//
//  Created by Indutnyy, Fedor on 8/1/19.
//  Copyright © 2019 Indutnyy, Fedor. All rights reserved.
//

import UIKit

class SubscriptionListController : UITableViewController {
    var app: AppDelegate!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        app = (UIApplication.shared.delegate as! AppDelegate)

        tableView.dataSource = self
    }
    
    func channelAt(indexPath: IndexPath) -> Channel? {
        return app.subscriptions.subscriptions[indexPath.last ?? 0]
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return app.subscriptions.subscriptions.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = self.tableView.dequeueReusableCell(withIdentifier: "subscriptionCell")!
        
        let channel = channelAt(indexPath: indexPath)
        
        cell.textLabel?.text = channel?.label
        
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    }
}
