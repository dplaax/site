// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dplaax.dev',
  output: 'static',
  // astro 7's default ('jsx') drops whitespace that spans a line break between
  // elements, so inline elements on separate lines lose their space; true
  // collapses whitespace without changing what renders.
  compressHTML: true,
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
  integrations: [
    sitemap({
      // The i18n fallback materializes /ja/404 as a noindex redirect stub;
      // neither it nor /404 belongs in the sitemap.
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Tailwind v4's browser floor. Without it vite's CSS minifier targets
      // esnext and drops prefixes such as -webkit-backdrop-filter, which
      // Safari before 18 needs.
      cssTarget: ['chrome111', 'edge111', 'firefox128', 'safari16.4', 'ios16.4'],
    },
  },
});
