import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { person } from '../data/profile';

// 手写 RSS，不装 @astrojs/rss。少一个依赖，少一处未来会烂的地方。
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';

  const entries = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = entries
    .map(
      (entry) => `    <item>
      <title>${escape(entry.data.title)}</title>
      <link>${base}/writing/${entry.id}</link>
      <guid isPermaLink="true">${base}/writing/${entry.id}</guid>
      <description>${escape(entry.data.summary)}</description>
      <pubDate>${entry.data.pubDate.toUTCString()}</pubDate>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(person.name)}</title>
    <link>${base}</link>
    <description>${escape(person.tagline)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
