const chalk = require('chalk')
const next = require('next')

const defaultConfig = require('../../../config/next')

module.exports = (sails) => {
  return {
    defaults: {
      __configKey__: defaultConfig
    },

    configure () {
      const dev = process.env.NODE_ENV !== 'production'

      // Retrieve configuration
      const { server, api } = sails.config[this.configKey]
      // todo: Probably check if blueprints is enabled before getting the prefix
      const isBlueprintsSimilar = api.prefix !== sails.config.blueprints.prefix

      if (isBlueprintsSimilar) {
        log('blueprints.prefix !== next.api.prefix. ' +
            'They need to be the same for API calls to work. ' +
            `Expected "${api.prefix}"`)
      }

      // Create special route to handle Next.js SSR
      sails.on('router:after', () => {
        sails.router.bind(toRegex(api.prefix), {
          skipAssets: false,

          target: (req, res) => {
            this.config().handle(req, res)
          }
        })
      })

      // Create a bridge to Next.js app instance
      const nextApp = next({ ...server, dev })

      // Retrieve request handler
      this.config().handle = nextApp.getRequestHandler()

      this.config().app = nextApp
    },

    config () {
      return sails.config[this.configKey]
    },

    async initialize (done) {
      // Prepare Next.js app
      try {
        this.config().app.preprare()
      } catch (ex) {
        error(ex.stack)
      }
    }
  }

  function title () {
    return `${chalk.cyan('sails-hook-next')}:`
  }

  function log (...args) {
    sails.log.debug(title(), ...args)
  }

  function error (...args) {
    sails.log.error(title(), ...args)
  }

  function toRegex (route) {
    if (route.indexOf('/') === 0) route = route.substr(1)

    return `r|^/(?!${route}).*$|`
  }
}
