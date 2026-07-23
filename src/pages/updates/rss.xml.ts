import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../../data/site';

/** RSS feed — submit to Google Search Console for faster update indexing */
export const GET: APIRoute = async () => {
  const posts = (await getCollection('updates')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const items = posts
    .slice(0, 30)
    .map((post) => {
      const link = new URL(`/updates/${post.id}/`, site.url).href;
      const pubDate = post.data.date.toUTCString();
      return `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.data.excerpt}]]></description>
      <enclosure url="${new URL(post.data.image, site.url).href}" type="image/webp"/>
    </item>`;
    })
    .join('');

  const latest = posts[0]?.data.date.toUTCString() ?? new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name} — Yard Stock Updates</title>
    <link>${site.url}/updates/</link>
    <description>MS pipes, ERW and yard stock updates from Navkar Tubes, Ahmedabad.</description>
    <language>en-in</language>
    <lastBuildDate>${latest}</lastBuildDate>
    <atom:link href="${site.url}/updates/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
