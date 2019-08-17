# vowlink-protocol
[![Build Status](https://travis-ci.org/vowlink/vowlink-protocol.svg?branch=master)](http://travis-ci.org/vowlink/vowlink-protocol)

Implementation of VowLink [Protocol][] in JavaScript.

## Protocol

At this point the most useful starting point would be a [Protocol][] description
page.

## Usage

Initialization:
```js
import VowLink, { Message, StreamSocket } from '@vowlink/protocol';
import SqliteStorage from '@vowlink/sqlite-storage';

// Initialize persistence layer
const storage = new SqliteStorage({ file: 'db.sqlite' });
await storage.open();

// Initialize protocol layer
const vowLink = new VowLink({
  storage,
  password: 'secret',
});
await vowLink.load();

// Create identity (and associated channel)
// NOTE: multiple identities/channels are supported
const identity = await vowlink.createIdentity('identity-name');
const channel = vowlink.getChannel('identity-name');
```

See [@vowlink/hyperswarm][swarm] for details on connecting to remote peers and
requesting/issuing invites.

Process incoming messages (and similarly outgoing with `waitForOutgoingMessage`:
```js
function loop() {
  const wait = channel.waitForIncomingMessage();
  wait.promise.then((message) => {
    // Display message
    loop();
  });

  // Call `wait.cancel()` if needed
}
loop();
```
See [promise-waitlist][] for waiting APIs here and in later code samples..

Post a new message:
```js
const author = identity;
await channel.post(Message.json({ /* any json data here */ }), author);
```

Display channel messages:
```js
const count = await channel.getMessageCount();

// Get the latest 100 messages
const messages = await channel.getMessagesAtOffset(
  Math.max(0, count - 100), // offset
  100); // limit

for (const message of messages) {
  const displayPath = message.getAuthor().displayPath;

  const text = message.isRoot ? '<root>' : message.json.text;

  console.log(`${displayPath.join('>')}: ${text}`);
}
```

## Help requested

The protocol draft and the implementations are in the very early stages. Any
feedback or ideas on boths are very appreciated.

Not exhaustive list of possible issues:

* Unclear wording in the protocol description
* Cryptography problems
* Bugs in implementation
* API improvements
* Documentation!

## LICENSE

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2019.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.

[Protocol]: protocol.md
[promise-waitlist]: https://github.com/indutny/promise-waitlist
[swarm]: https://github.com/vowlink/vowlink-swarm
