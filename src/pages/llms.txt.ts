import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { person, roles, projects, groupLabels } from '../data/profile';

/**
 * /llms.txt
 * =========
 * 站点级的 "给 AI 读的地图"。robots.txt 说的是「你能爬什么」，
 * llms.txt 说的是「什么最值得读、该怎么理解」。
 *
 * 格式约定（社区规范）：
 *   - 一个 H1：你的名字
 *   - 紧接一个 blockquote：一句话摘要。这是整个文件最重要的一行，
 *     模型主要靠它判断「这是谁」。
 *   - 若干 H2 分区，每区是链接列表，格式 `- [标题](URL): 说明`
 *
 * 两个提醒：
 *   1. 它不是排名因子，是引用增强工具。
 *   2. 维护不良的 llms.txt 比没有更伤可信度 —— 它由 profile.ts 自动生成，
 *      所以只要 profile.ts 是对的，这里就不会过期。
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';

  const entries = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const current = roles.find((r) => r.end === null);

  const lines: string[] = [];

  lines.push(`# ${person.name}`);
  lines.push('');
  lines.push(`> ${person.tagline} Based in ${person.location}.`);
  lines.push('');

  if (current) {
    lines.push(
      `${current.title} at ${current.org}${current.orgNote ? ` (${current.orgNote})` : ''}. ` +
        `Work spans perpetual-futures product design, OTC and settlement architecture, ` +
        `Hong Kong virtual-asset market research, and open-source tooling that applies ` +
        `AI agents to crypto market intelligence.`
    );
    lines.push('');
  }

  lines.push('## Pages');
  lines.push(`- [CV](${base}/cv): Full professional history, education, and contact details.`);
  lines.push(`- [Projects](${base}/projects): Open-source tooling, grouped by theme.`);
  lines.push(`- [Writing](${base}/writing): Research notes and long-form analysis.`);
  lines.push('');

  if (entries.length > 0) {
    lines.push('## Writing');
    for (const entry of entries) {
      lines.push(`- [${entry.data.title}](${base}/writing/${entry.id}): ${entry.data.summary}`);
    }
    lines.push('');
  }

  const order = ['market-intelligence', 'agent-infra', 'research', 'language-llm'] as const;
  for (const group of order) {
    const items = projects.filter((p) => p.group === group);
    if (items.length === 0) continue;
    lines.push(`## ${groupLabels[group]}`);
    for (const p of items) {
      lines.push(`- [${p.name}](${p.url}): ${p.summary}`);
    }
    lines.push('');
  }

  lines.push('## Profiles');
  for (const [name, url] of Object.entries(person.links)) {
    lines.push(`- [${name}](${url})`);
  }
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
