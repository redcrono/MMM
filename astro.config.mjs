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
        !page.includes('/en/') &&
        !page.endsWith('/en') &&
        !page.includes('/blog/en-') &&
        !page.includes('/blog/korea-') &&
        !page.includes('/blog/open-korea-') &&
        !page.includes('/blog/best-korea-') &&
        !page.includes('-expats') &&
        !page.includes('-foreigners') &&
        !page.includes('travel-cards') &&
        !page.endsWith('/contact') &&
        !page.endsWith('/privacy') &&
        !page.endsWith('/terms') &&
        !page.endsWith('/disclaimer') &&
        !page.endsWith('/battle') &&
        !page.endsWith('/calendar') &&
        !page.endsWith('/ladder') &&
        !page.endsWith('/tools') &&
        !page.endsWith('/etf') &&
        !page.endsWith('/qna'),
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
