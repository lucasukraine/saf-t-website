// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// ─────────────────────────────────────────────────────────────────────────────
// DEPLOYMENT CONFIGURATION
//
// Production — custom domain on GitHub Pages:
//   site: 'https://saftconnector.com', base: '/'
//   The custom domain is declared in public/CNAME (shipped with the Pages
//   artifact). DNS: apex A-records → GitHub Pages IPs, www CNAME →
//   lucasukraine.github.io. noindex is OFF on this hostname.
//
// Dev fallback — GitHub Pages subpath (noindex added automatically for
// *.github.io hostnames, see BaseLayout.astro):
//   site: 'https://lucasukraine.github.io', base: '/saf-t-website/'
// ─────────────────────────────────────────────────────────────────────────────

const sitemapAlias = {
  name: 'sitemap-alias',
  hooks: {
    'astro:build:done': (/** @type {{ dir: URL }} */ { dir }) => {
      try {
        copyFileSync(
          fileURLToPath(new URL('sitemap-index.xml', dir)),
          fileURLToPath(new URL('sitemap.xml', dir)),
        );
      } catch {}
    },
  },
};

export default defineConfig({
  site: 'https://saftconnector.com',
  base: '/',

  integrations: [sitemap(), sitemapAlias],
});
