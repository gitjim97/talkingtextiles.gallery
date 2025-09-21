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
      // Remove custom pages that are auto-generated to avoid duplicates
      // Only add truly custom pages not handled by Astro routing
      customPages: []
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: false, // Inline critical CSS
      rollupOptions: {
        output: {
          manualChunks: {
            'critical': ['./src/styles/global.css']
          }
        }
      }
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: ['talkingtextiles.gallery']
  },
  // Ensure consistent trailing slash behavior
  trailingSlash: 'always'
});