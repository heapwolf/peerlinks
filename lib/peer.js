import createDebug from 'debug';

import Channel from './protocol/channel';
import Identity from './protocol/identity';
import Message from './protocol/message';
import {
  Hello as PHello,
  Packet as PPacket,
} from './messages';
import SyncAgent from './sync-agent';
import { WaitList } from './utils';

const debug = createDebug('vowlink:peer');

export const VERSION = 1;
export const MAX_ERROR_REASON_LEN = 1024;
export const ID_LENGTH = 32;

export default class Peer {
  /** **(Internal)** */
  constructor(localId, socket, options = {}) {
    const { channels = [], inviteWaitList = new WaitList() } = options;

    this.localId = localId;
    this.remoteId = null;

    this.debugId = '[not ready]';

    this.socket = socket;

    this.channels = channels;
    this.inviteWaitList = inviteWaitList;

    // Set<Channel>
    this.subscriptions = new Set();

    // Channel => "active" | "pending"
    this.syncAgents = new Map();
  }

  //
  // High-level protocol
  //

  /** **(Internal)** */
  addSubscription(channelId) {
    const channel = this.getChannel(channelId);
    if (!channel) {
      return;
    }
    this.subscriptions.add(channel);
    this.debug('adding subscription to channel.id=%s', channel.debugId);
  }

  /** **(Internal)** */
  async ready() {
    await this.socket.send(PHello.encode({
      version: VERSION,
      peerId: this.localId,
    }).finish());

    const first = await this.socket.receive();
    const hello = PHello.decode(first);
    if (hello.version !== VERSION) {
      throw new Error('Unsupported protocol version: ' + hello.version);
    }
    if (hello.peerId.length !== ID_LENGTH) {
      throw new Error('Invalid remote peer id length: ' + hello.peerId.length);
    }
    this.remoteId = hello.peerId;
    this.debugId = this.remoteId.toString('hex').slice(0, 8);

    this.debug('got hello');

    for (const channel of this.channels) {
      await this.subscribe(channel);
    }
  }

  /** **(Internal)** */
  async loop() {
    this.debug('starting loop');

    for (;;) {
      const data = await this.socket.receive();
      const packet = PPacket.decode(data);
      this.debug('got packet.type=%s', packet.content);

      switch (packet.content) {
        case 'subscribe':
          await this.onSubscribe(packet.subscribe);
          break;
        case 'error':
          throw new Error('Got error: ' +
            packet.error.reason.slice(0, MAX_ERROR_REASON_LEN));
        case 'invite':
          await this.onInvite(packet.invite);
          break;
        case 'query':
          await this.onQuery(packet.query);
          break;
        case 'queryResponse':
          await this.onQueryResponse(packet.queryResponse);
          break;
        case 'bulk':
          await this.onBulk(packet.bulk);
          break;
        case 'bulkResponse':
          await this.onBulkResponse(packet.bulkResponse);
          break;
        case 'notification':
          await this.onNotification(packet.notification);
          break;
        default:
          throw new Error('Unsupported packet type: ' + packet.content);
      }
    }
  }

  /** **(Internal)** */
  async subscribe(channel) {
    this.debug('sending subscription channel.id=%s', channel.debugId);
    const packet = PPacket.encode({
      subscribe: { channelId: channel.id },
    }).finish();
    await this.socket.send(packet);
  }

  /**
   * Send an invite to remote peer.
   *
   * @param {Object} invite - `encryptedInvite` property of
   *     `Identity#issueInvite`
   * @returns Promise
   */
  async sendInvite(invite) {
    this.debug('sending invite');
    const packet = PPacket.encode({
      invite,
    }).finish();
    await this.socket.send(packet);
  }

  /** **(Internal)** */
  async destroy(reason) {
    this.debug('destroying due to reason=%s', reason);

    const packet = PPacket.encode({
      error: { reason },
    }).finish();

    try {
      await this.socket.send(packet);
    } catch {
      // swallow error
    }
    await this.socket.close();
  }

  //
  // Miscellaneous events
  //

  /** **(Internal)** */
  onNewChannel(channel) {
    this.synchronize(channel);
  }

  /** **(Internal)** */
  async onNewMessage(channel, message) {
    await this.socket.send(PPacket.encode({
      notification: {
        channelId: channel.id,
      },
    }).finish());
  }

  //
  // Handling packets
  //

  /** **(Internal)** */
  async onSubscribe(packet) {
    Channel.checkId(packet.channelId, 'Invalid channelId in Subscribe');
    this.addSubscription(packet.channelId);
  }

  /** **(Internal)** */
  async onInvite(packet) {
    if (packet.requestId.length !== Identity.INVITE_REQUEST_ID_LENGTH) {
      throw new Error('Invalid requestId in EncryptedInvite');
    }

    this.debug('got invite.id=%s', packet.requestId.toString('hex'));
    this.inviteWaitList.resolve(packet.requestId.toString('hex'), packet);
  }

  /** **(Internal)** */
  async onQuery(packet) {
    Channel.checkId(packet.channelId, 'Invalid channelId in Query');
    if (packet.cursor === 'hash') {
      Message.checkHash(packet.hash, 'Invalid cursor.hash in Query');
    }

    const channel = this.getChannel(packet.channelId);
    if (!channel) {
      this.debug('ignoring query for unknown channel');
      return;
    }

    this.debug('query for channel.id=%s', channel.debugId);
    return await this.getSyncAgent(channel).receiveQuery(packet);
  }

  /** **(Internal)** */
  async onQueryResponse(packet) {
    Channel.checkId(packet.channelId, 'Invalid channelId in QueryResponse');
    for (const abbr of packet.abbreviatedMessages) {
      Message.checkHash(abbr.hash, 'Invalid abbreviated message hash');
      for (const hash of abbr.parents) {
        Message.checkHash(hash, 'Invalid abbreviated message parent hash');
      }
    }
    if (packet.forwardHash.length !== 0) {
      Message.checkHash(packet.forwardHash, 'Invalid forward hash');
    }
    if (packet.backwardHash.length !== 0) {
      Message.checkHash(packet.backwardHash, 'Invalid backward hash');
    }

    const channel = this.getChannel(packet.channelId);
    if (!channel) {
      this.debug('ignoring query response for unknown channel');
      return;
    }

    return await this.getSyncAgent(channel).receiveQueryResponse(packet);
  }

  /** **(Internal)** */
  async onBulk(packet) {
    Channel.checkId(packet.channelId, 'Invalid channelId in Bulk');
    for (const hash of packet.hashes) {
      Message.checkHash(hash, 'Invalid message hash in Bulk');
    }

    const channel = this.getChannel(packet.channelId);
    if (!channel) {
      this.debug('ignoring bulk for unknown channel');
      return;
    }

    this.debug('bulk for channel.id=%s hashes.length=%d', channel.debugId,
      packet.hashes.length);
    return await this.getSyncAgent(channel).receiveBulk(packet);
  }

  /** **(Internal)** */
  async onBulkResponse(packet) {
    Channel.checkId(packet.channelId, 'Invalid channelId in BulkResponse');

    const channel = this.getChannel(packet.channelId);
    if (!channel) {
      this.debug('ignoring bulk response for unknown channel');
      return;
    }

    // NOTE: `Message` constructor will check each message
    return await this.getSyncAgent(channel).receiveBulkResponse(packet);
  }

  /** **(Internal)** */
  async onNotification(packet) {
    Channel.checkId(packet.channelId, 'Invalid channelId in Notification');

    const channel = this.getChannel(packet.channelId);
    if (!channel) {
      return;
    }

    this.debug('notification for channel.id=%s count=%d', channel.debugId);
    this.synchronize(channel);
  }

  //
  // Synchronization
  //

  /** **(Internal)** */
  synchronize(channel) {
    this.getSyncAgent(channel).synchronize().catch((e) => {
      this.debug('channel.id=%s sync error.message=%s', channel.debugId,
        e.stack);
    });
  }

  //
  // Utils
  //

  /** **(Internal)** */
  getChannel(channelId) {
    return this.channels.find((channel) => {
      return channel.id.equals(channelId);
    });
  }

  /** **(Internal)** */
  getSyncAgent(channel) {
    let agent;
    if (this.syncAgents.has(channel)) {
      agent = this.syncAgents.get(channel);
    } else {
      agent = new SyncAgent(channel, this.socket);
      this.syncAgents.set(channel, agent);
    }
    return agent;
  }

  /** **(Internal)** */
  debug(fmt, ...args) {
    debug('id=%s ' + fmt, ...[ this.debugId ].concat(args));
  }
}

// Convenience
Peer.VERSION = VERSION;
Peer.MAX_ERROR_REASON_LEN = MAX_ERROR_REASON_LEN;
Peer.ID_LENGTH = ID_LENGTH;
