import createDebug from 'debug';
import WaitList from 'promise-waitlist';

import Message from './protocol/message';
import {
  Packet as PPacket,
  SyncRequest as PSyncRequest,
} from './messages';
import { BanError } from './utils';

const debug = createDebug('vowlink:sync-agent');

const DEFAULT_TIMEOUT = 15 * 1000; // 15 seconds

export default class SyncAgent {
  constructor(options = {}) {
    this.state = 'idle';
    this.options = {
      timeout: DEFAULT_TIMEOUT,
      ...options,
    };

    this.sodium = this.options.sodium;
    this.channel = this.options.channel;
    this.identities = this.options.identities;
    this.socket = this.options.socket;

    if (!this.sodium) {
      throw new Error('Missing required `sodium` option');
    }
    if (!this.channel) {
      throw new Error('Missing required `channel` option');
    }
    if (!this.identities) {
      throw new Error('Missing required `identities` option');
    }
    if (!this.socket) {
      throw new Error('Missing required `socket` option');
    }

    this.timeoutWaitList = new WaitList();

    this.seq = 0;

    // seq => { type, identity, resolve() }
    this.pendingRequests = new Map();
  }

  destroy() {
    this.timeoutWaitList.close(new Error('SyncAgent destroyed'));
  }

  async synchronize() {
    this.debug('synchronize() state=%s', this.state);
    if (this.state === 'idle') {
      this.state = 'active';
    } else if (this.state === 'active') {
      this.state = 'pending';
    } else {
      // Already pending
      return;
    }

    this.debug('synchronize() starting sync');
    await this.channel.sync(this);
    this.debug('synchronize() starting sync complete');

    const isPending = this.state === 'pending';
    this.state = 'idle';

    // Repeat synchronization if it was pending
    if (isPending) {
      this.debug('synchronize() restarting sync');
      return await this.synchronize();
    }
  }

  getRequestingIdentity(seq) {
    const entry = this.pendingRequests.get(seq);
    return entry && entry.identity;
  }

  async receiveQuery(seq, query) {
    this.debug('receiveQuery() seq=%d', seq);
    const cursor = query.cursor === 'hash' ? { hash: query.hash } :
      { height: query.height };

    const result = await this.channel.query(
      cursor, query.isBackward, query.limit);

    const queryResponse = {
      channelId: query.channelId,
      ...result,
    };

    return { queryResponse };
  }

  async receiveBulk(seq, bulk) {
    this.debug('receiveBulk() seq=%d', seq);
    const result = await this.channel.bulk(bulk.hashes);

    const bulkResponse = {
      channelId: bulk.channelId,
      messages: result.messages.map((message) => message.serialize()),
      forwardIndex: result.forwardIndex,
    };

    return { bulkResponse };
  }

  async receiveEmptyResponse(seq) {
    this.debug('receiveEmptyResponse() seq=%d', seq);

    const entry = this.pendingRequests.get(seq);
    if (!entry) {
      throw new BanError('Unexpected empty response');
    }

    entry.resolve(null);
  }

  async receiveQueryResponse(seq, response) {
    this.debug('receiveQueryResponse() seq=%d', seq);
    const entry = this.pendingRequests.get(seq);
    if (!entry) {
      throw new BanError('Unexpected QueryResponse');
    }
    if (entry.type !== 'query') {
      throw new BanError('Expected QueryResponse for this seq');
    }

    entry.resolve(response);
  }

  async receiveBulkResponse(seq, response) {
    this.debug('receiveBulkResponse() seq=%d', seq);
    const entry = this.pendingRequests.get(seq);
    if (!entry) {
      throw new BanError('Unexpected BulkResponse');
    }
    if (entry.type !== 'bulk') {
      throw new BanError('Expected BulkResponse for this seq');
    }

    entry.resolve(response);
  }

  //
  // Synchronization methods for Channel remote
  //

  async query(cursor, isBackward, limit) {
    const seq = this.getNextSeq();
    const packet = Object.assign({
      channelId: this.channel.id,
      seq,
      isBackward,
      limit,
    }, cursor.hash ? { hash: cursor.hash } : { height: cursor.height });

    const response = await this.sendAndWait('query', seq, { query: packet });
    if (!response) {
      return { abbreviatedMessages: [], forwardHash: null, backwardHash: null };
    }

    return {
      abbreviatedMessages: response.abbreviatedMessages,
      forwardHash: response.forwardHash.length === 0 ? null :
        response.forwardHash,
      backwardHash: response.backwardHash.length === 0 ? null :
        response.backwardHash,
    };
  }

  async bulk(hashes) {
    const seq = this.getNextSeq();
    const packet = {
      channelId: this.channel.id,
      seq,
      hashes,
    };

    const response = await this.sendAndWait('bulk', seq, { bulk: packet });
    if (!response) {
      return { messages: [], forwardIndex: 0 };
    }

    return {
      messages: response.messages.map((decoded) => {
        return Message.deserialize(decoded, { sodium: this.sodium });
      }),
      forwardIndex: response.forwardIndex,
    };
  }

  //
  // Utils
  //

  async sendAndWait(type, seq, packet) {
    const identity = this.identities.find((id) => {
      return id.getChain(this.channel);
    });

    // TODO(indutny): cover this in tests
    if (!identity) {
      throw new Error('No valid identities to sync to the channel');
    }

    const queryResponse = new Promise((resolve) => {
      this.pendingRequests.set(seq, {
        type,
        identity,
        resolve,
      });
    });

    this.debug('sendAndWait %s seq=%d waiting=%d',
      type,
      seq,
      this.pendingRequests.size);

    const clear = PSyncRequest.Content.encode(packet).finish();
    const { box, nonce } = this.channel.encrypt(clear);

    await this.socket.send(PPacket.encode({
      syncRequest: {
        channelId: this.channel.id,
        seq,
        chain: identity.getChain(this.channel),

        nonce,
        box,
      },
    }).finish());

    const entry = this.timeoutWaitList.waitFor(null, this.options.timeout);

    try {
      return await Promise.race([
        queryResponse,
        entry.promise,
      ]);
    } finally {
      this.pendingRequests.delete(seq);
      entry.cancel();
    }
  }

  getNextSeq() {
    const result = this.seq;
    this.seq = (this.seq + 1) >>> 0;
    return result;
  }

  debug(fmt, ...args) {
    debug('channel.id=%s ' + fmt, ...[ this.channel.debugId ].concat(args));
  }
}
