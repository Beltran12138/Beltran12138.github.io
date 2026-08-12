// @ts-check
import { defineConfig } from 'astro/config';

// 用 GitHub Pages 的用户站点（仓库名必须叫 Beltran12138.github.io）。
// 选它而不是 Cloudflare，是因为域名里的 beltran12138 本身就把网站和 GitHub 账号
// 硬绑在一起 —— 而各平台 handle 不统一正是这个项目要补的洞。
// TODO: 有 3 篇文章之后再考虑买域名（要买就买 5 年，上次就是忘续期把站丢了）。
export default defineConfig({
  site: 'https://beltran12138.github.io',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
