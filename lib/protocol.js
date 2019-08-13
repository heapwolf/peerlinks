import * as sodium from 'sodium-universal';
import createDebug from 'debug';

import Chain from './protocol/chain';
import Channel from './protocol/channel';
import Identity from './protocol/identity';
import Link from './protocol/Link';
import Message from './protocol/message';
import MemoryStorage from './storage/memory';
import Peer from './peer';
import { WaitList } from './utils';

export {
  Chain,
  Channel,
  Identity,
  Link,
  Message,

  // Storage
  MemoryStorage,

  // Networking
  Peer,
};

const debug = createDebug('vowlink:protocol');

export default class Protocol {
  constructor({ storage } = {}) {
    this.storage = storage || new MemoryStorage();

    this.channels = [];
    this.identities = [];
    this.peers = new Set();

    this.id = Buffer.alloc(Peer.ID_LENGTH);
    sodium.randombytes_buf(this.id);

    // See: waitForInvite()
    this.inviteWaitList = new WaitList();

    // See: waitForPeer()
    this.peerWaitList = new WaitList();
  }

  //
  // Persistence
  //

  async load() {
    const channelIds = await this.storage.getEntityKeys('channel');
    for (const id of channelIds) {
      const channel = await this.storage.retrieveEntity(
        'channel',
        id,
        Channel,
        { storage: this.storage });
      // TODO(indutny): sort channels
      this.channels.push(channel);
      debug('loaded channel.name=%s', channel.name);
    }

    const identityNames = await this.storage.getEntityKeys('identity');
    for (const id of identityNames) {
      const identity = await this.storage.retrieveEntity(
        'identity', id, Identity);
      // TODO(indutny): sort identities
      this.identities.push(id);
      debug('loaded id.name=%s', id.name);
    }
  }

  // TODO(indutny): save only changed entities
  async save() {
    for (const channel of this.channels) {
      await this.storage.storeEntity('channel', channel.id.toString('hex'),
        channel);
      debug('saving channel.name=%s', channel.name);
    }

    for (const id of this.identities) {
      await this.storage.storeEntity(
        'identity', id.publicKey.toString('hex'), id);
      debug('saving id.name=%s', id.name);
    }
  }

  //
  // Identity
  //

  async createIdentity(name) {
    if (this.identities.some((id) => id.name === name)) {
      throw new Error('Duplicate identity');
    }

    const identity = new Identity(name);
    // TODO(indutny): sort identities
    this.identities.push(identity);

    const channel = await Channel.create(identity, identity.name, {
      storage: this.storage,
    });
    // TODO(indutny): sort channels
    this.channels.push(channel);

    await this.save();

    debug('created id.name=%', identity.name);
    return identity;
  }

  // NOTE: Mostly for tests
  getIdentity(name) {
    return this.identities.find((id) => id.name === name);
  }

  //
  // Channels
  //

  // NOTE: Mostly for tests
  getChannel(name) {
    return this.channels.find((channel) => channel.name === name);
  }

  //
  // Invite
  //

  async approveInviteRequest(id, channel, request) {
    for (const peer of this.peers) {
      if (peer.id.equals(peerId)) {
        try {
          await peer.sendInvite(encryptedInvite);
        } catch (e) {
          await peer.destroy(e.message);
          this.peers.delete(peer);
        }
      }
    }
  }

  waitForInvite(requestId) {
    debug('wait for invite.id=%s', requestId.toString('hex'));
    return this.inviteWaitList.wait(requestId.toString('hex'));
  }

  async channelFromInvite(invite, identity, name) {
    const channel = await Channel.fromInvite(invite, identity, {
      storage: this.storage,
      name,
    });

    // TODO(indutny): sort channels
    this.channels.push(channel);
    debug('channel.id=%s created from invite', channel.debugId);

    return channel;
  }

  //
  // Network
  //

  async connect(socket) {
    const peer = new Peer(this.id, socket, {
      channels: this.channels,
      inviteWaitList: this.inviteWaitList,
    });
    try {
      await peer.ready();

      this.peers.add(peer);
      this.peerWaitList.resolve(peer.remoteId.toString('hex'), peer);

      await peer.loop();
    } catch (e) {
      debug('got error: %s', e.stack);
      await peer.destroy(e.message);
    } finally {
      this.peers.delete(peer);
    }
  }

  waitForPeer(peerId) {
    for (const existing of this.peers) {
      if (existing.remoteId.equals(peerId)) {
        debug('found existing peer.id=%s', peer.debugId);
        return WaitList.resolve(existing);
      }
    }

    debug('wait for peer.id=%s', peerId.toString('hex').slice(0, 8));
    return this.peerWaitList.wait(peerId.toString('hex'));
  }

  async close() {
    const peers = Array.from(this.peers);
    this.peers.clear();

    return await Promise.all(peers.map(async (peer) => {
      await peer.destroy('Closed');
    }));
  }
}
