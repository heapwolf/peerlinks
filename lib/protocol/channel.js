import { Buffer } from 'buffer';
import * as sodium from 'sodium-universal';

export const ID_SIZE = 32;

const ID_KEY = Buffer.from('vowlink-channel-id');
const ENC_KEY = Buffer.from('vowlink-symmetric');

export default class Channel {
  constructor(name, publicKey) {
    this.name = name;
    this.publicKey = publicKey;

    this.id = Buffer.alloc(ID_SIZE);
    sodium.crypto_generichash(this.id, this.publicKey, ID_KEY);

    this.encryptionKey = Buffer.alloc(sodium.crypto_secretbox_KEYBYTES);
    sodium.crypto_generichash(this.encryptionKey, this.publicKey, ENC_KEY);
  }
}

// Convenience
Channel.ID_SIZE = ID_SIZE;
