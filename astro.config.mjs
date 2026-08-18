import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.megamomo.co.kr',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin'),
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
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
