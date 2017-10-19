# sails-hook-next

Next.js Hook for SailsJS

Currently just a work in progress.

The idea is to completely integrate the Next.js framework with a Sailsjs API
so that we can have the power of a server-rendered React app and an awesome REST API.

## Installation

```
npm install --save sails-hook-next
```

## Usage

Coming as soon as I found out how to implement this.

What we need:

* [x] Instantiate a Next.js app and expose it as `sails.next`
* [ ] Global Next.js handler exposing `pages` special folder for SSR
* [ ] Replicate Next.js route aliases, overriding global handler, for pretty urls while keeping SSR
