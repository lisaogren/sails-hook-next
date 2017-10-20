/**
 * Next.js specific routes configuration
 */
module.exports.routes = {
  // All request but the ones starting with `/api` to handle SSR
  'r|^/(?!api).*$|': 'NextController.index'
}
