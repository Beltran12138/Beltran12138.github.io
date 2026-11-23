/**
 * 单一事实源 (Single Source of Truth)
 * ===================================
 * 网站 /cv 页、首页、llms.txt、Person schema、以及将来导出的 PDF 简历
 * 全部从这一个文件派生。改这里，其他地方自动同步 —— version drift 在架构上不可能发生。
 *
 * 纪律：
 *   1. 任何对外声明的事实，只在这里改，不在别处改。
 *   2. LinkedIn / GitHub bio 更新时，以本文件为准复制过去，不要反向编辑。
 *   3. 这里只放「可对外公开」的内容。薪资、推荐人关系、移民路径进私有台账。
 *
 * 为什么用 .ts 而不是 .yml：零额外依赖（不用装 yaml parser）、类型安全、编辑器补全。
 * 部件越少，烂掉的可能越小。
 */

export const person = {
  name: 'Bernard ZHAO',
  // 中文真名不进这个仓库（仓库是 public 的）。
  // 代价：中文姓名 + web3 的组合搜索不会命中这个站，Person schema 也少了 alternateName 这条身份线索。
  // 这是明确的取舍，不是遗漏。
  // 一句话定位。这是整个站最重要的一行字：LLM 靠它判断你是谁。
  // 判据：能不能让一个陌生人在 5 秒内说出「他是做什么的」。
  tagline: 'I check whether numbers deserve trust.',
  location: 'Hong Kong',
  email: 'bernard12138@gmail.com',
  // 各平台 handle 维持现状（Beltran12138 / zkbernard12138），不统一。
  // 后果：机器无法从 handle 本身推断这些账号属于同一个人。
  // 补偿：Base.astro 的 Person schema 用 sameAs 把它们显式绑在一起。
  // 也就是说——这个网站从「锦上添花」变成了身份统一的唯一支点。站不在线，绑定就不存在。
  links: {
    github: 'https://github.com/Beltran12138',
    huggingface: 'https://huggingface.co/Beltran12138',
    x: 'https://x.com/zkbernard12138',
    // bernardzhao 已被占用，退到 bernard-zhao。这是全套账号里唯一人类可读、能和真名对上的入口。
    linkedin: 'https://www.linkedin.com/in/bernard-zhao/',
    // 小红书「伯纳德zkBernard」：1k+ 粉丝、10k+ 赞藏 —— 全部账号里受众最大的一个。
    // 内容是 LLM / 语言几何的中文思辨长文，和这里的定位同源，不是生活号。
    // 注意：小红书对搜索引擎和 LLM 爬虫基本封闭，放进 sameAs 只完成身份绑定，
    // 不会给这个站带来任何 AI 可见性。受众在那边，可检索性在这边。
    xiaohongshu: 'https://www.xiaohongshu.com/user/profile/636f19c2000000001f018e3d',
  },
} as const;

export type Role = {
  org: string;
  orgNote?: string;
  title: string;
  start: string;
  end: string | null; // null = 至今
  location: string;
  bullets: string[];
};

/**
 * 经历。倒序排列。
 * 注意：这里的日期是唯一权威版本 —— 你现有的四版简历日期互相打架，
 * 以后一律以本文件为准，其他副本作废。
 */
export const roles: Role[] = [
  {
    org: 'HighBlock',
    orgNote: 'BitV',
    // title 与公司记录保持一致，不自封 FDE —— 背调会对这一栏。
    title: 'Product & Research',
    start: '2026-01',
    end: null,
    location: 'Hong Kong',
    // 只写「做了什么类型的工作」，与 LinkedIn 2026-10-27 口径一致。
    // 不写产品设计细节、供应商选型、对标对象、内部文档数量。
    bullets: [
      'Product requirements and system specifications for trading and account products.',
      'Market, competitor and regulatory research supporting product scope.',
      'Cross-team work with business, operations and engineering to turn requirements into shipped product.',
      'Internal AI tooling for the product team: agent workflows, knowledge retrieval and reusable SOPs.',
    ],
  },
  {
    org: 'Sinohope Tech',
    orgNote: '1611.HK',
    title: 'Brand & PR Intern',
    start: '2025-11',
    end: '2026-01',
    location: 'Hong Kong',
    bullets: [
      'Produced pitch decks (e.g. "Digital Asset Family Trust") and product brochures targeting TradFi and family-office clients; compiled and wrote the corporate monthly newsletter.',
      'Coordinated logistics and materials for the HK FinTech Week product launch and side events.',
      'Managed official X and LinkedIn; researched content strategies of leading finance / Web3 institutions to inform brand positioning.',
      'Established an AI video production SOP (Coze / Gemini / CapCut / Google Flow) used for the annual report, conference sponsorship, and corporate profile videos.',
    ],
  },
  {
    org: 'KuCoin',
    orgNote: 'CMC CEX rank 8',
    title: 'Livestreaming Operations Intern',
    start: '2025-07',
    end: '2025-09',
    location: 'Remote',
    bullets: [
      'Contacted 150+ crypto KOLs/traders daily; converted 35+ AMA guests and onboarded 25+ recurring streamers; optimized outreach scripts against weekly conversion data.',
      'Wrote bilingual streamer-program announcements, built registration pages, and produced OBS multi-platform streaming guides (YouTube / X / Twitch).',
      'Ran 2 Gleam campaigns attracting 400+ KOL applications; founded and operated the official KuCoin Futures streamer Telegram channel (300+ members).',
    ],
  },
  {
    org: 'LBank',
    orgNote: 'CMC CEX rank 17',
    title: 'Marketing — Brand Group Intern',
    start: '2025-01',
    end: '2025-06',
    location: 'Remote',
    bullets: [
      'Designed and analyzed a global user survey (N=1,751) covering demographics, investment size, and trading preferences; identified liquidity and meme-listing as core platform advantages and proposed 5 improvements informing brand positioning.',
      'Tracked PR, social, and community activity of 10 competitor exchanges weekly; produced independent competitive and sentiment reports using Cision One.',
      'Co-planned the Bitcoin Pizza Day campaign and designed 4 crypto-culture gift concepts.',
    ],
  },
  {
    org: 'BingX',
    orgNote: 'CMC CEX rank 13',
    title: 'Event Operations Intern',
    start: '2024-05',
    end: '2024-12',
    location: 'Remote',
    bullets: [
      'Initiated and tracked 30+ exclusive KOL trading competitions (16k–50k USDT prize pools) across India, Pakistan, and Africa — rule negotiation, copywriting, and backend configuration.',
      'Authored regional fundamental research on India/Pakistan and Africa crypto markets, covering regulation, P2P payment rails, and competitor share (Binance, Valr).',
    ],
  },
];

export const education = [
  {
    school: 'The Chinese University of Hong Kong',
    degree: 'BSSc, Journalism and Communication',
    start: '2022-09',
    end: '2026-06',
    location: 'Hong Kong',
    notes: [
      'CUHK Undergraduate Admission Scholarship',
      'Shaw College Scholarship',
      'Clarks Award',
    ],
  },
  {
    school: 'IESEG School of Management',
    degree: 'U-wide Exchange Program',
    start: '2024-08',
    end: '2025-02',
    location: 'Paris & Lille, France',
    notes: [],
  },
];

export type Theme = 'evidence' | 'representation' | 'language' | 'institutions';

/** 首页四个主题。文章（frontmatter 的 theme）和项目都挂在这套主题下。 */
export const themes: { id: Theme; label: string; blurb: string }[] = [
  { id: 'evidence', label: 'Evidence before trust', blurb: 'Trading records, judge scores, pricing engines: telling a real check from a silent no-op.' },
  { id: 'representation', label: 'How models represent the world', blurb: 'Tokens, interfaces and objectives, and what each of them cannot hold.' },
  { id: 'language', label: 'Language and old texts', blurb: 'Classical Chinese, vintage language models, and what a training cutoff really cuts.' },
  { id: 'institutions', label: 'AI, history, institutions', blurb: 'What earlier infrastructure changes say about this one.' },
];

export type Project = { name: string; url: string; theme: Theme | 'tools'; summary: string };

/**
 * 项目。只列公开且能打开的仓库（2026-11-22 逐个核过）。
 * 匿名评审期内的投稿对应仓库不在此列，录用后再加。
 */
export const projects: Project[] = [
  { name: 'evidence-deflator', url: 'https://evidencedeflator.com/', theme: 'evidence', summary: 'Is that trading record skill, or could it be luck? Wallet checks, best-of-N rescoring, and knowledge-cutoff leakage audits.' },
  { name: 'assay', url: 'https://github.com/Beltran12138/assay', theme: 'evidence', summary: 'Check the judge before you trust the score: an evaluation harness for knowledge-answering support agents.' },
  { name: 'ql-invariants', url: 'https://github.com/Beltran12138/ql-invariants', theme: 'evidence', summary: 'Model-free no-arbitrage invariant scans for QuantLib pricing engines.' },
  { name: 'warrant', url: 'https://github.com/Beltran12138/warrant', theme: 'evidence', summary: 'Suitability as an on-chain object, not a prompt: revocable warrants for AI-agent trading.' },
  { name: 'ming-vintage-llm', url: 'https://github.com/Beltran12138/ming-vintage-llm', theme: 'language', summary: 'Same-corpus vintage-LLM experiment in pre-1424 Classical Chinese, with a contamination audit.' },
  { name: 'cbdb-letter-recipient-linker', url: 'https://github.com/Beltran12138/cbdb-letter-recipient-linker', theme: 'language', summary: 'Link CBDB letter titles to recipient person IDs, with pre-registered evaluations.' },
  { name: 'agent-tool-interop', url: 'https://github.com/Beltran12138/agent-tool-interop', theme: 'tools', summary: 'Which coding-agent CLIs expose a tool schema a third-party backend can actually drive.' },
  { name: 'prophetmap', url: 'https://github.com/Beltran12138/prophetmap', theme: 'tools', summary: 'AI industry-chain transmission map for US equities.' },
  { name: 'gpu-fairprice', url: 'https://github.com/Beltran12138/gpu-fairprice', theme: 'tools', summary: 'Machine-level fair value curves for heterogeneous GPU rental listings.' },
  { name: 'Web3Watch-HK', url: 'https://github.com/Beltran12138/Web3Watch-HK', theme: 'tools', summary: "Tracker for Hong Kong's virtual-asset regulatory and market developments." },
];
