//
//  Context.swift
//  VowLink
//
//  Created by Indutnyy, Fedor on 7/30/19.
//  Copyright © 2019 Indutnyy, Fedor. All rights reserved.
//

import Foundation
import Sodium
import KeychainAccess

class Context {
    let sodium = Sodium()
    let keychain: Keychain
    
    init(service: String = "com.indutny.vowlink") {
        keychain = Keychain(service: service)
            .synchronizable(true)
    }
}
