import type { APIRoute } from 'astro';

const robotsTxt = `
User-agent: *
Allow: /

# Google AdSense Crawler
User-agent: Mediapartners-Google
Allow: /

# Googlebot
User-agent: Googlebot
Allow: /

Sitemap: https://megamoneymomentum.com/sitemap-index.xml
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
