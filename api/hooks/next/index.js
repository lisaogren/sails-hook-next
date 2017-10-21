/* globals sails */

const next = require('next')
const chalk = require('chalk')
const extend = require('extend')
const Marlinspike = require('marlinspike')

let hook = sails.hooks.next

if (!hook) {
  class Next extends Marlinspike {
    constructor (sails) {
      super(sails, module)
    }

    configure () {
      log('Configure')

      const dev = process.env.NODE_ENV !== 'production'

      // Retrieve configuration
      const { server, api } = sails.config.next
      const isBlueprintsSimilar = api.prefix !== sails.config.blueprints.prefix

      if (isBlueprintsSimilar) {
        log(`blueprints.prefix !== next.api.prefix. They need to be the same for API calls to work. Expected "${api.prefix}"`)
      }

      // Create special route to handle Next.js SSR
      sails.config.routes[toRegex(api.prefix)] = api.controller

      // Create Next.js app instance
      sails.next = next(extend(server, { dev }))

      // Retrieve request handler
      sails.handle = sails.next.getRequestHandler()
    }

    initialize (done) {
      log('Initialize')

      // Prepare Next.js app
      sails.next.prepare().then(done).catch(ex => error(ex.stack))
    }
  }

  // Wrap hook
  hook = Marlinspike.createSailsHook(Next)
}

module.exports = hook

/**
 * Helpers
 */

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
