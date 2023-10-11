# nuxt-image-directus

This Nuxt module provides a `DirectusImg` helper component for displaying images from a Directus instance.  It also supports full static site generation by downloading all of the images on pre-rendered pages to a local directory and replaces the image source to the local path so the images can be statically served with the rest of the site.

## Features

- Display an image from your Directus instance by specifying it's file ID

```vue
<DirectusImg src="6e0232e9-3a1c-4559-873e-f5a67cac8308" />
```

- Add the width and/or height properties and the image will be resized by Directus

```vue
<DirectusImg src="6e0232e9-3a1c-4559-873e-f5a67cac8308" width="400" />
```

- Add the quality, fit, and/or format properties

```vue
<DirectusImg src="6e0232e9-3a1c-4559-873e-f5a67cac8308" width="400" height="200" fit="cover" format="png" quality="80" />
```

- Add any additional [advanced transformations](https://docs.directus.io/reference/files.html#advanced-transformations) supported by Directus' built-in sharp library:

```vue
<DirectusImg src="6e0232e9-3a1c-4559-873e-f5a67cac8308" width="400" :transforms="[['rotate', 180], ['blur', 10]]" />
```

## Quick Setup

1. Add `nuxt-image-directus` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-image-directus

# Using yarn
yarn add --dev nuxt-image-directus

# Using npm
npm install --save-dev nuxt-image-directus
```

2. Add `nuxt-image-directus` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-image-directus'
  ]
})
```

3. Set the URL to your Directus instance (and add a static access token if needed for Authentication)

- Added to the `nuxt.config.ts` file

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-image-directus'
  ],
  nuxtImageDirectus: {
    baseURL: 'https://yourdirectus.com',    // REQUIRED url to your Directus instance
    token: '0123456789abcdef'               // OPTIONAL static access token for authentication
  }
})
```

- OR set as environment variables (such as in a `.env` file)

```sh
DIRECTUS_URL=https://yourdirectus.com
DIRECTUS_TOKEN=0123456789abcdef
```

## Usage

When running Nuxt in development mode or in the standard SSR/hybrid mode, the image will be linked directly to Directus.  When running `nuxi generate`, all of the images in the pre-rendered routes will be downloaded and linked to the local static images.

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

