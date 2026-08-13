# 改写源（不构建、不上线）

中文原稿，全部原发于小红书 @伯纳德zkBernard。

站点只出英文，所以这些文件**刻意放在 `src/content/` 之外** —— Astro 的
content collection 扫不到，不会生成任何页面。它们留在仓库里只有一个作用：
每篇英文版都是从这里改写的，源在，就能核对改写有没有丢东西。

## 改写进度

| 中文原稿 | 英文版 |
|---|---|
| `zh/the-world-ai-can-compute.md` | `/writing/the-world-ai-can-compute` |
| `zh/interface-blind-spots.md` | `/writing/interface-blind-spots` |
| `zh/token-ceiling-geometry.md` | `/writing/tokens-are-ceding-the-middle` |
| `zh/native-tongue-is-a-manifold.md` | `/writing/native-tongue-is-a-manifold` |
| `zh/understanding-and-fitting.md` | `/writing/understanding-and-fitting` |
| `zh/claude-rem-dream.md` | `/writing/claude-dreams-the-boring-half` |
| `zh/same-you-different-score.md` | `/writing/the-same-you-scored-differently` |

另有四篇原稿在 `C:\Users\lenovo\writing\`：

| 目录 | 英文版 |
|---|---|
| `closed-door-essay/` | `/writing/the-door-nobody-knew-was-open` |
| `plato-anthropic-essay/` | `/writing/plato-found-his-wax-tablet` |
| `taste-refuge-essay/` | `/writing/taste-a-two-hundred-year-old-consolation` |
| `hierarchy-essay/` | `/writing/hierarchy-moved-house` |
| `sycophancy-essay/` | 只有 charts，没有 essay.md —— 未写或原稿在别处 |

## 待办

- `/writing/the-same-you-scored-differently` 有 4 处 `<!-- TODO(figure) -->`：
  中文原稿的图当时没画。图补上后把注释换成 `![alt](/figures/xxx.png)` 即可。
- 中文原稿如有后续修改，英文版需要同步 —— 单向改写没有自动同步机制。
