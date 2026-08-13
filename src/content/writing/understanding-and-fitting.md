---
title: 'Understanding and Fitting Share the Same Gradient'
summary: 'Cross-entropy is the only judge in LLM training, and it cannot tell a model that understands from one that merely fits — both produce the same token and the same gradient. Which means understanding is never selected for. It only ever sneaks in disguised as compression.'
pubDate: 2026-07-08
lang: en
tags: [llm, epistemics]
originalSource: 'Adapted from the Chinese original, first published on Xiaohongshu (July 2026)'
---

> **The reward only goes as far as correct.**

---

Deal with an LLM long enough and you eventually hit the question: does it actually *understand* what it's saying? What makes it hard isn't a shortage of evidence. The opposite — it looks like it understands so often that you have to take the possibility seriously. And it also collapses in exactly the situations where understanding would have mattered. You end up stuck between two intuitions, unwilling to give up either.

This piece does one thing: start from the only judge in LLM training — cross-entropy — and show why *understanding* and *fitting* are indistinguishable at the source. If that indistinguishability holds, it unsettles more than our read on AI. It unsettles our confidence about the things we think we've understood.

---

## I. The moment that most resembles understanding

You invent a task it cannot possibly have seen. Three examples — *fire → hot, ice → cold, tall →* — and it produces *short*. You give it two nastier ones under an encoding rule you made up, and it follows those too. No retraining, no parameter updated, and it has picked the rule up inside the few lines you typed.

The subjective sensation is powerful: *it gets me.* It caught the rule I never stated. Of all the moments that make this thing feel like it understands, this class — in-context learning — is the most vivid.

It is also the most misleading. Hold that moment; we come back to take it apart.

---

## II. The only judge is blind

Training an LLM ultimately does one thing: show it half a sentence, have it guess the next token, and when it guesses wrong, nudge the parameters so it's more likely to be right next time. The whole process has exactly one judge, a number called **cross-entropy**, measuring how far the model's emitted probability distribution sits from the true next token. That's all.

Now imagine two machines.

The first has genuinely built an internal representation of the world. It produces "the capital of France" after "Paris" because it holds a structure woven from geography, politics, and language, and *capital* is derived from that structure.

The second understands nothing. It has counted, across an enormous corpus, what tends to follow "Paris," and fills in the highest-probability continuation.

Two machines. Same token out.

So they receive **identical cross-entropy**, and **identical gradients** flow back. To the only judge in the system, there is not one signal separating *genuinely understood* from *happened to fit*. Not because the judge is insufficiently sensitive — because under its metric the two are literally the same point.

![Two machines, one gradient: the understanding machine and the fitting machine emit the same output, and cross-entropy returns the same gradient to both](/figures/fig_b_same_gradient.png)

This is the root of the whole thing. We keep treating *does the AI understand* as a detectable fact, like a blood test — draw a sample, run the assay, get an answer. But the objective function that trains it has, from beginning to end, **no dimension measuring that at all**. It asks one question: was the next token right? Right earns reward, wrong earns penalty. Understanding, fitting, or rote memorisation — it doesn't look, and it *can't* look, because the ruler in its hand measures whether the output was correct, not what mechanism produced it.

**The reward only goes as far as correct.**

---

## III. So understanding is never selected. It only gets assembled by accident.

Note carefully: this isn't the claim that understanding can never grow inside a model. It's the claim that understanding is **never specifically sought**. If some internal structure that genuinely models the world happens to be the way to produce the same set of correct answers with fewer parameters and less effort, gradient descent will keep it — but it keeps it for being **cheap**, not for being **understanding**. Understanding has no residency permit here. It gets in wearing compression's papers.

And cheap work usually doesn't go to understanding.

Mechanistic interpretability researchers have found a tiny circuit inside models called an **induction head**. What it does is crude: *last time `A` was followed by `B`; here's `A` again, so emit `B`.* Pure shifted copying from the context you supplied.

The important part is that this copying circuit appears **very early** in training, crystallising suddenly inside a narrow window. The reason isn't hard to guess: it's the cheapest available route to pushing error down. The easy portion of the loss gets eaten first by shortcuts like this, and what's left for understanding-shaped mechanisms was never much to begin with.

Gradient descent is lazy. It takes the cheap road first. And copying is always cheaper than understanding.

---

## IV. Grokking: understanding happens after the reward goes out

There *are* moments when understanding crystallises. What matters is **when**.

Researchers run small models on a toy task — modular arithmetic, say the remainder of (a+b) divided by some number. Initially the model memorises: it stores the problems and answers it has seen and falls apart on new ones. But keep training, far past the point where you'd sensibly have stopped, and at some moment it clicks — jumping from rote memory to actually holding the arithmetic rule, answering unseen problems correctly. That late-arriving comprehension is **grokking**.

Look carefully at the ordering. The model **first** takes nearly all the available reward through memorisation. Training error has **already** flattened against the floor. And only *after* that, under continued pressure in a regime where there are almost no points left to earn, does genuine generalisation grow in the dark.

![Grokking phase plot: training accuracy saturates early; test accuracy only jumps after entering the reward-extinguished region](/figures/fig_a_grokking.png)

Now the caveat, stated plainly: grokking has been observed on toy tasks like modular arithmetic, using deliberate overtraining plus regularisation. Extrapolating it to frontier pretraining — trillions of tokens, barely more than one pass before the data changes — is a real leap, and I can't guarantee it clears. So read the next line as a **conjecture I believe holds but cannot prove**, not a law:

**Understanding is what happens after the reward goes out.**

And frontier pretraining almost never turns the lights off. There is always another unseen passage to predict, the error can always come down a little further, and the reward signal never genuinely stops. The model stays permanently in the lit region where memorisation and fitting still score — and is therefore never forced into the one darkness in which understanding has actually been observed to emerge.

---

## V. "But doesn't understanding emerge with scale?"

The easiest objection: haven't we watched new capabilities appear as models get bigger?

Two answers.

**First**, a substantial share of those "emergences" are **artefacts of measurement**. Measure the same capability curve with a smoother metric and the discontinuity flattens into a gradient. The surprise was produced by the choice of plot.

**Second**, and more importantly: **even if the capability really did jump, a more refined fit is itself a capability jump.** What scale reliably buys is bigger, finer, broader-coverage shortcuts. It occasionally throws in understanding as a bonus, but that's a by-product of fitting, not the target of training. Capability rising and understanding growing internally are two things that have to be booked separately.

This is refutable, and the condition is specific: **the day someone can point, in a real pretraining setting — not deliberate overtraining à la grokking — to an understanding-shaped mechanism that was selected because it *is* understanding rather than because it happened to be cheapest, this piece's spine breaks.**

Until then I put the burden of proof on the emergence side: anyone claiming understanding emerges has to identify the step at which the objective function paid a single cent for *understanding itself*.

---

## VI. The more it feels like it gets you, the more that indicates fitting

Back to that moment in section I.

In-context learning — the capability that most resembles understanding — is precisely the one we can trace most cleanly to copying circuits. The few examples you put in the prompt are, mechanically, laying down *what-follows-what* anchors for induction-type circuits, after which the model performs a high-dimensional nearest-neighbour match against your question and copies. It did not learn your rule. It retrieved and copied inside the context you supplied.

Which yields a counterintuitive conclusion: **"it feels like it understands me" and "mechanistically it is hollow" are positively correlated.**

That reflexive *it clearly gets me* is not weak evidence of understanding. It is strong evidence that **this particular fit is running unusually smoothly**. The moments that move you most are the moments the mechanism is emptiest — because smoothness is what fitting is good at, not a signature of understanding.

---

## VII. Where does our own understanding come from?

I've argued elsewhere that prediction and understanding fork — a high-dimensional system can be predicted with precision and never compressed back into a law a human can read. That argument was geometric: they're two different objects in representation space.

This piece supplies the deeper question: **why did they diverge at the starting line?** Because the objective handing out the rewards only ever recognised the prediction branch and never once looked at the understanding branch. The fork isn't a later deviation. Understanding was never issued a ticket.

And now the knife turns around. What follows is an **analogy, not a proof** — weigh it accordingly.

How are humans trained? Answer correctly, receive reward. Exams give marks, recognition gives warmth, KPIs give money, and nearly all of it settles at *was the answer you submitted correct*. If that's true, then most of what most of us call understanding may also be a fit that ran smoothly — stopping right there once the available rewards had been paid out, and never growing further.

Anyone who has genuinely understood something probably knows the feeling: it's the thing you were **still** turning over after the marks were handed out, after nobody was watching, when there was not one more point to be earned. Understanding isn't in the moment of getting it right. It's in the stretch after the reward has dispersed and you haven't stood up to leave.

On that, machines and people are stuck at the same threshold. The difference is that we occasionally walk into the darkness on purpose, and it — held by a reward that never goes out — stays under the lamp.

---

## VIII.

So the next time it *instantly gets you*, enjoy the smoothness. Just don't read it as evidence of understanding. It more likely means the fit is having a good day.

To the only judge in the system, an LLM's understanding and its fitting have always shared one gradient. **The reward only goes as far as correct.** And understanding — if it happens at all — happens after the reward goes out.

---

*Notes on sourcing and confidence:*

- *Cross-entropy as the sole training objective, and two mechanisms producing identical outputs therefore receiving identical gradients, is definitional (high confidence).*
- *Induction heads and their early, abrupt formation come from the mechanistic-interpretability literature (high confidence).*
- *Grokking is observed on toy tasks with deliberate overtraining and regularisation (high confidence for what was observed). Extrapolating "understanding happens after the reward goes out" to frontier pretraining is my conjecture, explicitly not proven (medium).*
- *That a share of "emergent capabilities" are metric artefacts is an established critique in the literature (high). That all of them are is not claimed here.*
- *The analogy to human reward structures is an analogy, flagged as such in the text, and carries no evidential weight.*
