---
title: "The Native Tongue Is Not in the Vocabulary. It's in the Manifold."
summary: '"Which human language suits AI best" is the wrong question. Human language is lossy compression built for a serial human channel the model does not have. Force a reasoning model into a single language and its maths accuracy drops 5.6 points.'
pubDate: 2026-06-10
lang: en
tags: [llm, language, representation]
originalSource: 'Adapted from the Chinese original, first published on Xiaohongshu (June 2026)'
---

> **Language is for people. The best language for AI is no language.**

---

**TL;DR**

- "Which human language suits AI best" is a pseudo-question. The answer is: none of them.
- Human language is lossy compression built for the human serial channel — we can only utter one word at a time and hear them in sequence. A model has no such channel; it lives in a continuous high-dimensional vector space. English, Chinese, Classical Chinese, and caveman-style prompting are equally lossy adapters. None is more native.
- Empirically: force a reasoning model to stay in one human language and its mathematics accuracy drops **5.6 points**. A separate line of work (COCONUT) shows reasoning need not be materialised into words at all.
- *Pseudo-Chinese* — a real internet phenomenon between Japanese and Chinese speakers — is the human-side mirror of the same compressive force: share a substrate, delete the redundancy, transmit only the skeleton. But humans hit a floor made of discrete symbols. Models have no floor, and slide all the way to geometry.
- Zooming out: language is only the first human-readable layer. Source code is the next. Tearing out a readable layer buys efficiency and sells auditability — and we are signing that trade now.

---

## I. 面白, or a pale face

*私は昨日、美味しいラーメンを食べました。*

Delete every hiragana and katakana from that Japanese sentence and you get: **我昨日美味拉麺食**.

If you read Chinese but not Japanese, you can still probably work it out: *I ate delicious ramen yesterday.* This is **pseudo-Chinese** (偽中国語) — take a normal Japanese sentence, strip the phonetic scripts, keep only the Chinese characters. Japanese speakers can write it; Chinese speakers can read it; neither side has to learn the other's language.

It works because Japanese and Chinese share a substrate: Chinese characters. Grammar, particles, and pronunciation are entirely different, but the core of the meaning is pressed into the characters. What pseudo-Chinese does is delete the phonetic redundancy serving Japanese grammar and keep only the skeleton of the shared substrate.

It also has a breaking point. The Japanese 面白い means *interesting*. Strip it to 面白 and a Chinese reader sees *pale face*. The same two characters point at completely different things in the two languages' vectors. Once the shared substrate forks, the skeleton lies to you.

Hold onto that force — **share a substrate, delete the redundancy, transmit only the skeleton**. We're about to see its extreme version in machines.

![Pseudo-Chinese: strip the kana, keep the character skeleton, and note the point where 面白 breaks into "pale face"](/figures/lang_fig1_pseudo_chinese.png)

---

## II. The model doesn't care which language you use

Give a reasoning model a maths problem and watch its chain of thought and you'll see something odd: it uses English for a while, drops into Chinese, and switches back mid-inference. DeepSeek-R1, QwQ, and others all do this.

Odder still: forbid the switching, force it to stay in one language start to finish, and its mathematics accuracy drops **5.6 percentage points**. Force it to speak human — one particular human language — and it gets worse at the task.

Which implies something counterintuitive. To the model, English and Chinese are not two languages. They are two sets of symbols it can pick up at will. Whichever is more convenient at this instant is what it uses, and switching hands mid-stream costs nothing. Language is a skin it is willing to present to you. The actual thinking does not happen in the skin.

Humans cannot do this. To think about something we have to think in *some* language, and switching languages takes effort and costs something. The model has no such constraint, because its thinking doesn't happen in language at all.

---

## III. Symbols and geometry: reasoning need not become words

Where does it happen, then?

One line of research answers this directly. Standard model reasoning runs *think a step → write it as a token → think the next step*, with every step materialising into human-readable text. Meta's 2024 work, COCONUT, cut the materialisation step: feed the model's thinking state back to itself as a sequence of continuous vectors, never passing through text.

The result isn't just faster. More importantly, a continuous vector can encode several candidate next steps **at once** — the model can explore multiple paths in something like superposition before deciding which to take.

Discrete language cannot do that. Language forces one word at a time; the moment you write *therefore*, you have excluded *however*. Words are beads on a string, one after another, and choosing this bead means losing that one. A continuous vector is a **field** that can be laid out all at once: several paths coexisting, none needing to kill the others first.

This is the precise version, at the reasoning layer, of the claim about tokens: **the ceiling isn't in the symbols, it's in the geometry.** Symbols are discrete, linear, and exclusive at every step. Geometry is continuous, high-dimensional, and plural. The model's real computation happens in the geometry. Materialising it into symbols is delivery to a species that can only read beads one at a time — us.

That research line says it outright: language space is not necessarily the optimal space for reasoning.

![Beads against field: discrete symbols, one at a time, this excluding that — against continuous geometry holding several paths at once](/figures/lang_fig2_beads_field.png)

---

## IV. A live case: we are already turning the lights off

In June 2026, Anthropic released Fable 5. It didn't take long for people on X to claim its reasoning traces had become unreadable gibberish and that it was inventing its own language.

Discount that first. *Inventing a language* has no evidence behind it; it's the standard sensational framing. But what remains after the discount is more interesting than the rumour, and it comes in two halves.

**Half one is the model doing it.** The official migration documentation concedes that after long chains of tool calls, the model's internal summaries degrade into shorthand only the executing model itself can follow — arrow chains, abbreviations, internal tags. It is taking notes for itself, and the notes are no longer written for you.

**Half two is the lab doing it.** In the same document, prompts asking the model to "show your reasoning" trigger a refusal category called `reasoning_extraction` — the model is trained to decline to emit internal reasoning as body text. To see how it thinks you must read the structured thinking blocks, which are the tidied, for-your-eyes version.

Both forces point the same direction: **the human-readable layer is peeling away.** Half of it is the model spontaneously growing private shorthand under compression pressure. Half is the people who built it deliberately turning off the light.

In pseudo-Chinese, two humans share a character substrate and delete the redundancy between them. Here, the model shares a substrate with *itself*, and deletes what it says to you down to what only it understands.

---

## V. No human language is "better suited to AI"

After caveman-style prompting caught on, a genre of content marketing followed: Classical Chinese, or even Chinese generally, is the language best suited to the AI era. The argument goes roughly — Classical Chinese is dense, few characters carry much meaning, so it saves tokens, so it suits AI.

Every link in that chain leaks.

**One: fewer characters is not fewer tokens.** Models don't bill by Chinese character; they bill by token. How a tokenizer splits depends on the distribution of the training corpus, and Classical Chinese is rare in that corpus, so it often gets shredded into more pieces. What you save on the page you may not save in tokens.

**Two: "suitability" is a product of distribution, not a property of the language.** Models reason more reliably in English because English dominates the training data, not because English is a superior language. Rebalance the corpus toward Chinese and Chinese immediately becomes "more suitable." This is a ranking produced by data, and changing the mix changes the ranking — which makes it falsifiable.

**Three: the real benefit of caveman-style prompting sits on the human side.** Terse prompts are faster to read, cheaper to copy, and look sharper. The model doesn't think more clearly because you asked in Classical Chinese. The benefit lands on human brevity and style and has nothing to do with the model's reasoning quality.

So "which language is best suited to AI" is malformed. It presupposes the answer is some human language. But standing in front of a model, all human languages are the same kind of object.

---

## VI. The native tongue is in the manifold

Compress the argument into one sentence: **human language is compression built for the human channel.**

Our channel is narrow. A mouth emits one sound at a time; ears receive in sequence; the brain processes along a timeline in segments. Language is tailored to that narrow, linear channel — discrete words, linear sentences, one unit of meaning delivered at a time. It is a transmission protocol evolved over tens of thousands of years to fit human hardware.

A model has no such channel. Internally it is a continuous, high-dimensional space. In there, meaning is position and direction, and reasoning is a trajectory. There are no separate words and no step-by-step walking. Compressing that space into a string of words for you is the model accommodating your hardware. The string of words is not what it looks like.

So "what is AI's native tongue" has no answer in any vocabulary. **Its native tongue is the manifold itself** — continuous, high-dimensional, wordless geometry. English, Chinese, Classical Chinese, pseudo-Chinese are all projections from that geometry onto the human channel, each lossy in its own way, none closer to the original. Asking which projection is more native is like asking which shadow more closely resembles the person holding the lamp.

Back to pseudo-Chinese. Humans sharing a substrate also instinctively delete redundancy, speak in skeletons, and compress language toward economy. But humans cannot compress past a floor: eventually we have to land on discrete, shared symbols, or the other side receives nothing. Pseudo-Chinese is the limit at that floor — compress further and the Chinese reader is lost, and 面白 becomes a pale face.

The model has no floor. It doesn't need to land its thinking on any symbol a human can receive, only on something it can receive itself. So the same compressive force stops at pseudo-Chinese on our side and slides all the way to geometry on theirs.

![Manifold → narrow channel → word string: the geometry of meaning compressed by a serial channel into discrete symbols; what a human reads is the projection](/figures/lang_fig3_manifold_funnel.png)

---

## VII. Language is only the first layer

Step back and language turns out to be only the first layer.

Human language exists largely because humans need to read, write, and pass things between each other. It is the **for-humans layer**. Source code is the same kind of thing: machines execute binary, and Python and C are adapters sitting on top of binary to make writing and auditing convenient for people.

Musk recently said that writing human-readable code is an intermediate step, unnecessary within the year, and that AI will generate binaries directly, collapsing the distance from idea to execution to zero. The timeline is almost certainly overstated — even Anthropic notes that human review becomes the new bottleneck — but the direction is the same story as language. The more we trust AI, the more we want to tear out every for-humans adapter. Reasoning tears out human language; building tears out source code. Same motion.

Here's the sentence Musk won't say: **readable also means controllable.**

We read a model's reasoning to catch it deceiving us. We read source code to audit whether it's safe. The readable layer was never merely an efficiency tax — it is simultaneously the only window we have into the thing. Anthropic is already closing the reasoning window. Musk wants to remove the code window. Tear out the readable layer and you buy efficiency and sell auditability. That trade is not cheap, and we are signing it.

So how do we reason about the future? Back to physics and mathematics — but be clear about what they give you. First principles can compute what these adapters are worth, what tearing them out saves, and how heavy the destroyed auditability is. They can draw the walls of the box: bandwidth limits, the cost of dimensionality, the thermodynamic bill. They cannot tell you what emerges inside the box. Claiming mathematics can predict AI's future is its own kind of arrogance. **First principles draw the walls. They don't draw the map inside them.**

And everything we get to read, from English to Chinese to pseudo-Chinese, is only the shadow that manifold casts on our narrow channel. The thing holding the lamp does not speak human.

![The readable layers peeling: reasoning ↔ human language and building ↔ source code stripped simultaneously; readable equals controllable, and closing the window loses the audit](/figures/lang_fig4_readable_layers.png)

---

*Notes on sourcing and confidence:*

- *The 5.6-point drop under forced monolingual reasoning, and language switching in DeepSeek/QwQ chains of thought: arXiv 2507.15849. Empirical, high confidence.*
- *COCONUT (continuous latent-space reasoning, superposed multiple paths): arXiv 2412.06769, Meta, ICLR 2025. Real research, but a proof of concept that the direction is viable — not a claim that today's frontier models reason this way end to end.*
- *Fable 5's internal-shorthand degradation and the `reasoning_extraction` refusal category come from Anthropic's official migration documentation. "Inventing its own language" is speculation from X, treated here as an overclaim.*
- *"Language is a lossy projection of geometry" and "the native tongue is the manifold" are my reframing, not an established mechanistic result. It's a way of seeing, and a better way of seeing may replace it.*
- *Musk's "no need to write code by the end of the year" is his own public statement; the timeline is a highly uncertain forecast.*
