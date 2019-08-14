/* eslint-env node, mocha */
import * as assert from 'assert';

import { Channel, Identity, Link } from '../';
import { now } from '../lib/utils';

describe('Link', () => {
  let issuer = null;

  beforeEach(() => {
    issuer = new Identity('test');
  });

  afterEach(() => {
    issuer = null;
  });

  it('should be issued by identity', () => {
    const channel = new Channel('test-channel', issuer.publicKey);

    const trustee = new Identity('trustee');

    const link = issuer.issueLink(channel, {
      trusteePubKey: trustee.publicKey,
      trusteeDisplayName: 'trustee',
    });

    assert.ok(link.verify(channel, issuer.publicKey));
    assert.ok(!link.verify(channel, trustee.publicKey));

    // Invalid because of timestamp
    const ONE_YEAR = 365 * 24 * 3600;
    assert.ok(!link.verify(channel, issuer.publicKey, now() + ONE_YEAR));
  });

  it('should be throw on invalid name length', () => {
    const channel = new Channel('test-channel', issuer.publicKey);

    const trustee = new Identity('trustee');

    assert.throws(() => {
      issuer.issueLink(channel, {
        trusteePubKey: trustee.publicKey,
        trusteeDisplayName: 'trustee'.repeat(100),
      });
    }, {
      name: 'Error',
      message: 'Invalid trusteeDisplayName length: 700',
    });
  });

  it('should be serialized/deserialized', () => {
    const channel = new Channel('test-channel', issuer.publicKey);

    const trustee = new Identity('trustee');

    const link = issuer.issueLink(channel, {
      trusteePubKey: trustee.publicKey,
      trusteeDisplayName: 'trustee',
    });

    const proto = link.serializeData();
    const deserialized = Link.deserializeData(proto);

    assert.ok(deserialized.verify(channel, issuer.publicKey));
    assert.strictEqual(deserialized.trusteeDisplayName, 'trustee');
  });
});
