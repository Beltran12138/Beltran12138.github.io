---
title: 'Token 的真正天花板：不在符号，在几何'
summary: '用信息论、信息几何、表征论三层数学工具给离散 token 与连续 embedding 做结构体检。结论：token 不死，让出 latent 中段。'
pubDate: 2026-05-27
lang: zh
tags: [llm, representation]
originalSource: '原发于小红书 @伯纳德zkBernard'
---
> 信息论、信息几何、表征论的三层判决书

---

## BLUF — 一分钟版

> **核心论点**:Token 不死,让出 latent 中段。
>
> 用三层数学工具(信息论 / 信息几何 / 表征论)给离散 token 与连续 embedding 做结构体检。三层判决独立:
>
> - **信息论** — **平局**。两者继承同一信源损失,Shannon 不允许免费午餐。
> - **信息几何** — **continuous 胜**。Simplex 边界 Fisher 矩阵奇异,Wasserstein-2 空间平滑,这是 ELF/Cola DLM 训练效率优势的数学根源。
> - **表征论** — **场域分裂**。物理世界天然带 SO(3)/Galilean 等 Lie 群结构,连续 embedding 能 honor;语言天然带 free monoid 组合结构,离散 token 直接就是等价类本身。
>
> 合并指向一个具体架构:**IO 边界保留离散 · latent 中段迁连续 · 训练信号扩展非语言通道**。
>
> 「Token 必死」是修辞。「让出 latent 中段」才是数学判决。

---

## 一. 开场:当争论变得可量化

2026 年上半年,两件工程实验把一个长期停留在哲学层面的争论变成了可量化的数字。

何恺明团队的 ELF(Embedded Language Flows)把文字生成的全过程留在连续向量空间里完成,只在最后一步投影回人类可读的文字。32 步采样,生成质量超过离散模型 1024 步的结果,训练数据约 450 亿 token,只有主流方法的十分之一。四天后字节 Seed 团队发布 Cola DLM,用 Text VAE 把语言压到更深层的语义潜空间,再在这个纯语义空间里用 Flow Matching 建模全局先验,最后才解码回文字。两个 paper 在中等规模上展示了同一类反直觉数字——更少的采样步、更少的训练数据、更高的生成质量。

这件事真正有意思的地方,不是哪个范式赢了哪个,而是它把「语言作为有损压缩协议」这个一直停在哲学层的论断,拽到了可量化的工程指标上。一旦争论变得可量化,数学就有发言权。

本文用三层数学工具——信息论、信息几何、表征论——给 token 范式做一次结构体检。这三层各自独立,各自能给一个判决,合起来才是数学界对 token 命运的真实意见。

提前剧透:token 没有信息论上的独立缺陷,但在 latent 中段确实有可量化的几何劣势,IO 边界与语言组合性又给了它不可替代的位置。三层合起来指向的不是死亡,是融合——一个具体的下一代架构形状。

「必死」是修辞,「让出 latent 中段」才是数学判决。

---

## 二. 第一层:信息论——压缩界与训练信号上限

Shannon 1948 年的信源编码定理给了一个硬上限:对任何随机变量 X,无损压缩的平均比特数下限是它的熵 H(X)。有损压缩则受 rate-distortion 函数 R(D) 约束——给定可容忍的失真 D,最小码率为 R(D)。

把这个框架套到大模型训练,信号传递路径如下:

![图 1 信息漏斗:信源界限对两个范式同等约束](/figures/fig1_information_funnel.png)

模型从语料里学到的关于「世界」的信息,上限是 H(world) − H(world | text)。其中 H(world | text) 是文本给定后世界仍然不确定的部分,也就是被人类语言编码过程丢弃掉的世界结构。这部分丢弃在编码端就发生了——疼痛的具身感觉、空间运动的肌肉记忆、因果干预的物理反馈,绝大部分从未被任何人类语言记下。

LeCun 反复说的就是这一层。在信息论层面成立。

但接下来的推论跳步了:「token 是这个有损编码的产物,所以 token 范式触不到丢弃的维度」。问题在于,连续 embedding 同样是这个有损编码的产物。ELF 把文字生成留在 R^d 里完成,Cola DLM 用 Text VAE 压到深层 latent 再做 Flow Matching,二者的训练信号源头依然是人类产出的语料。换信道格式不能恢复信源端就丢失了的信息。Shannon 不允许这种免费午餐。

换句话说,如果信息论是判决依据,那 token 范式与连续 embedding 范式应该一起被判死,而不是后者凯旋。两者要恢复被丢弃维度,都需要把训练信号源头扩展到非语言通道——具身交互、物理仿真、视频里的物体动力学、机器人传感器流。这是 JEPA 路线和 SSI 路线的真正押注点,与「换 token 为 embedding」是两件事。

**第一层判决:token 与连续 embedding 在信息论上平手**。把信源界限误归为信道选择问题,这是个范畴错误。

---

## 三. 第二层:信息几何——优化流形的几何病态

如果信息论判平手,那两个范式真正分胜负的地方在哪里?在优化几何。

Amari 在 1980 年代建立的信息几何告诉你:神经网络的参数空间不是欧几里得空间,而是带 Fisher 信息度量的 Riemann 流形。两个参数点的「距离」应该用它们产生的概率分布的 KL 散度衡量,而不是参数的欧几里得差。这个度量决定了梯度下降的真实几何——自然梯度(natural gradient)用 Fisher 矩阵的逆来矫正方向,在统计意义上是最优更新方向。

把信息几何套到 token 与连续两个范式,核心差别在它们输出分布所活在的流形上:

![图 2 两种输出几何对照:哪里是病态发生的地方](/figures/fig2_simplex_vs_wasserstein.png)

**Token autoregressive 的输出几何**。模型在每个时间步输出一个 categorical 分布 p(x_t | x_<t),取值在 |V| 维概率单纯形(probability simplex)上。这个 simplex 的几何性质很差——边界是退化的(某些坐标为 0),在边界附近 Fisher 矩阵奇异,梯度方向爆炸,优化路径必须避开边界。实际工程里用 label smoothing 强行把分布推离边界、用 temperature scaling 调节锐度,本质都是在规避 simplex 边界的几何病态。

**连续 flow matching 的输出几何**。模型在 R^d 上学一个速度场 v_θ(x, t),把噪声分布通过 ODE 推到目标 embedding 分布。整个优化在 Wasserstein-2 空间——概率测度之间用最优运输距离衡量。这个空间是无边界的,曲率有界,Riemann 度量光滑,自然梯度近似为欧几里得梯度。优化几何是良性的。

这就是 ELF 用 32 步采样超过离散模型 1024 步、训练数据只用十分之一的数学根源。它不是网络架构更聪明,是它在 Wasserstein 空间做优化,几何比单纯形友好。Cola DLM 加了一层 Text VAE 压到更深的语义 latent,本质是把单纯形的离散症状彻底从核心建模过程里抽掉。

但这里有一个被两篇 paper 都回避的细节:不管 latent 里多优雅,最后一步还是要 decode 回 token。这一步是 latent → categorical 的投影,几何病态又回来了。差别只在于发生在哪个环节——token 路径在每个时间步承受 simplex 病态(累积 1024 次),连续路径只在终点承受一次。后者更经济,但没消灭它。

**第二层判决:在 latent 中段,token 输给连续 embedding,优化几何这一项 token 没有翻盘空间**。这是 ELF 与 Cola DLM 真正贡献的工程信号,也是融合架构会发生的物理动机。但 IO 边界处的离散投影绕不开。

---

## 四. 第三层:表征论——等变性与对称结构

第三层判决最微妙,也最容易被「token 必死」叙事忽略掉。

表征论(representation theory)和它在深度学习里的化身——群等变神经网络(group-equivariant neural networks)——回答一个问题:什么数据天然带哪种对称结构,什么模型架构能 honor 这种对称?

形式化一句:如果数据 x 上有群 G 作用,理想模型 φ 应该满足 φ(g · x) = g · φ(x),称为 G-等变。Cohen 与 Welling 在 2016 年用群论重新整理了 CNN——平移等变就是 Z² 群作用、旋转等变扩到 SO(2)、3D 旋转用 SO(3)。

下图给出各类数据天然携带的对称群,以及离散 token 与连续 embedding 分别能否 honor 这些对称:

![图 3 等变性矩阵:哪类数据 honor 哪种对称](/figures/fig3_equivariance_matrix.png)

物理世界这一栏,数学站在连续侧。物理世界天然带 SE(3)(刚体运动)、Galilean(经典时空)、Lorentz(相对论时空)这些 Lie 群结构。一个分子的电势能不依赖你怎么旋转它,一个机器人抓取动作的成功率不依赖你把摄像机往左挪半米。这些都是连续 Lie 群。连续 embedding 空间能直接承载这些群的作用——你可以在 R^d 上设计 SO(3)-等变的层,旋转输入,中间表征同步旋转。JEPA 路线、何恺明早期的 mask autoencoder 体系、所有 3D 视觉与机器人控制的 frontier 工作,都建立在这个数学基础上。Token 序列上没有连续 Lie 群作用,你最多有一个 permutation 群 S_n 的离散作用,捕捉不到 SO(3) 的连续等变。

**这是世界模型路线持续被押注的底层正当性所在,也是为什么具身智能不可能继续用 token-only 架构**。

但同一个表征论也提供反方判决。

语言的结构是 free monoid 上的 compositional structure——单词拼成短语、短语拼成句子,带类型系统(Montague semantics、typed lambda calculus、CCG)。这些是离散对象,带的是离散群结构(syntax tree 上的自由生成元)。强行把它编码到 R^d 连续 embedding 里,你能 approximate 这些结构,但 approximate 不是 exact——同一个 "the cat sat on the mat" 在连续空间里有无穷多个相邻表征,模型要花容量去逼近它们的等价类,而离散 token 直接就是等价类本身。

这是为什么纯连续语言模型在 compositional generalization 任务上反复输给保留离散 token 的混合架构(Lake & Baroni 的 SCAN benchmark 系列、Andreas 与 Klein 在 compositional skills 上的多个对比研究)。语言的 compositional prior 是离散对象本身携带的,扔掉 token 就扔掉了这个 prior,模型得用更多容量与数据重建它。

**第三层判决分裂:物理感知与世界建模 → 连续胜出;语言组合性 → 离散胜出或与连续并立**。这一层判决不能被简化为「连续完胜」。

### 反方:tokenizer-free 与 byte-level 模型如何挑战这一层

诚实地承认:本节论点有一个值得严肃对待的反方——「IO 离散不是 prior,只是历史包袱」。

byte-level Transformer、CANINE、ByT5、近期的 byte-level Mamba 都在尝试绕开传统 tokenizer,直接在字节流上建模。这些工作的潜台词是:语言的 compositional structure 不一定要由 tokenizer 显式喂给模型,模型自己有能力从字节序列里学出来。如果这条路在 frontier 规模成立,本文 §4 关于「离散 token 是不可丢的 prior」的论证就需要重审——拥有的是字节级离散单元,不是 BPE 子词级,但仍然是 IO 离散。

更激进的论点会进一步说:既然字节也是任意约定(UTF-8 是一种编码,不是自然单位),为什么不直接在连续信号上建模?这条路目前只在音频(WaveNet、SoundStream、Encodec)上跑得通,在文字上还没看到 frontier 规模的实例。

本文的立场是:**离散 IO 边界几乎肯定保留,但「离散到什么粒度」是开放问题**。BPE token、字节、字符,都属于「离散」这个范畴。compositional prior 的真正来源是离散对象本身具有的等价类结构,而不是 BPE 这个特定的工程实现。这意味着第三层判决中「语言 → 离散胜」的论点在抽象层面成立,但具体哪种离散表示赢,在未来 24 个月会是工程实验决定的。证伪条件 F2(见 §7)是观察这场实验进展的具体指标。

---

## 五. 三层合并:融合架构的数学必然

把三层判决摊到一张图上,直观看出各层的强度差异:

![图 5 三层判决合并:哪一层是真正的战场](/figures/fig5_three_layer_judgment.png)

| 层 | 数学工具 | token 评分 | continuous 评分 | 判决 |
|---|---|---|---|---|
| 信息论 | Shannon, rate-distortion | 受信源界限约束 | 同等受限 | 平局 |
| 信息几何 | Amari, Fisher metric, Wasserstein | simplex 病态 | Wasserstein 良性 | continuous 胜(latent 中段) |
| 表征论 | Lie group equivariance / free monoid | 物理弱、语言强 | 物理强、语言弱 | 场域分裂 |

合并起来,数学指向的不是「token 必死」,是一个具体的架构形状:

- **IO 边界保留离散 token**:语言组合性的离散 prior 与人类输出格式不可丢(粒度可能从 BPE 退到字节或字符,详见 §4 反方段)
- **Latent 中段迁连续**:Wasserstein 优化几何与物理等变性都在连续侧
- **训练信号扩展到非语言通道**:这是恢复被丢弃维度的唯一路径,与离散/连续选择无关

这三件事各自有独立的数学正当性,不需要哪个范式凯旋叙事来串。流行叙事的真正问题是把第二层(latent 计算的优化几何)的局部判决,放大成了三层的总判决。

下一节把这个架构形状映到时间轴,给一组可证伪的预测。

---

## 六. 演化路径预测

记 t 为相对时间,t=0 = 2026 Q2(当前)。

![图 4 演化路径:token 让出 latent 中段,保留 IO 边界](/figures/fig4_evolution_timeline.png)

**t=0 现状(2026 Q2)**

- 主流产品(GPT-5, Claude 4.6, Gemini 3.1)全栈 token-AR
- 连续 latent 仅出现在多模态 encoder(vision tower)、TTS、扩散图像生成
- 工业 IO 全部为离散 token

**t=1(预计 2026 Q4 – 2027 Q3,12–18 月)**

- 混合架构在文本生成层开始出现 frontier 落地:token IO 保留,核心 generation 在连续 latent 通过 flow matching 或 score-based diffusion 完成
- 触发条件:某 frontier 实验室在 >70B 规模复现 ELF / Cola DLM 的训练效率优势,且推理延迟可接受
- 工业指标:推理 token/s 与训练 FLOP 效率出现 2–3× 阶跃

**t=2(预计 2027 Q4 – 2028 Q4,18–30 月)**

- 多模态在统一连续 latent 里训练,文本/图像/视频/音频共享 Wasserstein 空间
- Google Gemini 类原生多模态架构在这个阶段成为主流,OpenAI 与 Anthropic 跟上或被技术债拖累
- token 退化为输入与输出的转换层,不再参与核心 reasoning
- 工业指标:「多模态能力」不再是产品差异化卖点,变成默认配置

**t=3(预计 2029 之后,推测性极强)**

- 训练信号扩展到非语言通道(具身交互、物理仿真、自演化数据)
- JEPA 路线与 SSI 路线进入工业验证窗口
- 如果 RSI(递归自我改进)在这个阶段被工程实现,AGI 时间表才真正开始倒计时
- 如果未实现,数据墙与算力墙的双重约束会让 frontier 进入饱和期

注意 t=3 之后的判断完全在物理外推的边缘,任何具体数字都不可信,只能给方向。

---

## 七. 证伪表

下面这张仪表盘用来在未来 12–30 个月持续监测本文 prior。任何一项触发,需要回头重新评估论点强度。

![图 6 证伪条件仪表盘:未来 12–30 月监测什么](/figures/fig6_falsification_dashboard.png)

| 编号 | 观察指标 | 触发即修正方向 |
|---|---|---|
| F1 | 任一 frontier 实验室(参数 >200B)发布的连续 latent 模型,在同等算力下 benchmark 全面超 token-AR | 第二层判决加强,加速 t=1 → t=2 |
| F2 | 工业产品出现纯无 tokenizer 的语言 IO 实现 | 第三层判决被推翻一半,语言离散 prior 假设需重审 |
| F3 | 多模态统一连续 latent 模型在 4 个以上模态展现 scaling 法则,且斜率优于 token 范式 | t=2 时间表前移 12 月 |
| F4 | JEPA 路线在两年内未出现 >10B 规模的世界建模 benchmark 突破 | t=3 推迟 |
| F5 | Anthropic 在 2027 年底前发布原生多模态生成能力 | 验证文中关于 Anthropic 技术债的判断 |
| F6 | 出现一个数学证明:simplex 几何病态可通过新的 reparameterization 完全消解 | 第二层判决被推翻,token-AR 在 latent 层重新可竞争 |
| F7 | NVDA、AMD 等算力供应链在两年内出现明显的「连续运算优化」转向(专用 silicon for flow matching / score-based) | 工业承认范式迁移,t=1 → t=2 加速 |

任一年内零触发,本文 prior 保持。两条以上触发,需要重写本节。

---

## 八. 结语:数学给的不是答案,是约束

能不能用数学逻辑演绎 token 的未来?

不能。数学不演绎技术演化的时间表。它给的是结构约束:某些事在某些层不可能,某些事在某些层是局部最优。把这些约束搜集起来,得到的是一张「允许的演化空间」,而不是一个具体的演化轨迹。

「Token 必死」是修辞,不是判决。它在传播层有效,在工程层无关紧要。真正会发生的是 token 让出 latent 中段、保留 IO 边界、训练信号扩展到非语言通道。这三件事在数学上各自独立成立,合起来构成下一代架构的形状。

至于这个形状会不会通向 AGI——信息论说,只要训练信号源头不变,任何范式都通不到。这是世界模型路线与递归自我改进路线共同看到的,也是它们押注的方向其实不是「连续 vs 离散」,而是「主动探索 vs 被动模仿」。这个方向值得另写一篇,本文止于此。
