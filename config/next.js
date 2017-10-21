/**
 * sails-hook-next configuration
 */

module.exports.next = {
  name: 'next',

  configKey: 'next',

  api: {
    prefix: '/api',
    controller: 'NextController.index'
  },

  server: {
    dir: '.',
    dev: false,
    quiet: false,
    conf: {}
  },

  marlinspike: {
    controllers: true,
    config: true,
    models: false,
    services: false,
    policies: false
  }
}
