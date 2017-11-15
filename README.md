# sails-hook-next

Next.js Hook for SailsJS

The idea is to completely integrate the Next.js framework with a Sailsjs API
so that we can have the power of a server-rendered React app and an awesome REST API.

## Installation

Initialize a Sails project with no frontend:

```
sails new my-project --no-frontend && cd my-project
```

Then install the hook using npm. You also need to include its dependencies.

```
npm install --save sails-hook-next react react-dom next
```

## Usage

Create a `pages` folder at the root of your project to store your Next.js pages. Example:

```js
// pages/index.js
export default () => (
  <div>
    <h1>Hello Next.js</h1>
  </div>
)
```

*For more info see the [Next.js documentation](https://github.com/zeit/next.js) or the awesome [learnnextjs.com](https://learnnextjs.com/) tutorial*

The only necessary Sails configuration is that all your API routes are prefixed with `/api`.
This can be achieved for blueprints by setting the `prefix` key to `/api` in your `config/blueprints.js` file.

Then just lift your Sails application to run in development mode:

```
sails lift
```

### Hook configuration

You can override hook configuration by creating a `config/next.js` file in your Sails application.

Default configuration:

```js
module.exports.next = {
  // Sails integration options
  api: {
    // Prefix for all Sails API routes
    prefix: '/api',
    // Controller used for Next.js SSR
    controller: 'NextController.index'
  },

  // Next.js instance options. Passed to `next()`.
  server: {
    // Next.js root directory
    dir: '.',
    // Dev mode. Is overridden by `process.env.NODE_ENV !== 'production'`
    dev: false,
    // Hide error messages
    quiet: false,
    // Equivalent to a `next.config.js` file
    conf: {}
  },
}
```

### Production

To run in production mode you need to build your next application first using `next build`.
If `next` is not installed globally you can run it using `npx next build`.

This will generate the production version of your `next` app in the `.next` folder.

Then run Sails in production mode using either `sails lift --prod` or `NODE_ENV=production node app.js`.

For more info see the [Next.js](https://github.com/zeit/next.js/#production-deployment) and [Sails](https://sailsjs.com/documentation/concepts/deployment) deployment documentation.

### Interactions between Next.js and Sails

* The Next.js app instance can be accessed anywhere with `sails.next`.
* The Next.js request handler for SSR is attached to `sails.handle`.

## Roadmap

What we need:

* [x] Instantiate a Next.js app and expose it as `sails.next`
* [x] Global Next.js handler exposing `pages` special folder for SSR
* [x] Create config options for the hook to configure the global Next.js handler (override `/api` prefix)
* [ ] Replicate Next.js route aliases, overriding global handler, for pretty urls while keeping SSR. Probably use [next-routes](https://github.com/fridays/next-routes)

## sails-hook-next in the wild

I'm currently working on a small web app using Next+Sails called [next-time-tracker](https://github.com/RasCarlito/next-time-tracker)
which is a good example of a real implementation of this hook.

If you have an example don't hesitate to add it here by submitting a pull request.
