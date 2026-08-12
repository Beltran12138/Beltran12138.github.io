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
  tagline: 'Product & research at the intersection of AI agents and crypto markets.',
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
    orgNote: 'BitV — Hong Kong licensed virtual-asset platform',
    // TODO(确认): 对外用的正式 title。你自述职能是 PM + 运营 + 行研 + FDE，
    // 但对外只能写一个。建议 "Product & Research" —— 覆盖面最广且不夸大。
    title: 'Product & Research',
    start: '2026-01',
    end: null,
    location: 'Hong Kong',
    bullets: [
      'Authored the perpetual-futures PRD: three-price system (index / mark / last), tiered margin, funding-rate mechanics, liquidation waterfall, ADL ranking, and the full formula set behind them.',
      'Designed the OTC back-office architecture — RFQ quote engine, order state machine, three-layer risk controls, settlement idempotency, and the FIX / REST / WebSocket API surface.',
      'Ran market research on Hong Kong brokerage business models and licensed virtual-asset service structures to inform product scope.',
      'Built the product team\'s internal AI workflow — tool selection, SOPs, and a working agent stack for research and documentation.',
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

export type Project = {
  name: string;
  url: string;
  group: 'market-intelligence' | 'agent-infra' | 'research' | 'language-llm';
  summary: string;
};

/**
 * 项目。group 决定它在 /projects 页的归类。
 * 分组本身就是叙事 —— 34 个仓库不分组，在外人眼里就是 34 件互不相干的事。
 */
export const projects: Project[] = [
  {
    name: 'perpkit',
    url: 'https://github.com/Beltran12138/perpkit',
    group: 'market-intelligence',
    summary: 'Perpetual-futures toolkit: real-time funding rates and fee comparison across Binance, OKX, and Gate.',
  },
  {
    name: 'prophetmap',
    url: 'https://github.com/Beltran12138/prophetmap',
    group: 'market-intelligence',
    summary: 'A 19-layer physical supply-chain map for US equities, tracing AI demand through to silicon.',
  },
  {
    name: 'funding-scanner-skill',
    url: 'https://github.com/Beltran12138/funding-scanner-skill',
    group: 'market-intelligence',
    summary: 'Funding-rate scanner packaged as an agent skill.',
  },
  {
    name: 'risk-normalize',
    url: 'https://github.com/Beltran12138/risk-normalize',
    group: 'market-intelligence',
    summary: 'Normalizing on-chain risk-API outputs across providers with incompatible schemas.',
  },
  {
    name: 'Web3Watch-HK',
    url: 'https://github.com/Beltran12138/Web3Watch-HK',
    group: 'market-intelligence',
    summary: "Weekly tracker for Hong Kong's virtual-asset regulatory and market developments.",
  },
  {
    name: 'agent-tool-interop',
    url: 'https://github.com/Beltran12138/agent-tool-interop',
    group: 'agent-infra',
    summary: 'Research on tool-use interoperability across coding agents.',
  },
  {
    name: 'wecom-docs-mcp-server',
    url: 'https://github.com/Beltran12138/wecom-docs-mcp-server',
    group: 'agent-infra',
    summary: 'MCP server for WeCom documents and smartsheets — create, read, edit.',
  },
  {
    name: 'HK Crypto Trust Paradox',
    url: 'https://github.com/Beltran12138/-fyp-research-4150',
    group: 'research',
    summary: 'Quantifying the gap between regulatory compliance and perceived trust in Hong Kong crypto — NLP social listening plus an N=287 survey (Δ=2.52, p<.001).',
  },
  {
    name: 'ming-vintage-llm',
    url: 'https://github.com/Beltran12138/ming-vintage-llm',
    group: 'language-llm',
    summary: 'LoRA fine-tune for Classical Chinese. Finding: style transfers, world-model does not.',
  },
  {
    name: 'POLYGLOT-MATRIX',
    url: 'https://github.com/Beltran12138/POLYGLOT-MATRIX',
    group: 'language-llm',
    summary: 'Multilingual vocabulary corpus spanning 9+ languages.',
  },
];

export const groupLabels: Record<Project['group'], string> = {
  'market-intelligence': 'Crypto market intelligence',
  'agent-infra': 'Agent infrastructure',
  research: 'Research',
  'language-llm': 'Language & LLMs',
};
