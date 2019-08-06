import Sodium

enum ValidationError : Error {
    case invalidLinkSignatureSize(Int)
    case invalidLinkPublicKeySize(Int)
    case nonEmptyLinkChannelID
    
    case invalidInvitePublicKeySize(Int)
    case invalidInviteChannelNameSize(Int)
    case invalidInviteChainLength(Int)
    
    case invalidInviteRequestPeerIDLength(Int)
    case invalidInviteRequestTrusteeKeySize(Int)
    case invalidInviteRequestBoxKeySize(Int)
    
    case invalidMessageChannelIDSize(Int)
    case invalidMessageParentHashSize(Int)
    case invalidMessageNonceSize(Int)
    case invalidMessageTextSize(Int)
    
    case invalidQueryChannelIDSize(Int)
    
    case invalidSubscribeChannelIDSize(Int)
}

protocol Proto_Validation {
    func validate(context: Context) throws
}

extension Proto_Hello : Proto_Validation {
    func validate(context: Context) throws {
        // no-op
    }
}

extension Proto_Link : Proto_Validation {
    func validate(context: Context) throws {
        if signature.count != context.sodium.sign.Bytes {
            throw ValidationError.invalidLinkSignatureSize(signature.count)
        }
        
        if tbs.trusteePubKey.count != context.sodium.sign.PublicKeyBytes {
            throw ValidationError.invalidLinkPublicKeySize(tbs.trusteePubKey.count)
        }
        
        if !tbs.channelID.isEmpty {
            throw ValidationError.nonEmptyLinkChannelID
        }
    }
}

extension Proto_Invite : Proto_Validation {
    func validate(context: Context) throws {
        if channelPubKey.count != context.sodium.sign.PublicKeyBytes {
            throw ValidationError.invalidInvitePublicKeySize(channelPubKey.count)
        }
        
        if channelName.count > Channel.MAX_NAME_LENGTH {
            throw ValidationError.invalidInviteChannelNameSize(channelName.count)
        }
        
        try channelRoot.validate(context: context)
        
        if chain.count > Chain.MAX_LENGTH {
            throw ValidationError.invalidInviteChainLength(chain.count)
        }
        
        for link in chain {
            try link.validate(context: context)
        }
    }
}

extension Proto_EncryptedInvite : Proto_Validation {
    func validate(context: Context) throws {
        // no-op
    }
}

extension Proto_InviteRequest : Proto_Validation {
    func validate(context: Context) throws {
        if peerID.count > Peer.MAX_PEER_ID_LENGTH {
            throw ValidationError.invalidInviteRequestPeerIDLength(peerID.count)
        }
        
        if trusteePubKey.count != context.sodium.sign.PublicKeyBytes {
            throw ValidationError.invalidInviteRequestTrusteeKeySize(trusteePubKey.count)
        }
        
        if boxPubKey.count != context.sodium.box.PublicKeyBytes {
            throw ValidationError.invalidInviteRequestBoxKeySize(boxPubKey.count)
        }
    }
}

extension Proto_ChannelMessage : Proto_Validation {
    func validate(context: Context) throws {
        if channelID.count != Channel.CHANNEL_ID_LENGTH {
            throw ValidationError.invalidMessageChannelIDSize(channelID.count)
        }
        
        for hash in parents {
            if hash.count != ChannelMessage.MESSAGE_HASH_LENGTH {
                throw ValidationError.invalidMessageParentHashSize(hash.count)
            }
        }
        
        if nonce.count != context.sodium.secretBox.NonceBytes {
            throw ValidationError.invalidMessageNonceSize(nonce.count)
        }
    }
}

extension Proto_ChannelMessage.Content : Proto_Validation {
    func validate(context: Context) throws {
        // TODO(indutny): dry it up with above
        if chain.count > Chain.MAX_LENGTH {
            throw ValidationError.invalidInviteChainLength(chain.count)
        }
        
        for link in chain {
            try link.validate(context: context)
        }
    }
}

extension Proto_ChannelMessage.Body : Proto_Validation {
    func validate(context: Context) throws {
        switch body {
        case .some(.root(let root)):
            try root.validate(context: context)
        case .some(.text(let text)):
            try text.validate(context: context)
        case .some(.checkpoint(let checkpoint)):
            try checkpoint.validate(context: context)
        case .none:
            break
        }
    }
}

extension Proto_ChannelMessage.Root : Proto_Validation {
    func validate(context: Context) throws {
        // no-op
    }
}

extension Proto_ChannelMessage.Checkpoint : Proto_Validation {
    func validate(context: Context) throws {
        // no-op
    }
}

extension Proto_ChannelMessage.Text : Proto_Validation {
    func validate(context: Context) throws {
        if text.count > ChannelMessage.MAX_TEXT_LENGTH {
            throw ValidationError.invalidMessageTextSize(text.count)
        }
    }
}

extension Proto_Query : Proto_Validation {
    func validate(context: Context) throws {
        if channelID.count != Channel.CHANNEL_ID_LENGTH {
            throw ValidationError.invalidQueryChannelIDSize(channelID.count)
        }
    }
}

extension Proto_QueryResponse : Proto_Validation {
    func validate(context: Context) throws {
        if channelID.count != Channel.CHANNEL_ID_LENGTH {
            throw ValidationError.invalidQueryChannelIDSize(channelID.count)
        }
        
        for message in messages {
            try message.validate(context: context)
        }
    }
}

extension Proto_Subscribe : Proto_Validation {
    func validate(context: Context) throws {
        if channelID.count != Channel.CHANNEL_ID_LENGTH {
            throw ValidationError.invalidSubscribeChannelIDSize(channelID.count)
        }
    }
}

extension Proto_Packet : Proto_Validation {
    func validate(context: Context) throws {
        switch content {
        case .some(.error(_)):
            break
        case .some(.invite(let invite)):
            try invite.validate(context: context)
        case .some(.message(let message)):
            try message.validate(context: context)
        case .some(.query(let query)):
            try query.validate(context: context)
        case .some(.queryResponse(let response)):
            try response.validate(context: context)
        case .some(.subscribe(let subscribe)):
            try subscribe.validate(context: context)
        case .none:
            break
        }
    }
}
