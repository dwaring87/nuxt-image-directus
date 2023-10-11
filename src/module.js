import { defineNuxtModule, addComponentsDir, createResolver, addServerHandler } from '@nuxt/kit';
import { fileURLToPath } from "url";
import { defu } from 'defu';
import fs from 'fs/promises';

export default defineNuxtModule({
  meta: {
    name: 'nuxt-image-directus',
    configKey: 'nuxtImageDirectus'
  },

  defaults: {
    baseURL: '',
    token: '',
    output_dir: '.output/public/',
    image_dir: '_images/'
  },

  hooks: {
    'close': async (nuxt) => {
      await generateImages(nuxt)
    }
  },

  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));

    if ( (!options?.baseURL || options?.baseURL === '') && !process.env.DIRECTUS_URL ) {
      console.error("[nuxt-image-directus] module baseURL or env var DIRECTUS_URL is not defined!");
    }

    // Add module config to private runtime config
    nuxt.options.runtimeConfig.nuxtImageDirectus = defu(nuxt.options.runtimeConfig.nuxtImageDirectus, {
      isStatic: nuxt.options._generate,
      rootDir: nuxt.options.rootDir,
      baseURL: process.env.DIRECTUS_URL || options.baseURL,
      token: process.env.DIRECTUS_TOKEN || options.token,
      outputDir: options.output_dir,
      imageDir: options.image_dir
    })

    // Add Server Routes
    addServerHandler({
      route: '/nuxt-image-directus/get-src',
      handler: resolver.resolve(runtimeDir, 'server', '[...]')
    });
    addServerHandler({
      route: '/nuxt-image-directus/get-images',
      handler: resolver.resolve(runtimeDir, 'server', '[...]')
    });

    // Add Components
    addComponentsDir({
      path: resolver.resolve(runtimeDir, "components"),
      pathPrefix: false,
      prefix: "",
      global: true,
    });
  }
})

const generateImages = async (nuxt) => {

  // Get runtime options
  const { isStatic, rootDir, outputDir, imageDir } = nuxt.options.runtimeConfig.nuxtImageDirectus;

  // Generate the during nuxt static generation
  if ( isStatic ) {

    // Get cached images URLs
    const images = await $fetch('/nuxt-image-directus/get-images');
    console.log("[nuxt-image-directus] Generating " + Object.keys(images).length + " static images...");

    // Create image directory, if it doesn't exist
    const full_path_image_dir = (`${rootDir}/${outputDir}/${imageDir}`).replaceAll('//', '/');
    try {
      let f = await fs.open(full_path_image_dir);
      f.close();
    }
    catch (err) {
      await fs.mkdir(full_path_image_dir);
    }

    // Generate each image
    for ( const hash in images ) {
      if ( images.hasOwnProperty(hash) ) {
        const url = images[hash];
        console.log("[nuxt-image-directus] ... " + hash + " = " + url);
        const full_path_image = (`${full_path_image_dir}/${hash}`).replaceAll('//', '/');

        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        await fs.writeFile(full_path_image, new Buffer.from(buffer));
      }
    }
    
    console.log("[nuxt-image-directus] All Done!");
  }

}