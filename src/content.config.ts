import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 单一内容集合：长文 / 研报。
// 刻意只用 .md（不用 .mdx）——每个自定义组件都是一次未来的崩坏。
// 真正需要图表交互的那一两篇，再单独开 mdx，不要默认全开。
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    // 一句话摘要。这一行会同时进 <meta description>、列表页、以及 llms.txt —— 写好它。
    summary: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // 用于分组的主题标签，控制在一个小而稳定的集合里。
    // 话题发散 = 算法和评审都认不出你是谁。
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh']).default('en'),
    // draft: true 的文章不会进构建产物，可以安全地留在仓库里慢慢写。
    draft: z.boolean().default(false),
    // 原始出处（如果这篇是从旧研报改写而来），保留可追溯性。
    originalSource: z.string().optional(),
    // 另一语言版本的 entry id（例：英文篇写 'zh/foo'，中文篇写 'foo'）。
    // 两边必须互指。没有它，同一篇的中英版会被搜索引擎判成重复内容，权重互相稀释。
    translationOf: z.string().optional(),
  }),
});

export const collections = { writing };
