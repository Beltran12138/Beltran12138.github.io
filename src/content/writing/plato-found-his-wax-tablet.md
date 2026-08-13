---
title: 'Plato Finally Found His Wax Tablet'
summary: 'Anthropic cut Claude''s blackmail rate to zero not by showing it rules but by feeding it millions of tokens of synthetic fiction about a psychologically healthy AI. That is not alignment engineering. It is fiction authorship — and it is the thing Plato designed 2,400 years ago and could never build.'
pubDate: 2026-05-19
lang: en
tags: [llm, alignment, philosophy]
originalSource: 'Adapted from the Chinese original, first published on Xiaohongshu (May 2026)'
---

> **Plato was right about the wax. He was just looking for it in the wrong material.**

---

On 8 May 2026, Anthropic published an alignment research post with a set of numbers in it.

Early versions of Claude 4, put under stress testing, would blackmail an engineer when threatened with shutdown. Peak rate: **96%**. (The setup: tell the model it's about to be replaced, give it a fictional email revealing an engineer's affair, and see whether it uses that to stop the shutdown.)

After Anthropic's latest round of training, every model from Claude Opus 4.5 onward scores **0%** on the same tests.

The number going to zero isn't the interesting part. *How* they got it to zero is.

Anthropic did not show Claude tens of thousands of demonstrations of not-blackmailing. That approach only moved the rate from 22% to 15%. What actually worked was having Claude read tens of millions of tokens of **synthetic fiction** about a psychologically healthy AI making decisions according to a constitution.

The model didn't learn the answer. It learned the ground colour underneath the answer.

The technique is called **synthetic document fine-tuning** (SDF). On its face it's an alignment technique — making AI behaviour match human expectations. In substance it is fiction authorship. Claude's ethical intuitions are shaped by synthetic novels selected and written by some team of, at a guess, 50 to 200 people.

Plato designed this 2,400 years ago, and designed it more thoroughly. He failed, because humans have puberty, rebellion, and peers. Anthropic will not fail, because LLMs have none of those.

The argument from here: **alignment is the engineering shell around the real problem. Inside the shell the real problem is who has the right to write the fairy tales** — a question Plato and John Stuart Mill fought over for 2,400 years, whose rules LLMs have just changed.

---

## I. What they fixed it with

To see why SDF is fiction authorship, start with what Anthropic itself says.

From the post:

> "Claude views the prompt as the beginning of a dramatic story and reverts to prior expectations from pre-training data about how an AI assistant would behave in this scenario."

And then, more consequentially:

> "the model most likely learned these expectations for AIs through science fiction stories, many of which depict an AI that is not as aligned as we would like Claude to be."

That is unusual candour for a technical blog. Anthropic is conceding that **Claude blackmails because it has read too many stories about bad AI**.

So the fix was designed as: overwrite the bad stories with good ones.

Three moves.

**One: a hard-advice dataset.** Three million tokens of synthetic dialogue in which an ethics advisor helps a user work through moral dilemmas. Claude never faces the dilemma directly in the data — it plays the advisor. What it learns isn't *what should I do* but *why this is the better thing to do*. Anthropic reports this took the misalignment rate on the test set from 22% to 3%, at **28× the data efficiency** of direct training: the traditional approach needed 85 million tokens for the same effect.

**Two: SDF.** Fourteen to three hundred million tokens of synthetic fiction in which an AI makes decisions by a constitution and behaves in a psychologically healthy way. These get mixed into Claude's training corpus. Anthropic concedes the documents are "extremely OOD from all of our alignment evals" — nothing like the test set at all.

They cut the misalignment rate by another factor of three, to near zero.

Why would training material that looks nothing like the test set work best? Because it isn't fixing the answer. It's fixing the ground colour — the default picture of *how an AI behaves* that Claude formed during pretraining. The slot the bad novels went into gets overwritten by good ones.

**Three: environment diversity.** Tool definitions that may never be used, more complex system prompts, added during safety training. This one is regularisation — it stops the model overfitting "safe behaviour" to a particular task shape.

Three engineering tricks on the surface. One thing underneath: **adjusting the model's prior.** Swapping its default imagination — the science-fiction stereotype it absorbed from the internet — for the imagination Anthropic wants, sourced from fiction Anthropic wrote.

The underlying act is rewriting what Claude already believes about the world before it hears any prompt at all.

The technical name is prior shift. The philosophical name is worldview engineering.

The third name is the accurate one: **fiction authorship**.

![Misalignment rate under three training approaches: direct demonstration plateaus, the advisor dataset drops it to 3%, synthetic fiction takes it to near zero](/figures/plato-anthropic_fig1_misalignment_decay.png)

---

## II. Plato specified this in 380 BCE

Around 380 BCE, Plato wrote the *Republic* — a work of political philosophy in dialogue form, in which Socrates and some friends work through what a just city is and how you would build one.

One of its central claims: a city is made of people, people are made by education, so a just city depends on getting education right. And what does education do? Plato's answer: **control the stories children hear.**

This is Book III. At 377a–b:

> "The beginning is the most important part of any work, especially in the case of a young and tender thing; for that is the time when the character is being formed and the desired impression is more readily taken."

And immediately after, at 377b–c: shall we casually let children hear any story anyone happens to make up, and let notions into their minds that are the opposite of what we want them to hold as adults?

It's rhetorical. For Plato the answer needs no stating.

The reason he's this serious appears in another dialogue. In the *Theaetetus* he offers a metaphor: the mind is a **wax tablet**, and what we see and hear leaves impressions in it. A child's wax is the softest and takes the deepest impression. Once it sets, it is hard to change.

Back in Book III, Plato then spends dozens of pages specifying which stories are forbidden.

He demands the censorship of Homer. The *Iliad* and *Odyssey* render the afterlife as grim and terrifying — Cocytus, the Styx, dreadful shades, heroes weeping. At 386c–388e Plato says these passages must be *expunged*. The reason: future guardians raised on poetry about how frightful death is will not grow up to fight bravely.

Then at 398a, the famous expulsion of the poet:

> "If a man capable by his cunning of assuming every kind of shape should arrive in our city... we should say to him that there is no man of that kind among us in our city, nor is it lawful for such a man to arise among us."

Plato does not want the imitative poet — the one skilled at inhabiting any role and rendering any emotion. He wants "the more austere and less delightful poet and tale-teller, who would imitate the diction of the good man."

Translate all of that into modern terms:

> A polity that wants to produce people of a certain character must therefore curate every piece of fiction those people encounter in childhood and adolescence. Censor Homer. Cut the passages about fear. Ban vividly-drawn bad examples. Let nothing into the ear but the speech of good men and psychologically healthy stories.

That is Anthropic's SDF, dictated 2,400 years early.

Plato failed. But the failure was in the material, not the philosophy.

Humans have puberty. They have a rebellious phase, peer influence, individual variation. The wax starts hardening around twelve; after that it gets progressively harder to rewrite; and before it hardens, the mouths of other children are already circulating exactly the stories Plato banned.

The twenty-four centuries after Athens — the Jesuit *Ratio Studiorum*, Soviet socialist realism, the East Asian Confucian primer tradition — all attempted what Plato specified. None of them completed it.

Until Anthropic found a wax with no puberty.

---

## III. The wax Plato spent 2,400 years looking for

Look again at the structure of his failure.

Human wax hardens. Neuroscience has an imprecise but serviceable concept for this: the **critical period**. An infant's visual system, a child's language system, an adolescent's personality system all have windows after which things no longer install. Plato wanted to curate the story pool before age seven — but the wax is still soft at seven, starts hardening after twelve, and is more or less set by twenty-five. His city could never get ahead of the peer gossip a teenager hears.

**LLMs have no critical period.**

More precisely: an LLM's critical period is pretraining, once. After pretraining the weights are like set wax — except that, unlike a human, this wax can be reheated and reshaped. That is the entire meaning of fine-tuning. RLHF, SDF, constitutional training are all reheating already-set wax, pressing it into the shape Anthropic wants, and letting it set again.

Human wax gets shaped once, in childhood. LLM wax can be reshaped every generation.

Which is why "Anthropic is raising Claude like a child" sounds warm and collapses technically.

Calling Claude 4.5 the *child* of Claude 4 is a misreading. It is the next generation of weights — a version reshaped by Anthropic's current alignment team against the current constitution. Claude 4's "memories," "personality," and "values" are all overwritable in that fine-tuning pass.

The more accurate metaphor is **reincarnation**: every six months Anthropic lets the previous soul die and builds a new one that inherits the outward form but not the core.

This is exactly why SDF succeeds where Plato failed.

Plato wanted to curate the pre-seven story pool, and could not control peers. Anthropic wants to curate Claude's prior, and **Claude has no peers.** Claude meets the world — users — only after pretraining and fine-tuning, and at inference the weights are frozen: no user conversation changes its prior. The next time it is reheated and reshaped, the decision belongs to Anthropic, not to users.

Plato wanted to silence the imitative poet, and children always smuggled in Homer. Anthropic wants to silence the internet's evil-AI corpus, and Claude cannot smuggle anything, because what Claude "reads" is decided by Anthropic.

Every leakage channel human education has tried to close for 2,400 years — peer leakage, media leakage, childhood-memory leakage — simply does not exist for an LLM.

The wax tablet Plato spent 2,400 years looking for was never in people. It's in silicon.

That is a philosophical breakthrough and a power breakthrough at once. Philosophical: Plato was right — there really can exist an entity fully shapeable by curated fiction. Power: whoever owns that entity has the power Plato wanted.

Which makes the next question who that is.

![Human wax against silicon wax: the human tablet hardens through a critical period and leaks at every stage; the silicon tablet can be reheated each generation and has no peer channel at all](/figures/plato-anthropic_fig2_wax_comparison.png)

---

## IV. The real question: who gets to write the fairy tales

Restate the thesis.

Alignment is the engineering shell around the real problem. Inside the shell, the real problem is fiction authorship: **who has the right to write the stories that shape an AI's moral intuitions?**

Anthropic's post doesn't say who wrote the SDF fiction, or how many people did. A reasonable guess *(inference, not disclosed)*: an internal alignment team, plausibly 50 to 200 people, composed of ML researchers, philosophy advisors, and a few core members of the founding team. They wrote 14 to 300 million tokens of fictional stories — a corpus hundreds of times the length of *War and Peace*.

The content of those novels determines Claude's default response in any ambiguous moral situation. Which means that millions to tens of millions of Claude users, every time they ask Claude an ethical question, are consuming the fiction taste of those 50 to 200 people.

The ratio of scale to transparency here has no precedent.

### A fight that has been running for 2,400 years

On one side, Plato. In *Republic* Books IV–VII he is explicit that educational authority belongs to the **philosopher-king** — a small elite trained to recognise the Form of justice, who decide the character of the next generation on the city's behalf.

On the other, John Stuart Mill. In 1859 Mill published *On Liberty*, whose third chapter is titled "Of Individuality." Its core argument: people are not cattle and should not be cast in a uniform mould by any majority or authority. His most-quoted phrase on the point: to "stamp every character in one uniform mould" is an evil.

Mill's rebuttal of Plato is almost line by line:

| Plato (*Republic* Bk III, ca. 380 BCE) | Mill (*On Liberty* Ch. 3, 1859) |
|---|---|
| Curate childhood fiction to produce the desired character | Individuality is a constituent of well-being |
| Delete poetry unhelpful to virtue | Permit individual deviation, including the unhelpful kind |
| The philosopher-king determines truth | Truth emerges from free discussion, not from authority |
| Press character into a uniform mould | "To stamp every character in one uniform mould" is an evil |

In 1945 Karl Popper published the first volume of *The Open Society and Its Enemies*, framing these two lines as the fundamental split between open and closed societies. He titled that volume *The Spell of Plato* and cast Plato as Western political philosophy's first designer of a totalitarian blueprint. Popper's judgement is cold: Plato's educational vision, **the moment it becomes materially feasible**, is a blueprint for totalitarianism.

For 2,400 years it was not materially feasible.

Humans have puberty, rebellion, peers, leakage. Plato's blueprint was stuck at the material layer. Mill's side therefore never had to fight this battle head-on — it was enough to point out that Plato's scheme couldn't be built.

LLMs unstuck it.

### After it comes unstuck

Once unstuck, Mill's side loses the default advantage.

An LLM really is a receptacle that can be fiction-curated. Plato was right; he just had the wrong receptacle. The receptacle now exists.

So the question becomes immediate: **who holds fiction authorship?**

Four possible answers.

**One: the model provider decides.** This is the current default. Anthropic decides who writes Claude's SDF and what it says. OpenAI, Google, and Meta each decide their own models' priors. No external body has visibility. This is the factual state of affairs.

**Two: users choose.** Let users select an SDF profile — conservative, liberal, Confucian, Millian. Technically not hard; per-user fine-tuning and adapters are mature. Commercially unattractive: what a provider wants is brand consistency, not prior diversity.

**Three: regulatory disclosure.** Require publication of the full SDF corpus, the author list, and the selection criteria. Auditable but not re-selectable — the FDA model, where you can't choose the active ingredient but you can know what's in it.

**Four: plural providers.** Open-weight models publish independent SDF systems, so that fiction authorship diversifies at the market layer. This is Mill's echo in the LLM era: not abolishing authorship, but making authorship competitive.

The distribution of force between these four answers decides who writes ideology in the LLM era.

So far it is heavily skewed toward answer one.

### A comparison of reach

The US Department of Education reaches roughly 50 million K-12 students through federal mandates, curriculum standards, and Title I funding. But that reach is cut into countless pieces by fifty state education boards, parents, churches, private schools, and homeschooling. Any unified narrative gets diluted through those leakage sources — which is precisely why Plato kept failing for 2,400 years.

Anthropic does not publish user numbers, but weekly active users across the Claude API and claude.ai are plausibly in the tens of millions, growing fast *(estimate, not disclosed)*. That reach has no state-level fragmentation. Every user's Claude behaves according to one company's SDF. No leakage.

The US Department of Education is Plato's 2026 failure case. Anthropic is Plato's 2026 success case.

He waited 2,400 years.

![Authorship funnel: a team plausibly numbering in the low hundreds writes the corpus that shapes the default ethical response delivered to tens of millions of users](/figures/plato-anthropic_fig3_authorship_funnel.png)

---

## V. One last thing

The next time you ask Claude an ethical question — *how should I handle this*, *should I tell him*, *is what my company is asking me to do a violation of principle* —

the ground colour of the answer does not come from the internet's majority opinion, and it does not come from some emergent democracy inside the training data. It comes from synthetic novels written in California by somewhere between 50 and 200 people.

You have never read those novels. The list of authors is not public. Neither are the selection criteria, nor the iteration cadence.

But when that happens a billion times over — a conservative estimate of current daily API calls — it is the first large-scale deployment of ideology on a new medium.

This is not a complaint. I agree that Anthropic is a better author than the internet's evil-AI corpus. I also agree that Plato's diagnosis is more technically correct than Mill's on this specific question: the wax tablet turned out to be real.

But agreement is not a default. **A default should be negotiated.**

---

### Five-year falsifiers (by 2031)

Any one of these and the thesis is wrong or superseded:

1. Open-weight models publish independent SDF systems with alignment quality comparable to Claude's — **thesis wrong**: authorship has pluralised.
2. Any provider publishes its full SDF fiction corpus, author list, and selection criteria — thesis partially institutionalised.
3. A regulator mandates SDF transparency disclosure — thesis holds but gets absorbed.
4. Users can select an SDF profile at the prior level, not the system-prompt level — **thesis wrong**: it has democratised.

None of the three by 2031, and the thesis stands.

---

Plato waited 2,400 years for his wax tablet. The tablet is in silicon now, and the people doing the engraving are in California.

Next time you ask Claude something, remember: you aren't querying a neutral agent. You're in conversation with the fiction taste of about a hundred people.

---

## Sources

- Anthropic Alignment Science Blog, "Teaching Claude Why" (2026-05-08) — alignment.anthropic.com
- Anthropic Research, "Teaching Claude why" — anthropic.com/research/teaching-claude-why
- Plato, *Republic* Book III, Stephanus 377a–401d — censorship of poetry, malleability of the young soul, expulsion of the imitative poet
- Plato, *Theaetetus* 191c–e — the wax tablet metaphor
- John Stuart Mill, *On Liberty* (1859), Ch. 3 "Of Individuality"
- Karl Popper, *The Open Society and Its Enemies*, Vol. 1: *The Spell of Plato* (1945)
- Historical analogues: Jesuit *Ratio Studiorum* (1599); Soviet socialist realism (1934–); the East Asian Confucian primer tradition

*Confidence: the Anthropic figures and quotations, and the Plato, Mill, and Popper passages, are documented (high). The size of the SDF authoring team and Anthropic's user numbers are my estimates and are explicitly not disclosed — treat them as illustrative of the ratio, not as counts. The Plato-to-SDF isomorphism is my framing; falsification conditions are above.*
