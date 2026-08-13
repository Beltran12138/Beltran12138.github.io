---
title: 'The Door Nobody Knew Was Open'
summary: 'Two uncoordinated engineering decisions accidentally gave GPT-4 a shortcut for reading meaning out of Chinese character shapes. Fixing the tokenizer closed it. The same mechanism is retiring SWIFT MT — and it is how infrastructure quietly deletes capabilities nobody knew they had.'
pubDate: 2026-05-14
lang: en
tags: [llm, tokenization, infrastructure]
originalSource: 'Adapted from the Chinese original, first published on Xiaohongshu (May 2026)'
---

> **Some capabilities are designed. Others just happened not to get deleted.**

---

"Chinese has gained a structural advantage in the AI era" has been one of the most comfortable narratives on the Chinese internet these past months. Classical Chinese costs fewer tokens than English. DeepSeek and Qwen encode Chinese more efficiently than GPT does. When prices went up, Chinese users barely felt it. It all looked like some kind of homecoming for the character.

The narrative is wrong.

This isn't a Chinese victory. It's engineers closing a door they never knew was open.

The door is hard to name. David Haslett gave it its cleanest shape in a 2025 paper in *Computational Linguistics*. In the 1990s the Unicode Consortium assigned UTF-8 encodings to Chinese characters organised by radical — the semantic component of the character — because that made them easier for humans to look up. In the 2010s, BPE tokenizers split each Chinese character into three bytes, because Chinese was too infrequent in English-dominated corpora to earn its own vocabulary entries. Two engineering decisions, made two decades apart, by people who never coordinated.

Stacked on top of each other, they meant that characters sharing a radical shared a token prefix.

GPT-4-era models saw those prefix patterns over and over across training, and indirectly learned something Chinese schoolchildren learn explicitly: you can infer a character's semantic category from its radical. 火 (fire) appears in 焱, 炎, 灼. The byte prefix carried that.

Nobody designed this channel. Nobody ever claimed credit for it.

Then the GPT-4o generation "fixed" Chinese tokenization. Common characters got their own vocabulary entries — one character, one token. Bills went down, context windows went up. At that same moment, across three experiments Haslett ran, the models' accuracy at recognising shared radicals went down.

The point here isn't Chinese. It's the general mechanism it exposes:

> **Every time large infrastructure deliberately optimises a measurable metric, it simultaneously closes off a class of capability nobody knew they had.** That capability cannot be proven to exist beforehand and cannot be compensated for afterwards. Its entire life cycle consists of *happening not to get deleted yet*.

This is happening well outside AI. SWIFT's MT message standard — a financial grammar shaped by English and Latin characters — was retired on 22 November 2025 after 52 years. China's CIPS is to SWIFT roughly what Lin Yutang's typewriter was to Remington. Both migrations run on the same mechanism.

![Chinese-to-English token ratio across five tokenizers](/figures/closed-door_fig1_cn_en_token_ratio.png)

---

## I. The door nobody knew existed

Haslett's experimental design is almost offensively simple.

Three tasks, run across GPT-4, GPT-4o, and Llama 3:

1. Ask the model directly whether 茶 and 茎 share a semantic radical.
2. Ask it to rate the semantic similarity of two characters.
3. Give it four characters and ask which one doesn't belong.

Behind each task sits the same 2×2: do the two characters actually share a radical, and do they share a first token under the tokenizer. That design lets you measure the radical effect and the token-sharing effect separately.

If models understood Chinese characters purely by looking up a vector by token ID, then whether 茶 and 茎 share a radical should be *independent* of how the tokenizer chops them. One character, one ID, semantics learned from training.

The data says otherwise.

Under GPT-4's older tokenizer, **89% of Chinese characters were split into multiple tokens**, and the byte sequences preserved the UTF-8 radical prefix. That generation of models recognises shared radicals at significantly higher accuracy. Under GPT-4o's newer tokenizer, only **57%** remain multi-token; most are packed into single IDs. Accuracy drops.

What dropped isn't "can it handle Chinese." It's "can it read a semantic category directly off the shape of the character." A model can of course learn indirectly, from training data, that 焱, 炎, and 灼 show up in similar contexts. But that route is long. The byte-level prefix offered a nearly free shortcut — one that appears in no engineer's design document.

Haslett hedges carefully: the finding is limited to fine-grained semantic tasks tied to character form, and does not amount to "GPT-4o is worse at Chinese." Architecture, training data, and parameter count all changed too; attributing an accuracy shift solely to tokenization granularity would be over-attribution.

That's honest research. But the effect is real and directionally consistent — three experiments, three models, multiple 2×2 splits, all showing the same sign: **coarser tokens, worse radical recognition.**

And by design, this channel *should not have existed*. The Unicode Consortium wasn't designing for LLMs. BPE wasn't designed for radical recognition. GPT-2's engineers weren't thinking about Chinese character morphology. Its birth was pure side effect. Its disappearance will be too.

---

## II. Not just Chinese

There's a section of Haslett's paper that Chinese media coverage skipped almost entirely.

In the same framework, she ran a control across **12 European languages**. Not radicals this time — suffixes.

English *-ation, -ity, -ness*. German *-keit, -ung*. Italian *-zione*. These suffixes carry part-of-speech and semantic-category information. When a tokenizer splits the suffix and stem into different tokens, accuracy at recognising nominalisation, verbalisation, and adjectival category drops. When the split aligns with the morphological boundary, accuracy recovers.

Twelve languages. Same conclusion.

Her one-word summary: **pervasive**.

The follow-up with Cai, in *TACL* 2025, extends this to 41 languages across three generations of GPT tokenizers. Same finding: tokens capture morphological information even when they look nothing like morphemes, and misalignment between tokenizer and linguistic morphology systematically damages the model's semantic representations.

Chinese is the cleanest sample not because Chinese is special, but because the radical structure is the most *visible*. Three bytes per character, radical information in the high bits of the first byte, byte pattern mapping one-to-one onto semantic category. Any researcher can see immediately where the misalignment is.

European morphological misalignment hides deeper. It's still there, and the effect is just as significant.

That pushes the claim past "Chinese got a raw deal" to somewhere more uncomfortable: **every natural language on earth is either aligned or misaligned with its own morphology at the tokenizer layer** — and the industry's direction of travel is toward longer, cleaner, higher-coverage tokens. Which means misalignment is almost certain to increase.

Every language is being sanded down with the same sandpaper. The moment it's smooth, the things that needed a rough surface to sit on fall off.

![Accuracy across Haslett's three experiments, by tokenizer granularity](/figures/closed-door_fig2_multitoken_fraction.png)

---

## III. Lin Yutang got there first

Embedding Chinese into infrastructure designed for Western languages started in 1899.

That year, the American missionary Devello Sheffield built the first Chinese typewriter in Tongzhou. It was essentially thousands of pieces of type arranged on a rotating tray, with the operator selecting characters one at a time by lever. A dozen characters a minute. Training a competent operator took years. It was the only viable solution of its time, and everyone knew it was a failure.

In 1947, Lin Yutang redefined the problem in New York.

He decomposed characters by shape and built the Mingkwai — "clear and fast" — typewriter with just **72 keys**. Three banks: upper keys selected the top component of a character root, lower keys the bottom, and number keys picked the final character from a small window he called the "magic eye." Forty to fifty characters a minute, supporting over 8,000 characters. After trying it, the linguist Yuen Ren Chao said: *this is the typewriter we need.*

Lin spent $120,000 on it — his entire savings.

On the day of the demonstration to Remington executives, the machine jammed. Investors walked. In 1948 Lin sold the prototype and commercial rights to Mergenthaler Linotype, which then declined to mass-produce it. The prototype went home to Long Island with an employee during a 1950s office move. In **January 2025**, that employee's grandson-in-law posted a few photographs to a Facebook group for typewriter enthusiasts. The Stanford historian Thomas Mullaney recognised it instantly: the only prototype of the Mingkwai, missing for nearly eighty years.

Commercially, the Mingkwai failed.

But in *The Chinese Typewriter*, Mullaney makes a judgement: **as a human-computer interaction paradigm, it won.** Lin was the first to turn Chinese typing from *picking characters one at a time* into *retrieve, then select*. Three key banks locate the root → a candidate set appears → a number key confirms. Every modern Chinese input method — Chu Bong-Foo's Cangjie in 1976, Wang Yongmin's Wubi, Sogou Pinyin — descends from that paradigm.

The structural overlap with BPE is almost unsettling.

BPE also *decomposes* characters — by UTF-8 bytes. Building a tokenizer vocabulary is also a repeated *retrieve and merge*. DeepSeek and Qwen designing whole-character, whole-word Chinese vocabularies from the start is, at bottom, one more attempt to **rewrite the input layer for Chinese**.

Lin Yutang was to Remington what DeepSeek is to OpenAI and Anthropic: the same struggle to plug Chinese into infrastructure built for a different script.

And the same hidden cost. Every time you rewrite an input layer, you are choosing what to keep and what to erase. Lin kept root decomposition and lost stroke order. DeepSeek kept token economy and lost Haslett's byte-level semantic channel.

There's a sharper way to put it. The Mingkwai's "magic eye" made the user pick from candidates by hand — what we now call the candidate box in an input method. Its real function was to **make ambiguity explicit and let a human resolve it**. Whole-character BPE tokenizers run the opposite direction: **fold the ambiguity into a single ID and let the model resolve it in the dark**.

Which is better is genuinely open. But one thing is certain: the information folded into that ID is no longer something an engineer can directly observe, debug, preserve, or deliberately discard. It exists only where the training data happens to cover it.

---

## IV. The same shape in financial plumbing

Move from AI to finance and an almost isomorphic story is playing out right now.

SWIFT defined its MT message standard in 1973 — a financial grammar shaped by English and Latin characters. Thirty-five characters per line, a strictly limited character set, and addresses, names, and payment purposes as *free-text fields*. Meaning you could stuff Chinese, Russian, or Arabic in there, and downstream parsing was a human's problem. MT ran for 52 years.

On **22 November 2025**, SWIFT MT was formally retired for cross-border payments. ISO 20022 became the only standard.

ISO 20022 supports Unicode natively and is, in theory, friendlier to non-Latin scripts. But it introduces a hard new constraint: **structured addresses**. City, country, postcode, and street must go in separate fields. From November 2026, fully unstructured addresses are rejected outright.

This is a textbook case of *optimise the measurable metric, close the unplanned capability*.

Old MT free-text fields were a de facto escape hatch. A payment from Beijing to Kashgar where the beneficiary's name is Uyghur: the operator writes pinyin or a Chinese translation into free text, and the system doesn't complain. A halal-trade transaction between Iran and Malaysia: the guarantee structure gets squeezed into the remittance information field in Arabic, to be read by a human downstream. None of these paths are in SWIFT's design documents. They existed anyway, sedimented over fifty years of global clearing practice.

ISO 20022 closes them. Structured fields do not accommodate *put it in now, sort it out downstream*. If your use case isn't in the schema, your use case does not exist.

The migration's real pace shows the tension. As of September 2025, ISO 20022's share of industry message traffic had only just crossed 60% — a meaningful fraction of the 11,500 institutions on the SWIFT network were still running in contingency mode. SWIFT's own documents concede that residual traffic will need clearing through 2026.

Now look east.

**CIPS** — China's Cross-border Interbank Payment System — processed 8.22 million cross-border settlements in 2024, worth RMB 175.49 trillion (about USD 24.47 trillion): up 24.25% by count and 42.60% by value. By May 2025 it had passed 1,683 participating institutions — 176 direct, 1,514 indirect. Handsome growth numbers.

At the same moment, SWIFT's own RMB tracker showed the renminbi at **3% of global SWIFT payments. The dollar at 48%. The euro at 24%.** CIPS is running fast, on a much narrower track.

The detail that matters more: **CIPS's messaging layer still depends on SWIFT.** CIPS solved clearing, but a large share of cross-border interbank messaging still travels the SWIFT network. Which makes CIPS not a replacement but something closer to a **parasite-host** relationship — exactly like the Mingkwai, whose root-decomposition paradigm survived and propagated into every Chinese input method after Mergenthaler declined to build the machine. CIPS may be the same shape of story: its clearing logic may outlast its network.

mBridge is another data point. The BIS-led CBDC cross-border settlement project was abandoned by the BIS in October 2024 — the proximate cause being Putin publicly labelling it a tool for bypassing SWIFT at a BRICS summit, a political cost the BIS declined to carry. It was handed to the central banks of China, Hong Kong, Thailand, the UAE, and Saudi Arabia, with the PBOC effectively leading. As of end-2025 it had cumulatively processed 4,047 transactions worth USD 55 billion.

Small numbers. But the governance rewrite is structural: a cross-border settlement pipe that **never touches the SWIFT message layer** is now running independently. Same as the Mingkwai — the product may not win, but the paradigm it demonstrates gets copied.

Put SWIFT MT → ISO 20022 next to BPE → whole-character tokenizer and you see one mechanism. The loose fields of old infrastructure carried capabilities nobody designed. New infrastructure, optimising for structure, measurability, and auditability, closes them at the same time.

![Dual-axis timeline: evolution of the AI input layer against the financial message layer](/figures/closed-door_fig3_three_lane_timeline.png)

---

## V. Falsification

The claim — *large infrastructure closes unplanned capabilities whenever it optimises a measurable metric* — is directional. To be worth believing, it has to be refutable.

Three explicit signals. Any one of them running the other way and I revise.

**Signal 1 — replicating Haslett on byte-level LLMs.**
Meta's Byte Latent Transformer (December 2024) already matches Llama 3 at 8B parameters with 50% fewer inference FLOPs. HKU's EvaByte, trained on 1.5T bytes, catches tokenizer-based models at 5× the data efficiency. Byte-level architectures went from research to commercially viable across 2025–2026.

The question: **re-run Haslett's three experiments on BLT or EvaByte. Does radical recognition recover?**

If it recovers to something near GPT-4-era levels, the byte-level semantic channel is real and restorable, and my thesis strengthens. If it doesn't, the "accidental channel" may be an artifact specific to GPT-4's training data rather than a structural product of BPE byte fragmentation, and my thesis weakens. This is a prediction with a timetable: somebody probably runs this in 2026–2027.

**Signal 2 — non-Western financial behaviour after the ISO 20022 cutover.**
Three observable variables in the 12–24 months after 22 November 2025:
(a) share of cross-border messaging carrying non-Latin characters — up, down, or flat?
(b) structured-address rejection rates — significantly higher in emerging markets than developed ones?
(c) CIPS volume and RMB share of SWIFT — any inflection?

If (a) falls, (b) skews to emerging markets, and (c) accelerates, then MT's loose fields really were carrying non-Western financial behaviour, and the thesis strengthens. If all three stay flat, there was no accidental channel — the behaviour was already running inside the English-language financial system and the migration changed nothing. The financial half of my thesis collapses.

**Signal 3 — can retraining restore the lost capability?**
If someone shows that retraining a byte-aware embedding layer on GPT-4o's tokenizer, or fine-tuning an adapter specialised for character-form structure, restores radical recognition to GPT-4-era levels — then erasure is compensable, and this is a training-data and architecture problem, not a structural loss.

In that case the designed-versus-accidental distinction needs restating: perhaps there are no unpriceable capabilities, only undertrained ones.

Three signals. Any one goes the wrong way and I revise. That's the debt a claim like this has to carry.

---

## VI. Designed capability, accidental capability

Back to the opening.

"Chinese gained a structural advantage in the AI era" is wrong — but wrong in an interesting direction. It mistakes an **accidental** capability for a **structural** one.

That error has a complete isomorph in investing.

Any incumbent asset's moat decomposes into two parts.

**The designed moat** — patents, network effects, economies of scale, brand, switching costs. Built deliberately by engineers and managers. Can be diligenced, can be priced, can be replicated or routed around by a competitor with enough capital and time.

**The accidental moat** — a regulatory arbitrage window, a structural FX distortion, some implicit assumption in an upstream standard, an unstudied dependency in user habit, an unintended path dependency in a supply chain that no competitor has noticed yet. These aren't in the 10-K. Founders themselves sometimes can't articulate them. They cannot be proven to exist beforehand and cannot be compensated for afterwards.

DeFi's 2020–2022 yields were partly accidental — a regulatory gap, the unintended efficiency of on-chain market making, arbitrageurs' cross-chain timing. Once regulation landed and market-making matured, yields normalised.

China's ~80% share of global solar manufacturing is partly designed (industrial policy, subsidies, scale) and partly accidental (the timing of European manufacturing offshoring in 2010–2015, particular local-government tolerance for polysilicon producers, a specific schedule of coal-power price support). Whether the accidental portion survives the next round of global energy-infrastructure optimisation is an open question.

Hong Kong's Type 1/4/9 licensed virtual-asset business is mostly designed — SFC rules, regulatory pathways, compliance cost. But part of it rests on the accidental: a window of SEC inaction, the specific timing of MAS restrictions in Singapore, the precise position of one mainland Chinese red line on crypto assets. None of that is in any white paper.

Every round of infrastructure "optimisation" — AI tokenizers, financial message standards, energy settlement, cross-border regulatory coordination — squeezes the accidental portion into the designed portion. If your asset, your business, or your capability depends on a path dependency **that has never been named**, the next round of optimisation will most likely erase it, and you will not receive an error message.

This isn't a story about AI.

It's the decay mechanism facing any system old enough, complex enough, and layered enough — some of it quantifiable, some unquantifiable, some simply undiscovered.

What makes Haslett's paper remarkable isn't that she found Chinese was damaged. It's that she **gave an invisible phenomenon a visible shape**. She took a semantic channel nobody knew existed and put it inside a peer-reviewed paper.

Mullaney closes *The Chinese Typewriter* with something to the effect that history is not a straight evolutionary track but a fluid, constantly deformed under competing constraints.

In the deforming, **some capabilities are designed, and some merely happened not to get deleted**.

Nobody can currently price the second kind.

---

*Sources:*

- Haslett, D. (2025). *Tokenization Changes Meaning in Large Language Models: Evidence from Chinese.* Computational Linguistics 51(3): 785–814.
- Haslett, D. & Cai, Z. (2025). *How Much Semantic Information is Available in Large Language Model Tokens?* TACL.
- Meta AI (2024-12). *Byte Latent Transformer.*
- HKU NLP Group (2025). *EvaByte: Efficient Byte-level Language Models at Scale.*
- SWIFT (2025). *CBPR+ roadmap beyond November 2025;* ISO 20022 migration status.
- FXC Intelligence (2025-05). *CIPS growth analysis.*
- Central Banking (2024). *BIS to hand over Project mBridge.*
- Mullaney, T. S. (2017). *The Chinese Typewriter: A History.* MIT Press.

*Confidence: the Haslett findings and the SWIFT/ISO 20022 timeline are documented (high). The isomorphism between tokenizer migration and financial-message migration is my framing, not a claim either literature makes — falsification conditions are in §V. The CIPS-as-parasite-host reading is my inference (medium).*
