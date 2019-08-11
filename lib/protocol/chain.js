import { now } from '../utils';

export const MAX_LENGTH = 3;

export default class Chain {
  constructor(links) {
    this.links = links;

    if (this.links.length > MAX_LENGTH) {
      throw new Error(`Chain length overflow: ${this.links.length}`);
    }
  }

  getLeafKey(channel, timestamp = now()) {
    let leafKey = channel.publicKey;
    for (const link of this.links) {
      if (!link.verify(channel, leafKey, timestamp)) {
        return false;
      }

      leafKey = link.trusteePubKey;
    }
    return leafKey;
  }

  verify(channel, timestamp = now()) {
    return !!this.getLeafKey(channel, timestamp);
  }

  serialize() {
    return this.links.map((link) => {
      return link.serialize();
    });
  }
}

// Convenience
Chain.MAX_LENGTH = MAX_LENGTH
