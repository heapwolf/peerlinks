const repl = require('repl')
const vm = require('vm')

const Storage = require('@peerlinks/level-storage')

const Chat = require('../')

async function main () {
  const io = repl.start({
    eval (cmd, context, _, callback) {
      const promise = vm.runInContext(cmd, context)
      if (promise && promise.then) {
        promise.then((answer) => callback(null, answer))
      } else {
        callback(null, promise)
      }
    }
  })

  const storage = new Storage({})

  const instance = process.env.INST || 0
  await storage.open(`./data-${instance}.level`)

  io.on('exit', () => {
    console.log('Saving...')
    storage.close().then(() => {
      process.exit(0)
    })
  })

  const chat = new Chat(io, storage)

  await chat.load()

  function expose (method) {
    io.context[method] = async (...args) => {
      try {
        return await chat[method](...args)
      } catch (err) {
        console.error('Error: ' + err.stack)
        return '(error)'
      }
    }
  }

  io.context.help = () => {
    console.log('Available commands:')
    console.log('  iam(\'name\') - create new or select existing ' +
      'identity+channel')
    console.log('  setChannel(\'channel name\') - set current channel')
    console.log('  post(\'message text\') - post message to current channel')
    console.log('  requestInvite() - request an invite to new channel')
    console.log('  identities() - list available identities')
    console.log('  channels() - list available channels')
    return '(help end)'
  };

  [
    'iam',
    'post',
    'requestInvite',
    'issueInvite',

    'identities',
    'channels',
    'setChannel'
  ].forEach(expose)
}

main().catch((e) => {
  console.error(e.stack)
})
