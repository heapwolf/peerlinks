const { Link: PLink } = require('../messages')
const { now, BanError } = require('../utils')

const DAY = 24 * 3600
const EXPIRATION_DELTA = 99 * DAY
const EXPIRATION_LEEWAY = 2 * 60 // 2 minutes
const MAX_DISPLAY_NAME_LENGTH = 128

class Link {
  constructor (options) {
    const {
      sodium,
      validFrom,
      validTo,
      trusteePubKey,
      trusteeDisplayName,
      signature
    } = options

    if (!sodium) {
      throw new Error('Missing required `sodium` option')
    }

    if (!trusteeDisplayName) {
      throw new BanError('`trusteeDisplayName` is mandatory for the Link')
    }

    if (trusteeDisplayName.length > MAX_DISPLAY_NAME_LENGTH) {
      throw new BanError('Invalid trusteeDisplayName length: ' +
        trusteeDisplayName.length)
    }
    if (signature.length !== sodium.crypto_sign_BYTES) {
      throw new BanError('Invalid signature length')
    }
    if (trusteePubKey.length !== sodium.crypto_sign_PUBLICKEYBYTES) {
      throw new BanError('Invalid public key length')
    }

    this.sodium = sodium

    this.validFrom = validFrom
    this.validTo = validTo
    this.trusteePubKey = trusteePubKey
    this.trusteeDisplayName = trusteeDisplayName
    this.signature = signature
  }

  verify (channel, publicKey, timestamp = now()) {
    if (!this.isValid(timestamp)) {
      return false
    }

    const tbs = Link.tbs(channel, {
      trusteePubKey: this.trusteePubKey,
      validFrom: this.validFrom,
      validTo: this.validTo,
      trusteeDisplayName: this.trusteeDisplayName
    })

    const sodium = this.sodium
    return sodium.crypto_sign_verify_detached(this.signature, tbs, publicKey)
  }

  isValid (timestamp = now()) {
    return this.validFrom <= timestamp && timestamp < this.validTo
  }

  static tbs (channel, options) {
    const { trusteePubKey, validFrom, validTo, trusteeDisplayName } = options
    return PLink.TBS.encode({
      trusteePubKey,
      validFrom,
      validTo,
      trusteeDisplayName,
      channelId: channel.id
    }).finish()
  }

  serialize () {
    return {
      tbs: {
        trusteePubKey: this.trusteePubKey,
        trusteeDisplayName: this.trusteeDisplayName,
        validFrom: this.validFrom,
        validTo: this.validTo
      },
      signature: this.signature
    }
  }

  serializeData () {
    return PLink.encode(this.serialize()).finish()
  }

  static deserialize (decoded, options) {
    return new Link({
      sodium: options.sodium,
      validFrom: decoded.tbs.validFrom,
      validTo: decoded.tbs.validTo,
      trusteePubKey: decoded.tbs.trusteePubKey,
      trusteeDisplayName: decoded.tbs.trusteeDisplayName,
      signature: decoded.signature
    })
  }

  static deserializeData (data, options) {
    return Link.deserialize(PLink.decode(data), options)
  }
}

Link.EXPIRATION_DELTA = EXPIRATION_DELTA
Link.EXPIRATION_LEEWAY = EXPIRATION_LEEWAY
Link.MAX_DISPLAY_NAME_LENGTH = MAX_DISPLAY_NAME_LENGTH

module.exports = Link
