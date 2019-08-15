import { Buffer } from 'buffer';

import Storage from 'vowlink-sqlite-storage';
import hyperswarm from 'hyperswarm';

import Protocol, {
  Channel,
  Message,
  Peer,
  StreamSocket,
} from 'vowlink-protocol';

const DISPLAY_COUNT = 10;

export default class Chat {
  constructor(repl, storage) {
    this.repl = repl;
    this.repl.setPrompt('> ');
    this.repl.displayPrompt(true);

    this.swarm = hyperswarm();
    this.protocol = new Protocol({
      storage,
    });
    this.identity = null;
    this.channel = null;

    this.decryptInvite = null;

    this.swarm.on('connection', (socket) => {
      this.onConnection(socket);
    });
  }

  async load() {
    await this.protocol.load();
  }

  async iam(name) {
    if (!name) {
      throw new Error('Usage: iam([ name ])');
    }

    const existing = this.protocol.getIdentity(name);
    this.identity = existing || await this.protocol.createIdentity(name);
    this.setChannel(name);

    return existing ? `Using identity: "${name}"` :
      `Created identity: "${name}"`;
  }

  async requestInvite() {
    if (!this.identity) {
      throw new Error('`iam()` must be called first');
    }

    const { request, decrypt } = this.identity.requestInvite(
      this.protocol.id);

    this.decryptInvite = decrypt;

    const request64 = JSON.stringify(request.toString('base64'));
    const trusteeName = JSON.stringify(this.identity.name);

    console.log('Ask your peer to run:');
    console.log(`issueInvite(${request64},${trusteeName})`);
    return '(generated invite request)';
  }

  async issueInvite(request, inviteeName) {
    if (!this.identity) {
      throw new Error('`iam()` must be called first');
    }
    if (!request || !inviteeName) {
      throw new Error(
        'Usage: issueInvite([ base64 request string], inviteeName)');
    }

    request = Buffer.from(request, 'base64');
    const { encryptedInvite } = this.identity.issueInvite(
      this.channel, request, inviteeName);
    const json = JSON.stringify({
      requestId: encryptedInvite.requestId.toString('base64'),
      box: encryptedInvite.box.toString('base64'),
    });

    console.log('Ask invitee to run:');
    console.log(`join(${json})`);

    return '(issued invite)';
  }

  async join(invite) {
    if (!this.identity) {
      throw new Error('`iam()` must be called first');
    }
    if (!invite || !invite.requestId || !invite.box || !this.decryptInvite) {
      throw new Error(
        'Ask your peer for an invite first with `requestInvite()`');
    }

    invite = {
      requestId: Buffer.from(invite.requestId, 'base64'),
      box: Buffer.from(invite.box, 'base64'),
    };
    invite = this.decryptInvite(invite);
    const channel = await Channel.fromInvite(invite, this.identity);
    await this.protocol.addChannel(channel);
    await this.protocol.saveIdentity(this.identity);

    // Join channel's swarm to start synchronization
    this.setChannel(channel.name);

    return `Joined channel: "${this.channel.name}"`;
  }

  async post(text) {
    if (!this.identity) {
      throw new Error('`iam()` must be called first');
    }

    const body = Message.json({ text });
    const message = await this.channel.post(body, this.identity);

    await this.displayChannel();

    return '(successfully posted message)';
  }

  channels() {
    console.log(this.protocol.getChannelNames().map((name) => {
      return `setChannel(${JSON.stringify(name)})`;
    }).join('\n'));
    return '(done)';
  }

  identities() {
    console.log(this.protocol.getIdentityNames().map((name) => {
      return `iam(${JSON.stringify(name)})`;
    }).join('\n'));
    return '(done)';
  }

  setChannel(name) {
    if (this.channel) {
      this.swarm.leave(this.channel.id);
      for (const socket of this.swarm.connections) {
        socket.destroy();
      }
    }

    const channel = this.protocol.getChannel(name);
    if (!channel) {
      throw new Error(`Unknown channel: "${name}". ` +
        `Use \`requestInvite()\` to join`);
    }

    const onMessage = () => {
      this.displayChannel().catch(() => {});
      channel.waitForIncomingMessage().promise.then(onMessage);
    };

    channel.waitForIncomingMessage().promise.then(onMessage);

    this.channel = channel;
    this.swarm.join(channel.id, {
      lookup: true,
      announce: true,
    });

    return '(joined channel)';
  }

  //
  // Utils
  //

  async displayChannel() {
    const count = await this.channel.getMessageCount();

    const result = [];
    for (let i = Math.max(0, count - DISPLAY_COUNT); i < count; i++) {
      const message = await this.channel.getMessageAtOffset(i);
      result.push(this.displayMessage(message));
    }

    console.log('===== CHANNEL UPDATE =====');
    console.log(result.join('\n'));
    console.log('===== CHANNEL UPDATE END =====');

    this.repl.displayPrompt(true);
  }

  displayMessage(message) {
    const author = message.getAuthor(this.channel).displayPath.join('>');
    const body = message.content.body;

    let text;
    if (body.root) {
      text = '<root>';
    } else {
      text = JSON.parse(body.json).text;
    }
    return `(${message.height}) [${author}]: ${text}`;
  }

  // Networking

  onConnection(stream) {
    const socket = new StreamSocket(stream);

    this.protocol.connect(socket).catch((e) => {
      console.error(e.stack);
    });
  }
}
