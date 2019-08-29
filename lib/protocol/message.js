import { Buffer } from 'buffer';

import { ChannelMessage as PChannelMessage } from '../messages';
import { BanError } from '../utils';

import Channel from './channel';
import Chain from './chain';
import Link from './link';

export const HASH_SIZE = 32;
const ENC_KEY = Buffer.from('vowlink-symmetric');

export default class Message {
  constructor(options) {
    const {
      // NOTE: `channel` MUST be supplied with `content`
      // `channelId` MAY be supplied instead for `encryptedContent`
      channel,
      channelId,

      sodium,

      parents,
      height,
      nonce,
      content,
      encryptedContent,
    } = options;

    if (!sodium) {
      throw new Error('Missing required `sodium` option');
    }

    this.sodium = sodium;

    this.channelId = channelId || channel.id;
    this.parents = parents;
    this.height = height;
    this.nonce = nonce;

    if (!this.nonce) {
      this.nonce = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES);
      sodium.randombytes_buf(this.nonce);
    }

    Channel.checkId(this.channelId, 'Invalid channel id size');
    this.parents.forEach((hash) => {
      Message.checkHash(hash, 'Invalid parent hash');
    });
    if (this.height < 0) {
      throw new BanError('Invalid height');
    }
    if (this.nonce.length !== sodium.crypto_secretbox_NONCEBYTES) {
      throw new BanError('Invalid nonce size');
    }

    if (!content && !encryptedContent) {
      throw new Error('Either decrypted or encrypted content must be present');
    }

    if (content && !channel) {
      throw new Error(
        '`options.channel` is mandatory when `options.content` is present');
    }

    if (encryptedContent &&
        encryptedContent.length < sodium.crypto_secretbox_MACBYTES) {
      throw new BanError('Invalid encrypted content');
    }

    this.content = content;
    this.encryptedContent = encryptedContent;

    this.cachedChain = null;

    // Message MUST have valid hash
    if (content) {
      this.encrypt(channel);
    }

    this.hash = Buffer.alloc(HASH_SIZE);
    sodium.crypto_generichash(this.hash, this.serializeData());

    this.debugHash = this.hash.toString('hex').slice(0, 8);

    this.cachedJSON = null;
  }

  get chain() {
    if (!this.content) {
      throw new Error('Message must be decrypted first');
    }

    if (this.cachedChain) {
      return this.cachedChain;
    }

    const options = { sodium: this.sodium };

    this.cachedChain = new Chain(
      this.content.chain.map((link) => Link.deserialize(link, options)));
    return this.cachedChain;
  }

  get isRoot() {
    if (!this.content) {
      throw new Error('Message has not been decrypted');
    }
    return !!this.content.body.root;
  }

  get json() {
    if (!this.content) {
      throw new Error('Message has not been decrypted');
    }

    if (this.isRoot) {
      return undefined;
    }

    if (!this.cachedJSON) {
      this.cachedJSON = JSON.parse(this.content.body.json);
    }
    return this.cachedJSON;
  }

  encrypt(channel) {
    if (this.encryptedContent) {
      return;
    }

    const sodium = this.sodium;

    const cleartext = PChannelMessage.Content.encode(this.content).finish();
    const ciphertext = Buffer.alloc(
      cleartext.length + sodium.crypto_secretbox_MACBYTES);

    sodium.crypto_secretbox_easy(ciphertext, cleartext, this.nonce,
      channel.encryptionKey);

    this.encryptedContent = ciphertext;
  }

  decrypt(channel) {
    if (this.content) {
      return;
    }

    const sodium = this.sodium;

    const cleartext = Buffer.alloc(this.encryptedContent.length -
      sodium.crypto_secretbox_MACBYTES);
    const success = sodium.crypto_secretbox_open_easy(
      cleartext,
      this.encryptedContent,
      this.nonce,
      channel.encryptionKey);
    if (!success) {
      throw new BanError('Failed to decrypt message content');
    }
    this.content = PChannelMessage.Content.decode(cleartext);

    if (!this.content.body.root) {
      try {
        JSON.parse(this.content.body.json);
      } catch (e) {
        throw new BanError('Invalid JSON content. ' + e.message);
      }
    }
  }

  getAuthor() {
    return {
      displayPath: this.chain.getDisplayPath(),
      publicKeys: this.chain.getPublicKeys(),
    };
  }

  verify(channel) {
    this.decrypt(channel);

    const sodium = this.sodium;
    const leafKey = this.chain.getLeafKey(channel);

    return sodium.crypto_sign_verify_detached(
      this.content.signature,
      Message.tbs({
        chain: this.content.chain,
        timestamp: this.content.timestamp,
        body: this.content.body,
        parents: this.parents,
        height: this.height,
      }),
      leafKey);
  }

  serialize() {
    if (!this.encryptedContent) {
      throw new Error('Message has to be encrypted first');
    }

    return {
      channelId: this.channelId,
      parents: this.parents,
      height: this.height,
      nonce: this.nonce,
      encryptedContent: this.encryptedContent,
    };
  }

  serializeData() {
    return PChannelMessage.encode(this.serialize()).finish();
  }

  static deserialize(decoded, options) {
    return new Message({
      sodium: options.sodium,
      channelId: decoded.channelId,

      parents: decoded.parents,
      // NOTE: 53bits of precision is more than enough
      height: decoded.height.toNumber(),
      nonce: decoded.nonce,
      encryptedContent: decoded.encryptedContent,
    });
  }

  static deserializeData(data, options) {
    return Message.deserialize(PChannelMessage.decode(data), options);
  }

  static tbs({ chain, timestamp, body, parents, height }) {
    return PChannelMessage.Content.TBS.encode({
      chain,
      timestamp,
      body,
      parents,
      height,
    }).finish()
  }

  // Helpers

  static root() {
    return { root: {} };
  }

  static json(value) {
    return { json: JSON.stringify(value) };
  }

  static checkHash(hash, message) {
    if (hash.length !== HASH_SIZE) {
      throw new BanError(message);
    }
  }

  static encryptionKeyFor(channel, height, body) {
    const sodium = this.sodium;

    const key = Buffer.alloc(sodium.crypto_secretbox_KEYBYTES);
    sodium.crypto_generichash(key, PChannelMessage.EncryptionKeyInput.encode({
      channelPubKey: channel.publicKey,
      height,
    }).finish(), ENC_KEY);
    try {
      body(key);
    } finally {
      // Zero key
      if (sodium.sodium_memzero) {
        sodium.sodium_memzero(key);
      } else {
        key.fill(0);
      }
    }
  }
}

Message.HASH_SIZE = HASH_SIZE;
