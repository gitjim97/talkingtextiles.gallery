// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://talkingtextiles.gallery',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Custom pages to include
      customPages: [
        'https://talkingtextiles.gallery/gallery',
        'https://talkingtextiles.gallery/anthology',
        'https://talkingtextiles.gallery/show/book',
        'https://talkingtextiles.gallery/classes/book'
      ]
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});