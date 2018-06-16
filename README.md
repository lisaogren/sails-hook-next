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

### Custom routes

To handle custom routes we need to configure a `sails` controller to render the correct `next` page.

Define a route pointing to the controller:

```js
// config/routes.js
module.exports = {
  'GET /blog/:articleId': 'BlogController.article'
}
```

Define the controller which calls `sails.config.next.app.render()` method passing the route parameters along:

```js
// api/controllers/BlogController.js
module.exports = {
  article (req, res) {
    const articleId = req.param('articleId')
    sails.config.next.app.render(req, res, '/blog', { articleId })
  }
}
```

Define the `next` blog page which receives the parameters through the `query` in the `getInitialProps()` method:

```js
// pages/blog.js
import { Component } from 'react'

class BlogPage extends Component {
  static getInitialProps ({ query: { articleId } }) {
    return { articleId }
  }

  render () {
    return (
      <div>
        <h1>My {this.props.articleId} blog post</h1>
      </div>
    )
  }
}

export default BlogPage
```

Linking to the blog page:

```js
// pages/index.js
import Link from 'next/link'

export default () => (
  <ul>
    <li>
      <Link href='/blog?id=first' as='/blog/first'>
        <a>My first blog</a>
      </Link>
    </li>
  </ul>
)
```

### Hook configuration

You can override hook configuration by creating a `config/next.js` file in your Sails application.

Default configuration:

```js
module.exports.next = {
  // Sails integration options
  api: {
    // Prefix for all Sails API routes
    prefix: '/api'
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

Then run Sails in production mode using `NODE_ENV=production node app.js`.

For more info see the [Next.js](https://github.com/zeit/next.js/#production-deployment) and [Sails](https://sailsjs.com/documentation/concepts/deployment) deployment documentation.

### Interactions between Next.js and Sails

* The Next.js app instance can be accessed anywhere with `sails.config.next.app`.
* The Next.js request handler for SSR is attached to `sails.config.next.handle`.

## sails-hook-next in the wild

Don't have a real example using the latest version of `sails-hook-next` yet.

If you have an example don't hesitate to add it here by submitting a pull request.
