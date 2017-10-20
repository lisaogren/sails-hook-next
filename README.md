# sails-hook-next

Next.js Hook for SailsJS

The idea is to completely integrate the Next.js framework with a Sailsjs API
so that we can have the power of a server-rendered React app and an awesome REST API.

## Installation

Initialize a Sails project with no frontend:

```
sails new my-project --no-frontend && cd my-project
```

Then install the hook using npm. You also need to chip in its dependencies.

```
npm install --save sails-hook-next react react-dom next
```

## Usage

The only necessary configuration is that all your sails API routes are prefixed with `/api` (will be configurable soon).
This can be achieved for blueprints by setting the `prefix` key to `/api` in your `config/blueprints.js` file.

Then just lift your Sails application to run in development mode:

```
sails lift
```

### Production

> TODO: Find how to build and run in production mode

### Interactions between Next.js and Sails

* The Next.js app instance can be accessed anywhere with `sails.next`.
* The Next.js request handler for SSR is attached to `sails.handle`.

## Roadmap

What we need:

* [x] Instantiate a Next.js app and expose it as `sails.next`
* [x] Global Next.js handler exposing `pages` special folder for SSR
* [ ] Create config options for the hook to configure the global Next.js handler (override `/api` prefix)
* [ ] Replicate Next.js route aliases, overriding global handler, for pretty urls while keeping SSR. Probably use [next-routes](https://github.com/fridays/next-routes)
