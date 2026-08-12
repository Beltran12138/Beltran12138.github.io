# bernardzhao-site

个人站 / 长文档案馆。Astro + Markdown，静态输出，零运行时 JS。

## 为什么是这个技术选型

上一次（`mem/research-platform`）的失败链条是：
`Next.js + next-mdx-remote + gray-matter`（三个活动部件）→ 依赖腐化 → 叠加域名过期 → 全站蒸发。

这次的设计目标只有一个：**让它烂不掉**。

| 决策 | 理由 |
|---|---|
| Astro Content Collections | 内容层是内建的，一个部件而不是三个 |
| 只用 `.md`，不用 `.mdx` | 每个自定义组件都是一次未来的崩坏 |
| 不装 CSS 框架 | 少一个会 breaking change 的依赖 |
| 不装 `@astrojs/rss` | RSS 三十行手写，不值得多一个依赖 |
| 依赖版本 pin 死 | `astro: 7.2.0`，不用 `^` |
| `profile.ts` 而非 `profile.yml` | 不用装 yaml parser，且类型安全 |

**运行时依赖数：1。**

## 单一事实源

`src/data/profile.ts` 是唯一权威版本。以下全部从它派生：

- 首页
- `/cv`（打印即 PDF，有专门的 print stylesheet）
- `/llms.txt`
- Person schema (JSON-LD)

改这一个文件，其他地方自动同步。**你现有四版简历互相打架的问题，在架构层被根除。**

规矩：LinkedIn / GitHub bio 更新时，以本文件为准复制过去，不要反向编辑。

## 目录

```
src/
├── data/profile.ts          ← 单一事实源，先改这里
├── content/writing/*.md     ← 文章。draft: true 不会上线
├── content.config.ts        ← frontmatter schema（写错会在构建时报错，不会带病上线）
├── layouts/Base.astro       ← Person / Article schema 在这里注入
├── pages/
│   ├── index.astro
│   ├── cv.astro
│   ├── projects.astro
│   ├── writing/index.astro
│   ├── writing/[...id].astro
│   ├── llms.txt.ts          ← 自动生成，不会过期
│   └── rss.xml.ts
└── styles/global.css
public/robots.txt
```

## 本地运行

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 产物在 dist/
```

## 发文章

1. 在 `src/content/writing/` 新建 `.md`
2. 填 frontmatter：`title` / `summary` / `pubDate` / `tags` / `draft`
3. `draft: true` 时随便写，不会上线；改成 `false` 并 push 即发布

`summary` 那一行会同时进 meta description、列表页、和 llms.txt —— 值得多花两分钟写好。

## 部署

Cloudflare Pages（推荐）或 GitHub Pages。

- Build command: `npm run build`
- Output directory: `dist`
- Node: 20+

**域名策略**：先用免费的 `*.pages.dev` 跑三个月。确认你确实在持续发文章之后再买域名，
而且**要买就买 5 年**——上一个站就是死在续费上。

## 待办

- [ ] 确认 `profile.ts` 里 HighBlock 的对外 title 与起止日期
- [ ] GitHub 用户名是否统一为 `bernardzhao`；定了之后同步 `person.links`
- [ ] 写完 `hk-crypto-trust-paradox.md`，`draft` 改 false
- [ ] `astro.config.mjs` 的 `site` 换成真实域名（影响 canonical / llms.txt / RSS 里的绝对地址）
- [ ] 存量研报译英，每篇过一遍「能不能公开」的判断
