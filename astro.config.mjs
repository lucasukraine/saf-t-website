// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFileSync, readFileSync, readdirSync } from 'node:fs';
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

// Sitemap <lastmod> is derived straight from each post's own frontmatter
// (the same file getCollection('blog') reads) — never a separately
// maintained date, so it can't drift out of sync.
const buildIso = new Date().toISOString();
const blogDir = fileURLToPath(new URL('./src/content/blog/', import.meta.url));
const blogLastmods = {};
let latestBlogLastmod = null;
for (const file of readdirSync(blogDir).filter((f) => f.endsWith('.md'))) {
  const text = readFileSync(blogDir + file, 'utf-8');
  const pub = text.match(/^pubDate:\s*(\S+)/m)?.[1];
  const upd = text.match(/^updatedDate:\s*(\S+)/m)?.[1];
  if (!pub) continue;
  const iso = new Date(upd ?? pub).toISOString();
  blogLastmods[file.replace(/\.md$/, '')] = iso;
  if (!latestBlogLastmod || iso > latestBlogLastmod) latestBlogLastmod = iso;
}

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

  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/rss.xml'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const slug = path.match(/^\/blog\/([^/]+)\/$/)?.[1];
        if (slug && blogLastmods[slug]) {
          return { ...item, lastmod: blogLastmods[slug] };
        }
        if (path === '/blog/') {
          return { ...item, lastmod: latestBlogLastmod ?? buildIso };
        }
        return { ...item, lastmod: buildIso };
      },
    }),
    sitemapAlias,
  ],
});
