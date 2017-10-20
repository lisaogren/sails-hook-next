/* globals sails */

const next = require('next')
const Marlinspike = require('marlinspike')

let hook = sails.hooks.next

if (!hook) {
  class Next extends Marlinspike {
    constructor (sails) {
      super(sails, module)
    }

    configure () {
      console.log('[sails-hook-next] Configuring')

      const dev = process.env.NODE_ENV !== 'production'
      sails.next = next({ dev })
      sails.handle = sails.next.getRequestHandler()
    }

    initialize (done) {
      console.log('[sails-hook-next] Initializing')

      sails.next.prepare()
        .then(done)
        .catch(ex => {
          console.error(ex.stack)
        })
    }
  }

  hook = Marlinspike.createSailsHook(Next)
}

module.exports = hook
