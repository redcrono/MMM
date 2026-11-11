import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.megamomo.co.kr',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/search') &&
        !page.endsWith('/contact') &&
        !page.endsWith('/privacy') &&
        !page.endsWith('/terms') &&
        !page.endsWith('/disclaimer') &&
        !page.endsWith('/battle') &&
        !page.endsWith('/calendar') &&
        !page.endsWith('/ladder'),
    }),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  prefetch: true,
});
