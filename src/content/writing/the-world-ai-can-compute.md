---
title: "The World AI Can Compute, and the World It Can't Say"
summary: 'AlphaFold won a Nobel Prize without leaving behind a single readable equation. Three hard constraints suggest that for a large class of high-dimensional systems, compressing the law back into symbols a human can hold is not hard — it is unavailable.'
pubDate: 2026-06-15
lang: en
tags: [llm, epistemics]
originalSource: 'Adapted from the Chinese original, first published on Xiaohongshu (June 2026)'
---

> **The law isn't in the equation. It's in the weights.**

---

**TL;DR**

- AlphaFold solved a 50-year-old problem and won a Nobel Prize without leaving behind a single equation you can read. The answer lives in a hundred million weights, not in any closed form.
- Mathematics is the language of physics because physics happens to be low-dimensional. Machine learning became the language of biology because biology is high-dimensional and doesn't compress into symbols. The language you describe a system in has to match its dimensionality.
- Demis Hassabis is betting that explicit laws — "something like Maxwell's equations" — can eventually be extracted from a simulator. So far: zero cases. And he leaves himself a door: *I don't know whether laws of that kind exist for these emergent systems.*
- Three hard constraints — the information-theoretic lower bound, human working-memory bandwidth, and the intrinsic nature of Kolmogorov complexity — together imply that if a system's shortest description is already longer than a human mind can hold, then compressing it back into human-readable symbols isn't difficult. It's unavailable.
- Wittgenstein: *the limits of my language mean the limits of my world.* AI inverts this. It hands us a world we can compute with, act on, and never enter.

---

## A Nobel Prize with no equation

At Sequoia's AI Ascent summit, the host introduced Demis Hassabis as a true believer. Over the next hour the Nobel laureate and DeepMind CEO produced a run of headline-sized claims: AGI by 2030, drug discovery compressed from a decade to days, information as the fundamental substrate of the universe.

The line I want is the least quotable one. He said: just as mathematics is the perfect description language for physics, machine learning will be the perfect description language for biology.

Hold that sentence against his own biggest result and it turns sharp. Hassabis won the 2024 Nobel Prize in Chemistry for AlphaFold, which cracked a problem that had resisted the field for fifty years — what three-dimensional shape a given amino-acid sequence folds into. Now go looking through AlphaFold for anything resembling `F = ma`. There isn't one. It gives you the answer — the shape of a protein — without giving you a law you can read, teach, or push forward with a pencil. That "law" is smeared across a hundred million trained parameters.

This is the first time humanity has placed a law of nature somewhere no human can read it. The only question that matters is whether this was an exception or the opening of a new normal.

![The same law living in two places: F=ma in a readable equation, AlphaFold's law in a hundred million unreadable weights](/figures/pred_fig1_equation_vs_weights.png)

## Machine learning is the language of biology

Take Hassabis's analogy apart, because the first half is right.

Why is mathematics enough for physics? Because physics happens to involve few variables, clean equations, and strong sparse coupling. Three symbols — `F = ma` — hold down an entire region of predictive power. Write a handful of equations and you own everything from a falling apple to planetary orbits.

Biology doesn't work that way. A single cell runs on thousands of weak, noisy, weakly-correlated interactions. Nobody is going to write down the cell's `F = ma`. The signal is spread too thin; a closed form either can't be written or can't be handled by the person who wrote it.

Machine learning catches exactly this kind of object. A neural network is a high-dimensional function approximator whose weights can hold thousands of weak couplings at once — and it doesn't require anyone to state the law first. It absorbs the regularity from data, implicitly. The dimensionality matches, and the closed-form requirement is waived.

Here's the part Hassabis doesn't say. That physics can be squeezed into a handful of symbols is a piece of luck about physics, not a general principle of science. We spent a few hundred years picking low-hanging fruit and mistook "science means finding a compact law" for a promise the universe had made us. It was only ever a privilege of low-dimensional systems.

![Description language must match dimensionality: physics is low-dimensional with few variables and strong coupling (equations suffice); biology is high-dimensional with vast weak correlations (only machine learning holds it)](/figures/pred_fig2_dimension_match.png)

## Where the law lives: equation or weights

Compare how two bodies of knowledge got built.

Tycho Brahe left decades of planetary observations — a mountain of data. Kepler and Newton came along and distilled a few lines of equations out of that mountain. Once you have those lines, you can throw the data away. The equations *are* the knowledge; a pencil holds all of celestial mechanics. Data was scaffolding, the equation was the building.

AlphaFold runs the other direction. You cannot distill a few lines out of those hundred million parameters and then discard the parameters. The parameters *are* the law — the shortest form in which it can be faithfully expressed, with no shorter symbolic version left to extract. The model doesn't point at a law. The model is the law.

That's the part that stings. An equation can be read, taught, and pushed forward into new consequences. Weights can only be run. So "knowing a law" stops meaning "understanding it" and degrades into "owning a machine that can compute it." Knowledge goes from contemplative to operational. You possess it without holding it.

## He needs that equation to exist

Hassabis sees the hole and offers an exit. Since you can sample a simulator without limit, he suggests, perhaps one day you can extract explicit laws from it — *something like Maxwell's equations*.

Discount that exit with a few facts he has no incentive to volunteer.

**First, zero cases so far.** Since AlphaFold, nobody has extracted a clean, human-comprehensible law from a high-dimensional model whose predictive power matches the black box. (As far as I know — counterexamples welcome.)

**Second, he runs Isomorphic Labs.** Every "ten years to days" is also a statement about his own company. As of now Isomorphic has no approved drug and a pipeline largely in preclinical stages *(unverified)*. Predicting structure accurately is a long way from a drug that is actually effective and safe — he concedes it's "only one part."

**Third, 2030 hasn't moved in years.** A date that never updates behaves more like a brand commitment than a forecast. And AGI still has no agreed definition.

**Fourth, the venue.** This was the annual conference of a fund with heavy positions in the sector, structurally optimised to sound good, then transcribed by third parties and syndicated through crypto media with headlines tuned for reach. Two layers of translation sit between him and you — including me.

Discount all that and one contradiction is left, one he doesn't hide: he admits *I don't know whether, for emergent systems like these, such laws exist.*

In other words: he needs extraction to be possible, or AI-for-science produces only black-box predictions and no human-readable science, and half the Nobel-scale narrative collapses. But he won't assert that it is. That gap — betting on something he won't claim — is where the rest of this goes.

## Prediction and understanding, permanently forked

Three hard constraints.

**The information-theoretic lower bound.** Losslessly describing a system takes at least as many bits as its intrinsic information content. You cannot state a signal in less information than the signal contains.

**Human bandwidth.** For a person to *understand* a law, it has to compress into the few symbols working memory can hold at once. This is a biological ceiling and it does not scale with compute.

**Kolmogorov complexity is intrinsic.** The shortest description of a regularity does not change based on who is looking at it. If some biological regularity's minimum description length is genuinely long, no amount of cleverness shortens it. Given that it is long, this is a logical necessity, not a difficulty.

The consensus — Hassabis holds it, and so does the whole "the black box will eventually be readable" camp — runs like this: machine learning is a tool and a transitional stage; AI supplies black-box predictions first, and human understanding catches up afterwards.

Here's what's wrong with it. It takes a piece of luck — that physics compresses into symbols — and treats it as a promise extended to every domain. "Understanding catches up to prediction" did happen once, in physics, from planetary data to Newton's laws. That precedent got generalised into a rule of science. But it was induced from a domain that was symbolically compressible to begin with. In high-dimensional systems the premise simply doesn't hold.

Which gives the contrarian conclusion: **for a large class of high-dimensional systems, compressing the law back into human-readable symbols is not hard. It is unavailable.** We are walking into a permanent fork between prediction and understanding — able to predict a cell, an economy, a climate system with precision, and permanently unable to state a "why" that a human can hold.

One term needs separating out. When I say AI behaves like an oracle — answers without reasons — I don't mean the thing blockchains call an oracle. That one is a relay that carries off-chain truth on-chain; it adjudicates, it never predicts. I mean the Delphic kind: it emits conclusions, never derivations. What we are mass-producing is the second kind.

The sharpest version: **understanding is a luxury of low-dimensional systems.** For a few thousand years humans treated "science means comprehensible law" as an axiom, only because the physics we happened to tackle first was low-dimensional. Once high-dimensional systems arrive, understanding becomes unaffordable and prediction is what we can still buy. On that reading, AI's deepest significance isn't helping us understand the world. It's marking the boundary of human understanding — and telling us that what lies outside is much larger than what lies inside.

![Prediction and understanding fork permanently: in the low-dimensional regime the two curves coincide; entering the high-dimensional regime, predictive power holds while human comprehensibility falls away, and the gap between them is the unsayable "why"](/figures/pred_fig3_fork.png)

## The one respectable objection

The one respectable objection: who said understanding has to fit inside a bare human skull? We saw cells through microscopes and galaxies through telescopes. Why can't we "see" a high-dimensional law through AI? Understanding can be a composite of human and machine.

The crutch doesn't reach. A microscope magnifies data, and what you finally see still lands back in the low-dimensional symbols of a human mind — you see a cell, and "cell" is a word you can hold. But if a law is itself high-dimensional and incompressible, then any "explanation" AI hands you has two possible fates. Either it stays high-dimensional (you haven't understood anything; there's just a different black box in front of you), or it gets compressed to low dimensions (you understand it, and what you understand is a lossy forgery). Instruments help you acquire data. They don't help you hold it. The bottleneck is capacity, not access.

This judgement has a clean falsification line: **the day somebody extracts a law from a high-dimensional model that a human can understand and that predicts as well as the black box, it's void.** I'm betting there won't be one.

## AI's world is no longer mine

Step back one more level.

A century ago Wittgenstein wrote: *the limits of my language mean the limits of my world.* The warmth in that sentence comes from language doing two jobs at once — it is my medium of access to the world, and that world is one I live in and comprehend. Language cuts the world down to my size. What can be said, I understand; what can't, doesn't exist for me. The world is *mine*.

AI inverts it. AI also became a medium of access — and what it accesses is exactly the high-dimensional reality language cannot touch. But the world it reaches is one I can't comprehend. The *mine* falls off. Language shrank the world to what I could understand; AI expands the reachable world past where I can. I go from being a resident of this world to being an operator of a button — I get the output, I don't get inside.

The last line of Wittgenstein's book is: *whereof one cannot speak, thereof one must be silent.* AI has done something he didn't anticipate. It confirmed the sentence and routed around it. The unsayable remains unsayable to humans — but to AI it has become operable. What must stay silent stays silent; the machine has merely learned to work inside the silence.

And the same wall stands twice. We can't read its reasoning, and we can't read the world it reads for us — the same failure to compress high dimensions back into symbols, happening once inside its head and once in the universe it sees.

So this is the same line arriving at its third station: the ceiling isn't in the symbols, it's in the geometry; the native tongue isn't in the vocabulary, it's in the manifold; the law isn't in the equation, it's in the weights. Three sentences about one thing — meaning, capability, and knowledge sliding, one notch at a time, out of the symbols a human can hold and into a high-dimensional space a human cannot enter.

Language made the world mine. AI is giving the world back to itself.

![Language cuts the world to human size (sayable = comprehensible = my world); AI expands reachable reality past that size (reachable, uninhabitable, unsayable)](/figures/pred_fig4_world.png)

---

*Notes on sourcing and confidence:*

- *Hassabis's claims (AGI by 2030, drug discovery from years to days, information as the substrate of the universe, machine learning as the language of biology, extracting explicit equations from a simulator, classical Turing machines being sufficient to simulate protein folding) all come from his Sequoia AI Ascent 2026 interview, reached via third-party transcription and syndication. Two layers of translation sit in between and fidelity on details is uncertain — quotations here are paraphrase, not verbatim.*
- *AlphaFold won the 2024 Nobel Prize in Chemistry. Verified, high confidence.*
- *"Isomorphic Labs has no approved drug and a largely preclinical pipeline": my understanding, **unverified** — not a pipeline status I checked directly.*
- *The information-theoretic lower bound and the intrinsic nature of Kolmogorov complexity are settled mathematics (high confidence). Applying them to "biological laws are not symbolically compressible" is my inference, not a proven theorem — a high-stakes, **medium-confidence** judgement, and a falsifiable one.*
- *"Zero cases of extracting an explicit law from a simulator": as far as I know, no successful case exists. My inference; counterexamples welcome and would move me.*
- *Wittgenstein, Tractatus 5.6 and Proposition 7, are quoted as written (high confidence). Connecting them to AI is my reading, not his intent.*
