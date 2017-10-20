/**
 * Next.js Controller for Sails
 */

/* globals sails */

module.exports = {
  index (req, res) {
    sails.handle(req, res)
  }
}
