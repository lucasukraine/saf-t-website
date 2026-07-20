import { getCollection } from 'astro:content';

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

export async function GET(context) {
  const siteUrl = context.site?.toString().replace(/\/$/, '') ?? 'https://saftconnector.com';
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${siteUrl}/blog/${post.id}/</link>
      <guid>${siteUrl}/blog/${post.id}/</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.description)}</description>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>SAF-T Connector — Блог</title>
    <link>${siteUrl}/blog/</link>
    <description>Практичні гайди про SAF-T UA: вимоги, структура файлу, валідація та інтеграція з ERP.</description>
    <language>uk</language>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
