---
title: 'The Same You, Scored Differently'
summary: 'Changing two backend settings tripled a model''s ARC-AGI-3 score without touching a single weight. Capability is a joint product of the model and the harness — and the machine now reading your résumé prefers sentences it wrote itself, 67 to 82% of the time.'
pubDate: 2026-08-13
lang: en
tags: [llm, evaluation, epistemics]
originalSource: 'Adapted from the Chinese original, first published on Xiaohongshu (August 2026)'
---

> **AI evaluation didn't eliminate bias. It removed the anchor under the word "objective."**

---

You stayed up all night getting your résumé to a state you couldn't fault. What you didn't think through is that the thing reading it isn't a person either.

It's a model much like the one on your own machine. And it prefers sentences it wrote itself — even when the other version is better.

You will never know this happened. You'll get a rejection, or silence. And you certainly won't know that the same you, read by a different machine, might have cleared the bar.

That sounds like mysticism. But there is one place where it can be put on a bench, cleanly enough that there's almost nothing left to argue about.

---

## I. Onto the bench

In late July 2026, OpenAI published a post with a technical title about something uncomfortable.

There's a benchmark called ARC-AGI-3 that drops an AI into small games it has never seen, gives it no rules, and lets it work them out. At release, humans passed nearly all of them and the strongest models collectively scored under 1%. It looked like a wall.

Then OpenAI said: hold on. Same model, two backend settings changed — let it retain its own reasoning between steps instead of clearing it each turn, and compact its context — and the score went from **13.3% to 38.3%**. Three times. Not one bit of the model's weights was touched.

<!-- TODO(figure): ARC-AGI-3 bench — same weights, official harness 13.3% vs two settings enabled 38.3%, human mean 48%; caption: the extra two-thirds is not in the model, it's in the harness -->

Stop on that number.

It is not saying the model got stronger. It's saying something plainer and more troublesome: 13.3 and 38.3 measured **the same model**. The extra factor of three doesn't live in the model. It lives in the apparatus doing the scoring.

That apparatus has a name — the **harness**: the shell between a model and the world, deciding what it sees, what it remembers, what survives each step and what gets thrown away. The official shell discarded the model's reasoning after every step, so it had to re-derive the game from scratch each turn. It wasn't incapable. The shell was forcing amnesia.

Change the shell and it remembers.

Which makes the sentence "this model's capability is X%" **malformed**. Capability isn't a number. It's a number computed jointly by a model and an apparatus. Change the apparatus and the number changes.

And that apparatus is precisely what sits behind the machine reading your résumé. Your score was never only about you.

---

## II. This is not "algorithms have bias"

The natural objection: isn't this just algorithmic bias, which we've been discussing for a decade?

Draw the line here or everything after this is a misunderstanding.

Algorithmic bias is an engineering problem: the training data carries discrimination against some group, the model learns it, and you correct the data or debias the model. It has a source, it can be audited, it can be fixed.

But in that factor of three on ARC, there is no race, no gender, no age. The variable was purely *whether the model gets to remember what it just thought*. You cannot debias something that isn't a bias.

It points at a deeper hole: **the act of evaluation has no apparatus-independent ground truth.** It isn't that this apparatus isn't fair enough. It's that *fairness* requires a ruler outside the apparatus — and once scoring is handed to machines, that ruler is disappearing.

<!-- TODO(figure): boundary comparison — left "algorithmic bias" (source = data, auditable, debiasable, engineering problem) vs right "apparatus dependence" (source = the nature of measurement, ARC has no demographic variable yet 3x, unfixable, epistemological problem) -->

---

## III. When the grader is also AI, a new kind of favouritism grows

Change the apparatus, change the score — that's only the first layer. The genuinely troublesome part is that the apparatus doing the grading is **also AI**.

One study, cleanly designed *(preprint; I mark the foundation soft — see the notes)*: take 2,245 real human-written résumés from **before** AI writing tools were widespread, have various large models rewrite them, then have those models serve as judges in pairwise comparisons. After controlling for content quality, models as judges preferred **their own** rewritten version over the human original **67% to 82%** of the time. Simulating a real hiring pipeline, candidates whose résumés had been polished by the same AI doing the screening had a **23% to 60%** higher shortlisting rate than equally qualified candidates who wrote their own — worst in business roles.

The important part: this is not race or gender bias, and existing anti-discrimination auditing cannot see it at all. It grows endogenously out of the **AI-evaluating-AI interaction**. It has no precedent.

And there's a counterintuitive detail that has to be stated, because it breaks the obvious story: it is **not** simply "each model favours its own brand." In the same study, DeepSeek most strongly protected its own prose style — yet GPT-4o, acting as judge, preferred what DeepSeek had written. The real structure is stranger than same-brand loyalty: **every apparatus has an invisible taste**, that taste decides who gets picked, and you cannot see it, cannot measure it, and were never asked to consent to it.

*(Hold this foundation down: the study's quality control uses text-feature proxies which may be collinear with model prose style, so the residual "self-preference" might still contain unobserved quality differences. Human annotation involved only 18 people. The pipeline was built by the researchers rather than drawn from real hiring data. Treat it as a signal worth watching, not as proof.)*

---

## IV. So who defines "good"?

There are only a handful of models in the world strong enough to serve as judges.

Which means the authority to define **what counts as a good résumé, a good paper, a good answer** is quietly consolidating into those few. Which words, which sentence shapes, which structures get scored as *strong* increasingly depends on what a small number of companies' models happen to prefer.

This isn't one unfair judgement. It's the ruler for judging good and bad ending up in very few hands.

<!-- TODO(figure): joint product — the same résumé (the same "you") sent through evaluators A/B/C producing different shortlist probabilities (23%–60% swing), arrows converging on "few apparatuses = few tastes = consolidation of definitional authority" -->

---

## V. "Fair" loses its anchor

There's a move in Terence Tao's ICM 2026 lecture notes worth borrowing to close this line: many arguments about AI are nominally about facts and underneath are about values.

The ARC-versus-OpenAI disagreement is a live specimen. ARC says: I deliberately use a plain, uniform shell so that models can be compared fairly. OpenAI says: every benchmark measures the joint system of model-plus-apparatus, never an isolated model.

Who's right? **Both**, because they are measuring two different things. ARC measures the floor of bare capability under a constrained apparatus. OpenAI measures the reachable ceiling under an optimised one. The real core of the argument isn't whose number is accurate. It's which of the two a benchmark **should** measure — and that is a value choice, not a factual disagreement. They are pretending to argue about objectivity while actually arguing about what should be called objective.

This is Goodhart's deep water. Once a measure becomes the target, it stops measuring the original thing. When an AI score becomes a synonym for *objective*, we have outsourced the value question of what counts as good to a machine whose taste is invisible. The machine didn't take our judgement away. **We moved the anchor ourselves** — from a human weighing real consequences to a number an apparatus emits.

Move the anchor and *fair* becomes circular: fair is whatever the apparatus says is fair.

And the apparatus belongs to whom?

<!-- TODO(figure): the anchor disappearing — the definitional chain for "fair" detaching from "human judgement of real consequences" (the apparatus-independent anchor) and falling into the self-referential loop "the apparatus says fair, therefore fair," with the loop resolving onto a few company logos -->

---

## VI. This is an interface blind spot

If you've read what I wrote about interface blind spots, this will feel familiar.

**Every evaluation apparatus is an interface.** It anchors a few measurable dimensions — prose style in a résumé, action efficiency in a game — and pushes the unmeasurable ones into the blind spot. ARC's shell pushed *does the model remember* into the blind spot, so intelligent models looked stupid. OpenAI's shell pulled it back out — and certainly pushed something else into a blind spot of its own. Change the interface and the blind spot moves house. It doesn't vanish.

So no apparatus is clean. There is exactly one way out: **do not award any apparatus's score the crown of objective truth.** You cannot escape needing some apparatus to grade you. You can refuse to deify any particular one.

---

## VII. The one respectable objection

The strongest objection: use several machines, have them vote, cross-validate — doesn't that converge on objectivity?

The crutch doesn't reach. Multi-apparatus voting does suppress any single machine's taste — in the study above, two simple countermeasures (instructing judges to attend to content rather than provenance, and mixing in votes from smaller models) reduced self-preference by a relative **17% to 63%**. But what it suppresses is the **independently random** portion of the bias. It cannot suppress the **shared** portion.

If every mainstream model prefers a particular kind of prose — and their training corpora overlap heavily — then voting only makes that shared taste more stable and more law-like. You think you're converging on objectivity. You're stamping a majority preference.

This judgement has a clean falsification line: **the day someone produces a genuinely apparatus-independent evaluation — swap in any reasonable scoring machine and the relative ranking of the same set of objects does not change — this piece is void.** I'm betting there won't be one. As long as scoring requires a model with internal representations, it arrives carrying its taste, and taste cannot be neutral.

---

## VIII. Every score you've been given

Step back to yourself.

More and more of what you submit passes a machine's scoring first, and only then reaches a person — if it reaches one. Résumés, loans, the content you write, that "match" number in some app. You can't see how it was computed and there is nowhere to appeal.

Not one of those scores is only about you. **Every one is a composite of you and some machine.** The same you, on a different machine, is worth a different number.

You cannot escape being scored. You can hold one line: **do not treat any machine's score as the truth about you.** It measures a composite. You cannot subtract its taste and recover a clean version of yourself.

This is the same thing again, one notch further along. Meaning slid from symbols a human can hold into geometry a human cannot enter. Knowledge slid from readable equations into weights that can only be run. Now it's **value** — who decides what you're worth — sliding out of human judgement and into a machine you cannot get inside.

The next time an algorithm gives you a number, stop for a second and ask: is this measuring me, or the machine's taste?

AI evaluation didn't eliminate bias. It removed the anchor under the word "objective."

---

*Notes on sourcing and confidence:*

- *ARC-AGI-3 at 13.3% → 38.3%, human mean 48%, the two settings (retained reasoning plus context compaction), and roughly 6× reduction in output tokens come from OpenAI's blog post (late July 2026). OpenAI's site returned 403 to fetch attempts, so this is not read first-hand; the figures are cross-checked across several secondary sources that agree. **Medium-high confidence.***
- *The AI hiring self-preference data: Xu, Li & Jiang, "AI Self-preferencing in Algorithmic Hiring: Empirical Evidence and Insights," arXiv:2509.00462v3, under review at M&SOM. 67–82% is the self-preference range after quality control (equal-opportunity, conditional logistic regression); 23–60% is the shortlisting advantage in a 24-occupation pipeline simulation; 17–63% is the relative reduction from the two countermeasures; the DeepSeek/GPT-4o cross-preference is the paper's own LLM-vs-LLM heterogeneity finding. Limitations: quality proxies are text features (LIWC / BERTScore / ROUGE-L) that may be collinear with model prose style; human annotation used 18 people; the pipeline is researcher-constructed, not real hiring data. **A signal, not proof.***
- *Framing evaluation disputes as value disputes, and the Goodhart point, borrow a frame from Terence Tao's "Mathematics in the age of AI" (ICM 2026). My application, not his words.*
- *The interface blind spot connects to my earlier piece on the same subject. The "meaning → capability → knowledge → value" progression is shared with the language and geometry series, but this is a sister line rather than the next instalment — the mechanisms are not isomorphic (that series concerns high-dimensional incompressibility; this concerns apparatus dependence in evaluation), and they should not be forced together.*
- *The core claim — that evaluation is a joint product of object and apparatus, and that apparatus concentration removes the apparatus-independent anchor under "objective" — is my judgement and is falsifiable. The falsification line is in §VII.*
