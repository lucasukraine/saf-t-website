// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// ─────────────────────────────────────────────────────────────────────────────
// DEPLOYMENT CONFIGURATION — switch between GitHub Pages and production:
//
//   Development — GitHub Pages subpath:
//     site: 'https://YOUR-GITHUB-USERNAME.github.io',
//     base: '/saf-t-website/',
//
//   Production — Custom domain:
//     site: 'https://saf-t.com.ua',
//     base: '/',
//
// noindex is added automatically on github.io builds (see BaseLayout.astro).
// When switching to production, remove noindex by switching to the production
// site/base values below — no other changes needed.
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
  // Temporary — GitHub Pages (https://lucasukraine.github.io/saf-t-website/)
  // noindex is added automatically for *.github.io deployments (see BaseLayout.astro).
  site: 'https://lucasukraine.github.io',
  base: '/saf-t-website/',

  // Production — switch to this when moving to the custom domain:
  // site: 'https://saf-t.com.ua',
  // base: '/',

  integrations: [sitemap(), sitemapAlias],
});
