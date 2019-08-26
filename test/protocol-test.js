/* eslint-env node, mocha */
import * as assert from 'assert';
import * as sodium from 'sodium-universal';

import Protocol, { Channel, Message } from '../';

import Socket from './fixtures/socket';

describe('Protocol', () => {
  let a = null;
  let b = null;
  let socketA = null;
  let socketB = null;

  beforeEach(async () => {
    a = new Protocol({ sodium });
    await a.load();

    b = new Protocol({ sodium });
    await b.load();

    [ socketA, socketB ] = Socket.pair();
  });

  afterEach(() => {
    a = null;
    b = null;
  });

  it('should create new identity with a channel', async () => {
    const [ test, _ ] = await a.createIdentityPair('test');
    assert.strictEqual(test.name, 'test');

    assert.strictEqual(a.identities.length, 1);
    assert.strictEqual(a.channels.length, 1);
  });

  it('should remove the identity and the channel', async () => {
    const [ id, channel ] = await a.createIdentityPair('test');

    await a.removeIdentity(id);
    await a.removeChannel(channel);
    assert.strictEqual(a.channels.length, 0);
    assert.strictEqual(a.identities.length, 0);
  });

  it('should reload identities/channels from a storage', async () => {
    const id2 = (await a.createIdentityPair('2'))[0];
    const id1 = (await a.createIdentityPair('1'))[0];

    assert.strictEqual(id1.name, '1');
    assert.strictEqual(id2.name, '2');

    const clone = new Protocol({ storage: a.storage, sodium });
    await clone.load();

    assert.ok(clone.getIdentity('1').canInvite(clone.getChannel('1')));
    assert.ok(clone.getIdentity('1').canPost(clone.getChannel('1')));

    assert.deepStrictEqual(clone.channels.map((channel) => channel.name),
      [ '1', '2' ]);
    assert.deepStrictEqual(clone.identities.map((id) => id.name),
      [ '1', '2' ]);
  });

  it('should connect peers', async () => {
    const [ idA, _ ] = await a.createIdentityPair('a');
    const [ idB, channelB ] = await b.createIdentityPair('b');
    const [ idC, duplicate ] = await b.createIdentityPair('a');

    const run = async () => {
      // Generate invite request
      const { requestId, request, decrypt } = idA.requestInvite(a.id);
      const invitePromise = a.waitForInvite(requestId).promise;

      // Issue invite
      const { encryptedInvite, peerId } = idB.issueInvite(
        channelB, request, 'b');

      // Post a message
      await channelB.post(Message.json('ohai'), idB);

      // Send it back
      const peer = await b.waitForPeer(peerId).promise;
      await peer.sendInvite(encryptedInvite);

      // Decrypt and create channel
      const invite = decrypt(await invitePromise);
      const channelForA = await a.channelFromInvite(invite, idA);

      // Same channels should not be added, but can be ignored
      const ignored = await Channel.deserializeData(
        channelForA.serializeData(),
        { sodium });
      await a.addChannel(ignored);

      // Duplicate adds should throw
      await assert.rejects(a.addChannel(duplicate), {
        name: 'Error',
        message: 'Channel with a duplicate name: "a"',
      });

      assert.strictEqual(await channelForA.getMessageCount(), 0);
      await assert.rejects(channelForA.post(Message.json('no-sync', idA)), {
        name: 'Error',
        message: 'Initial synchronization not complete',
      });

      // Wait for sync to complete
      await new Promise((resolve) => setImmediate(resolve));

      assert.strictEqual(await channelForA.getMessageCount(), 2);
      const last = await channelForA.getReverseMessagesAtOffset(0);
      assert.strictEqual(last[0].json, 'ohai');
    };

    const [ socketC, socketD ] = Socket.pair();

    await Promise.race([
      Promise.all([
        a.connect(socketA),
        b.connect(socketB),

        // Test duplicate connections too
        a.connect(socketC),
        b.connect(socketD),
      ]),
      run(),
    ]);

    await a.close();
    await b.close();
  });

  it('should sync read-only channels', async () => {
    const [ idA, channelA ] = await a.createIdentityPair('a');
    const [ idB, _ ] = await b.createIdentityPair('b');

    const run = async () => {
      // Post a message
      await channelA.post(Message.json('ohai'), idA);

      const readonly = await b.channelFromPublicKey(channelA.publicKey, {
        name: 'readonly',
      });
      assert.ok(!idB.canInvite(readonly));
      assert.ok(!idB.canPost(readonly));

      assert.strictEqual(await readonly.getMessageCount(), 0);
      while ((await readonly.getMessageCount()) !== 2) {
        await readonly.waitForIncomingMessage().promise;
      }

      const last = await readonly.getReverseMessagesAtOffset(0);
      assert.strictEqual(last[0].json, 'ohai');
    };

    await Promise.race([
      Promise.all([
        a.connect(socketA),
        b.connect(socketB),
      ]),
      run(),
    ]);

    await a.close();
    await b.close();
  });

  it('should self-resolve invite', async () => {
    const [ idA, _ ] = await a.createIdentityPair('a');
    const [ idB, channelB ] = await a.createIdentityPair('b');

    // Generate invite request
    const { requestId, request, decrypt } = idA.requestInvite(a.id);
    const invitePromise = a.waitForInvite(requestId).promise;

    // Issue invite
    const { encryptedInvite, peerId } = idB.issueInvite(
      channelB, request, 'b');
    assert.ok(peerId.equals(a.id));

    // Send it back
    assert.ok(a.resolveInvite(encryptedInvite));

    // Can\'t resolve twice
    assert.ok(!a.resolveInvite(encryptedInvite));

    // Decrypt and create channel
    const invite = decrypt(await invitePromise);
    await a.channelFromInvite(invite, idA, { name: 'b-copy' });
  });

  it('should encrypt/decrypt blobs', async function() {
    // Derivation of encryption key is a slow process
    this.timeout(20000);

    const protocol = new Protocol({ passphrase: 'secret', sodium });
    const encrypted = protocol.encryptData(Buffer.from('hello'));
    const decrypted = protocol.decryptData(encrypted);
    assert.strictEqual(decrypted.toString(), 'hello');

    // Should create encrypted identity
    await a.createIdentityPair('test');
  });

  it('should work when peers have no common channels', async () => {
    const idA = (await a.createIdentityPair('a'))[0];
    const idB = (await b.createIdentityPair('b'))[0];

    await Promise.race([
      a.connect(socketA),
      b.connect(socketB),

      // Lame, but okay
      new Promise((resolve) => setTimeout(resolve, 100)),
    ]);

    await a.close();
    await b.close();
  });
});
