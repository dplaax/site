// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dplaax.dev',
  output: 'static',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
    fallback: {
      ja: 'en',
    },
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
