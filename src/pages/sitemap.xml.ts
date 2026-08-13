import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * /sitemap.xml
 * ============
 * 手写，不装 @astrojs/sitemap —— 同 rss.xml.ts 的理由：少一个依赖，少一处会烂的地方。
 *
 * 两个必须守住的点：
 *   1. URL 必须和 <link rel="canonical"> 逐字相同（无 .html 后缀、无尾斜杠）。
 *      sitemap 里写 /cv.html 而 canonical 写 /cv，等于告诉爬虫这是两个页面。
 *   2. draft 的文章绝不能进 —— 它们没有对应的 HTML，爬虫会拿到 404，
 *      整份 sitemap 的可信度跟着掉。
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';

  const entries = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const iso = (d: Date) => d.toISOString().split('T')[0];

  // 静态页没有真实修改时间，用最新一篇文章的日期近似 —— 首页和 /writing 的内容
  // 确实随文章更新而变，这个近似是诚实的。
  const newest = entries[0]?.data.updatedDate ?? entries[0]?.data.pubDate ?? new Date(0);

  type Entry = { loc: string; lastmod: string; priority: string };

  const urls: Entry[] = [
    { loc: `${base}/`, lastmod: iso(newest), priority: '1.0' },
    { loc: `${base}/writing`, lastmod: iso(newest), priority: '0.9' },
    { loc: `${base}/projects`, lastmod: iso(newest), priority: '0.7' },
    { loc: `${base}/cv`, lastmod: iso(newest), priority: '0.7' },
    ...entries.map((entry) => ({
      loc: `${base}/writing/${entry.id}`,
      lastmod: iso(entry.data.updatedDate ?? entry.data.pubDate),
      priority: '0.8',
    })),
  ];

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
