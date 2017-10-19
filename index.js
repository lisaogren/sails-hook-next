const next = require('next')

module.exports = function (sails) {
  return {
    // Default hook configuration
    defaults: {

    },

    configure () {
      console.log('[sails-hook-next] Configuring')

      const dev = process.env.NODE_ENV !== 'production'
      sails.next = next({ dev })
      sails.handle = sails.next.getRequestHandler()
    },

    initialize (done) {
      console.log('[sails-hook-next] Initializing')

      sails.next.prepare()
        .then(() => {
          console.log('Youpi')
          done()
        })
        .catch(ex => {
          console.log('niaaargh', ex.stack)
        })
    }
  }
}
