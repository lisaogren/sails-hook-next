const chalk = require('chalk');
const extend = require('extend');
const next = require('next');

import defaultConfig from '../../../config/next.js';

module.exports = (sails) => {
  return {
    defaults: {
      __configKey__: defaultConfig,
    },

    configure() {
      const dev = process.env.NODE_ENV !== 'production';

      // Retrieve configuration
      const { server, api } = sails.config[this.configKey];
      const isBlueprintsSimilar = api.prefix !== sails.config.blueprints.prefix;

      if (isBlueprintsSimilar) {
        log('blueprints.prefix !== next.api.prefix. ' +
            'They need to be the same for API calls to work. ' +
            `Expected "${api.prefix}"`);
      }

      // Create special route to handle Next.js SSR
      sails.on('router:before', () => {
        sails.router.bind(toRegex(api.prefix), {
          skipAssets: false,

          target: (req, res) => {
            sails.config[this.configKey].handle(req, res);
          },
        });
      });

      // Create a bridge to Next.js app instance
      const nextBridge = next({ ...server, dev});

      // Retrieve request handler
      sails.config[this.configKey].handle = nextBridge.getRequestHandler();

      sails.config[this.configKey].bridge = nextBridge;
    },

    initialize(done) {
      // Prepare Next.js app
      sails.config[this.configKey].bridge
        .prepare()
        .then(done)
        .catch(ex => error(ex.stack));
    }
  };


  function title () {
    return `${chalk.cyan('sails-hook-next')}:`;
  }

  function log (...args) {
    sails.log.debug(title(), ...args);
  }

  function error (...args) {
    sails.log.error(title(), ...args);
  }

  function toRegex (route) {
    if (route.indexOf('/') === 0) {
      route = route.substr(1);
    }

    return `r|^/(?!${route}).*$|`;
  }

};
