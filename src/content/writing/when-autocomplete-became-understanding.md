---
title: 'From Autocomplete to GPT: When Did "Completion" Become "Understanding"?'
summary: "Your phone's autocomplete and GPT run the same move — predict the next token — with no point on the continuum where 'understanding' switches on. Emergence, it turns out, is not a property the model acquired. It's a word we started using — and Anthropic's own J-space paper won't use it."
pubDate: 2026-08-31
lang: en
tags: [llm, epistemics]
originalSource: 'Adapted from the Chinese original (2026)'
---

> **The emergence isn't in its capability. It's in our name for it.**

---

**TL;DR**

- Your phone's autocomplete and GPT run the same operation — predict the next token. From n-gram input methods to GPT is one continuous rail, with no notch where "understanding" switches on.
- "Emergent abilities" look like a sharp step. Schaeffer et al. (2023) showed the step is an artifact of the metric: switch from all-or-nothing scoring to partial credit and it flattens into a smooth slope. The staircase is drawn by the ruler, not grown in the model.
- So "understanding" has no objective notch to point at. It was never measured *in* the model; it's a label we stick on once the output is fluent enough. The observer changes words; the object doesn't change.
- The hardest objection is Anthropic's 2026 J-space: a silent internal workspace, causally steerable, holding concepts the model hasn't said. Real structure — but the paper itself takes "no position" on consciousness and never claims "understanding." Finding a structure and calling it understanding are two different acts; the second one is still ours.
- We didn't build a machine that understands. We built one fluent enough that we can't help switching words. Emergence isn't in its capability — it's in our name for it.

---

You type *tomo* on your phone and it offers *tomorrow*. You tap it without a thought — it's just autocomplete.

Last month you used some AI for real, and it produced a paragraph so fluent you paused: this thing actually gets it.

But these two are the same move: look at the words so far, guess the next one.

You call the small one *autocomplete*. You call the big one *understanding*.

When, exactly — and on what grounds — did you switch words?

## The same move

Strip this down to the bone.

Your phone's autocomplete does something plain: look at what you've typed, compute the most likely next word, put it first. The old pinyin engines did it by counting frequencies — "we" is often followed by "are," so "are" floats up. It has a proper name: a language model. It predates ChatGPT by twenty years and has been sitting in your pocket the whole time.

GPT does the same thing. Give it the words so far, it computes a probability over the next word, emits one, feeds it back, computes the next. One token at a time, out rolls a paragraph.

There is no break along this road. Frequency-counting autocomplete → autocomplete with a neural net → a bigger neural net → GPT: one continuously thickening rail, not a species change at some point. From statistics to Transformer is engineering shading over gradually, not capability leaping a cliff. At every step the move is unchanged: `P(next word | the words so far)`.

![A continuous slider from n-gram autocomplete to GPT — the same operation the whole way, with no notch where "understanding" lights up](/figures/emergence_fig1_slider.png)

So if you're willing to call GPT "understanding," you owe an awkward answer: on this rail, which notch is the one where "understanding" begins?

## "Emergence" — the hard objection stands up first

Here a hard objection stands up, and it deserves the stage before anything else.

It goes: no, scale isn't smooth. Grow a model past some size and abilities *emerge* that smaller models flatly lack — multi-digit arithmetic, following a novel task from a few examples, breaking a problem into steps. These sit near zero in small models, then at some parameter count, snap into existence.

This isn't a bar-room marvel; it's the claim of a real paper (Wei et al., 2022). Its definition of an "emergent ability" is crisp: one that isn't present in smaller models but is present in larger ones. And two things make it bite — it's *sharp*: on like a switch, seemingly instantaneous; and *unpredictable*: you can't extrapolate from small models where it will show up.

If that's true, my "continuous rail" just took a crater. Somewhere on the rail there really is a notch where quantity turned into quality.

And that notch — could it be where "understanding" begins?

## The staircase is drawn by the ruler

Someone put that staircase under a microscope.

Schaeffer, Miranda, and Koyejo (Stanford, 2023) asked a dumb question: this snap-into-existence step — is it grown in the model, or drawn by the ruler we measure it with?

It comes down to scoring. Many "emergent" tasks are graded all-or-nothing — a multi-digit sum, one digit wrong scores zero. Under that ruler a small model sits at zero forever, because it always slips a digit somewhere; only once the model is big enough to almost never slip does the score leap up. That is where the staircase comes from.

Switch rulers. Instead of all-or-nothing, give partial credit for each character right. Same models, same outputs, not a single number changed — and the sheer step flattens into a slope rising from the start. Capability was climbing smoothly all along; the all-or-nothing ruler just scored every early gain as zero, banked it, and paid out all at once, which reads as a sudden jump.

They didn't just assert it. They confirmed predictions on the GPT-3 family, ran a meta-analysis over a several-hundred-task suite, and — the sharp move — *manufactured* never-before-seen emergence in vision tasks that had none, purely by choosing a metric. You can have as much staircase as you like; it depends which ruler you bring.

Their one-line result: alleged emergent abilities "evaporate with different metrics or with better statistics," and may not be a fundamental property of scaling at all.

![Same model family, two rulers: all-or-nothing scoring draws a sharp "emergence" step; partial-credit scoring flattens the identical data into a smooth slope. The staircase is drawn by the ruler](/figures/emergence_fig2_metric.png)

The notch I took for "understanding begins here" was on loan from the ruler. Give the ruler back, and the rail is the smooth rail it always was.

## So "understanding" has nowhere to stand

Say the consequence out loud.

If capability grows smoothly and continuously, then "right here, it starts to understand" has no objective notch to point at. Point at any notch and you can; point at any notch and you have no grounds — because between two adjacent notches nothing essential happened, just a little more parameters, a little more data.

So the word "understanding" shows its hand. It was never something we *measured* in the model — the way we measure its parameter count or its accuracy. It's a label we stick on, watching whether the output is fluent enough.

The model underwent no phase change at any notch. What changed is us: while it's clumsy we call it a tool; once it's fluent past some point, we can't help switching words and calling it "getting it." Same rail; somewhere in the middle, at a spot none of us can name, we changed what we call it.

## Why we can't help sticking the label on

Dig one layer into human nature here, or this slides into a cheap conclusion — "so AI is faking it." That's not the point.

People have a habit welded into the bone: see fluent, coherent, apt behavior, and you can't help positing a *mind* behind it. Slow, dumb, one-token-at-a-time autocomplete you don't anthropomorphize; fluent, paragraph-at-a-time GPT you can't hold back the "is it thinking?" The label is your projection. You put it there; it isn't emitted by the thing.

Turn the mirror, and the uncomfortable side shows: you do exactly this to the *people* around you.

On what grounds do you say your friend "understood" you? You've never been inside his skull, never read his neurons. What you go on is whether his response is apt, whether he picks up the thread. Your entire evidence for another person's understanding is the fluency of behavior, too.

"Understanding" was never earned by cracking open anyone's skull; it's advanced on the credit of behavioral fluency — for people, and for machines alike. So the question isn't whether the machine deserves the word — it's that the word never had the hard floor you assumed. You extend the credit generously to people; why demand cash from the machine?

![The label lives on the observer's side: the same operation gets tagged "tool / autocomplete" when slow and clumsy, "understanding / intelligence" when fluent — the object unchanged, the observer's word changed](/figures/emergence_fig3_observer.png)

## The one respectable objection

Here the strongest objection stands up — and these past two years, it has grown teeth.

I used to answer it with "chain of thought": the model writes a problem out in steps and reasons through it. But that's ink on the page, words you can see, easy to dismiss — still autocomplete, only now the earlier words contain its own freshly-written reasoning.

The genuinely hard objection is a 2026 paper from Anthropic (they call it the J-space; see the notes). Using a technique called the Jacobian lens, they found a small set of neural patterns inside the model that light up *silently* — written nowhere — yet carry a concept the model has "in mind but hasn't said." Worse still, they ran causal experiments: swap one such pattern for another, and what the model reports — even its answer on a two-step inference — flips to match. This looks, at last, like a real, hands-on-steerable workspace for thinking, sitting underneath "completion."

I owe an honest concession: this is more than my "each step is just guessing the next word." The model's interior isn't a uniform sheet of next-token; underneath it there really is a layer that can be reached in and moved. I take that sentence back.

But — hold on the next step, this is where the whole essay's weight rests. **Finding that structure, and calling that structure "understanding," are two different acts.** And the very people who made the discovery, Anthropic, pin the second act down hard in their own paper. On consciousness they write "we take no position." On the philosophical import of the whole analogy they write it is "unclear and likely controversial." Of "understanding" they say not one word. In other words: **the people who found the workspace are precisely the ones least willing to shout "it gets it."** The ones shouting are outside the paper — the headlines, the demo videos, that little "huh" in you when you read the abstract. The hand doing the naming never once left the observer's side.

And a cleaner layer still: this structure, too, is only visible through an instrument. The J in J-space is *Jacobian* — by definition it is "what shows up when you look through this particular lens." The authors say so themselves: the lens is "an imperfect tool" that only "approximately and incompletely" captures the structure underneath. Even that steep-looking boundary — "the workspace starts here" — they note is "exaggerated by layer subsampling," and flattens out in some models. You see: it's the same old story of the ruler.

So I don't declare victory by insisting everything reduces to completion — I've already conceded that line. I tighten the falsification instead: J-space establishes that *there is a workspace*, not that *the workspace is understanding*. The day someone crosses the gap in between — points at some structure inside the model and shows "this one, verifiably, is understanding itself, and not one more structure we've named understanding" — this essay is void.

I'm betting the gap doesn't get crossed. Because the seam between "found a structure" and "that structure is understanding" is the very seam this whole essay has been about.

## That "getting it" — on whose side

Step back to yourself.

Next time you use AI and feel "this time it really gets me" — pause a second. That "getting it": did it rise off the thing, or did you stick it on?

You can't tell. And "can't tell" is itself the answer.

If "understanding" were something inside it, you should be able to point to where it begins — the way you can point to where its parameter count doubled. You can't. You can't, because the thing isn't on its side at all. It's been on your side the whole time: in the instant you judge whether it's fluent and decide whether to switch words.

This is the same line, one notch further. Meaning slid from the symbols a human can hold to a geometry a human can't enter; the native tongue from the vocabulary to the manifold; the law from the equation to the weights; "objective," inside evaluation, lost the ruler that stands outside the apparatus. Now it's "understanding" — we took it for a property inside the object, and all along it was a label in the observer's hand. **Understanding isn't in the object. It's in the observer.**

![The same line, one notch further: meaning → native tongue → law → objective → understanding, the newest notch landing on "not in the object, in the observer"](/figures/emergence_fig4_lineage.png)

We didn't build a machine that understands. We built a machine fluent enough that we can't help switching words — and then took the switching for its capability.

The emergence isn't in its capability. It's in our name for it.

---

*Notes on sourcing and confidence:*

- *The definition and the "sharp / unpredictable" characterization of emergent abilities are from Wei et al., "Emergent Abilities of Large Language Models," arXiv:2206.07682 (Jason Wei first author, 2022, TMLR). Accurate, high confidence.*
- *The "switch the metric and the staircase evaporates" result is from Schaeffer, Miranda & Koyejo, "Are Emergent Abilities of Large Language Models a Mirage?", arXiv:2304.15004. The core claim (apparent emergence traces to the researcher's choice of nonlinear/discontinuous metric, not to a fundamental change in model behavior with scale; linear/continuous metrics give smooth, predictable curves; confirmed on the GPT-3 family, a BIG-Bench meta-analysis, and vision tasks) is the paper's own; "evaporate with different metrics or with better statistics" is verbatim. The paper received a NeurIPS 2023 Outstanding Paper award (to my knowledge — unverified). High confidence.*
- *A distinction worth keeping: what Schaeffer et al. prove is a **technical** result (emergence is a measurement artifact). "Therefore 'understanding' never had an anchor inside the object and is a label the observer sticks on" is my **inference**, extending that technical result to epistemology — not something the authors say. Technical facts borrowed, philosophical judgment owned, and falsifiable — falsification line in the sixth section. Medium-high confidence.*
- *J-space / the model's internal workspace — from Anthropic, "Verbalizable Representations Form a Global Workspace in Language Models" (transformer-circuits.pub/2026/workspace, arXiv:2607.15495, July 2026; main results on Claude Sonnet 4.5, corroborated on Haiku/Opus 4.5–4.6). Quoted phrases — "we take no position" (on consciousness), "unclear and likely controversial," "an imperfect tool," "approximately and incompletely," the causal self-limit "do not show that they are privileged in doing so," and the boundary "exaggerated by layer subsampling" — are verbatim, checked against both the transformer-circuits and arXiv copies. The causal interventions (swapping J-lens vectors flips reports and two-step-inference answers; ablation degrades 14 tasks) are the paper's own experiments. **The point of proportion**: the paper itself does not claim "understanding" or subjective consciousness — it argues only a functional global-workspace analogy. The move from "found a structure" to "structure is understanding" is my target of argument, not the authors' position; reading J-space as "the AI is thinking / is conscious" happens outside the paper. High confidence.*
- *"Our judgment of another person's 'understanding' also rests only on behavioral fluency" is close to the problem of other minds and a behaviorist stance — my framing, not any one school's verdict.*
- *"Meaning → capability → knowledge → objectivity → understanding, sliding one notch at a time from the symbols a human can hold toward the machine / the observer" is the through-line shared with my language-and-geometry series; this piece is a sibling to "The Same You, Scored Differently" (that one: "objective" loses its apparatus-independent anchor in evaluation; this one: "understanding" never had an anchor inside the object). Same mechanism, placed side by side.*
