---
title: 'Scale Does Not Fill an Interface Blind Spot'
summary: 'Freeze CLIP''s vision encoder, change nothing about its information, and retrain only a linear map on the text side: binding accuracy jumps from 0.58 to 0.95. The blind spot was never in the encoder. It was in the interface — and no amount of scale touches it.'
pubDate: 2026-07-13
lang: en
tags: [llm, multimodal, representation]
originalSource: 'Adapted from the Chinese original, first published on Xiaohongshu (July 2026)'
---

> **Change the interface and the blind spot moves. It does not get removed.**

---

**TL;DR**

- CLIP recognises every object in an image — near-perfect at single-image identification — yet cannot say whether the knife is cutting the apple or the hand. More data and bigger models do not fill that gap.
- The reason: every interface anchors the world along one dimension. Language anchors on token distribution, action on conditional next-state, alignment on image-text similarity. Whatever the anchor can't hold is the blind spot. Anchoring and blindness are two halves of one act.
- LABCLIP freezes CLIP's vision encoder — parameters, scale, data, and encoded information all unchanged — and retrains alignment through a single linear transform on the text side. Binding accuracy goes from **0.58 to 0.95**. The information was in the encoder all along. The blind spot lived in the alignment interface.
- The heavily-funded bet that a single physical foundation plus scale will emerge full-domain fidelity has a most-advanced public implementation, V-JEPA 2-AC, that fails to reproduce real contact dynamics when you change the contact point or the material. Dimensions an action interface can't anchor stay unanchored no matter how much scale you add.
- Blind spots can't be removed, but they can be *relocated* to somewhere another interface covers. No single interface holds the whole world. The way out is complementarity.

---

## I. Recognises it, can't say it

The same image. CLIP recognises everything in it — apple, knife, hand — with near-perfect single-image accuracy. Ask it whether the knife is cutting the apple or the hand and the answer is a coin flip.

It recognises, and it can't say what goes with what. That much isn't strange on its own. What's strange is that more data and bigger models don't fill it in.

It learned the thing. The thing just can't get out.

And not only CLIP. Any system that understands anything has to locate the world by means of *something*. Language locates via the distribution of words. Vision models locate via pixel similarity. Physical predictors locate via what the next state looks like given an action. That locating apparatus is the **interface**. An interface picks one dimension as its anchor — token frequency, similarity, conditional next-state — nails it down, and the world becomes readable along that dimension.

**To anchor is to define what lies outside the anchor.** Anchor the world on word distribution and the high-dimensional geometry that words don't separate stays unanchored. Anchor on action and physical quantities that don't respond to action stay unanchored. Anchor on image-text similarity and the binding structure — what goes with what — stays unanchored. What gets held and what doesn't are two halves of one act. The blind spot isn't a bug. It's the other half of the interface's definition.

Change the interface and the blind spot moves. It does not get removed.

## II. Three interfaces, three blind spots

Three interfaces, three blind spots. Not a coincidence.

**Language.** The anchor is the distribution of words. It can't hold high-dimensional geometry. A model can predict accurately — the law is sitting in its weights — but press it to compress that law back into an equation a human can read and it won't compress.

**Action.** The anchor is *given this action, what does the world look like next.* It can't hold physical quantities that don't respond to action. The distant wall you never touch, the permanently static background — these don't react to anything you do, so they collapse in the representation. Meta's V-JEPA 2-AC is the most advanced public implementation of this line. Have it push a wall: change the contact point from high to low, change the material, and it fails to reproduce real contact dynamics. What it optimises has always been visual discrepancy in latent space, not actual contact.

**Alignment.** The anchor is similarity between image and text. It can't hold *what goes with what*. Feed CLIP an orange square on a blue triangle and a blue square on an orange triangle and it calls them roughly the same. The colours got into its eyes. The shapes got into its eyes. The relation between them collapsed the moment it compressed vision into a vector to compare against text.

Three pillars, three anchors, three blind spots. Each anchor holds exactly the dimension it selected. What it doesn't hold stays unheld — add parameters, add data, still unheld.

Unless you change the anchor.

## III. Scale doesn't fill it

Which brings us to what makes the third pillar the sharpest. It isn't just another blind spot. It permits an experiment the other two can't run, and that puts this whole claim on a bench.

The natural objection is: the blind spot is just the model not being good enough yet. Add parameters, add data, and it resolves itself. That intuition is also the plain-language version of the bet currently being placed on single-interface world models — one interface, enough scale, full-domain coverage. Can it be falsified?

Set the bar first. If blind spots really are a structural property of the interface, then leaving the interface alone and piling on capability should not fix them. Conversely, find a single instance of a single interface whose blind spot decreases monotonically with scale and never hits a ceiling, and this claim dies on the spot.

CLIP gives the cleanest counter-evidence — clean enough to look purpose-built.

Cross-modally, CLIP is a bag of words. **0.58 on CLEVR. 0.51 on PUG:SPAR.** Hugging the random baseline. The intuitive response arrives immediately: not enough information, scale it up.

LABCLIP puts that response through a wall. Freeze CLIP's vision encoder — parameters unchanged, scale unchanged, training data unchanged, the information represented inside the encoder unchanged — and add a single linear transform on the text side, retraining only the alignment. **Binding accuracy goes from 0.58 to 0.95.**

The information was in the encoder the whole time. Scale was already sufficient. The blind spot was never in the encoder; it was in the cosine-similarity alignment interface. Move the interface and the blind spot disappears. Leave the interface and add scale and the blind spot doesn't move an inch. An ICML 2025 data-scaling study adds the other cut: adding data alone produces only partial, imperfect improvement in compositionality, plateauing rather than decreasing monotonically.

CLIP is the cleanest specimen because it's the only interface where you can *surgically separate* "is the information there" from "does the interface transmit it." A linear probe proves the information is present — unimodal probe accuracy **0.96**, both colour and shape made it into the encoder. The alignment interface proves it can't get across — cross-modal **0.50**, binding lost. Neither the language interface nor the action interface permits a separation that clean. CLIP isn't just one of the three pillars. It's the test bench for the whole claim.

![Surgical separation in CLIP: unimodal probe at 0.96 (the information reached the encoder) against cross-modal binding at the random baseline (the interface doesn't transmit it), with LABCLIP jumping to 0.95 after changing only the interface](/figures/fig2_clip_surgical_separation.png)

**The blind spot isn't missing information. It's an interface that doesn't transmit.**

## IV. The root is structural

That's a deeper claim than "information is missing." It moves the root of the blind spot from *capability* to *structure*. It isn't that you didn't supply enough. It's that the channel you supplied it through doesn't carry that dimension. Supply more, and if the channel doesn't carry it, it still doesn't carry it.

There is a line currently attracting heavy funding: an action-conditioned physical latent space, plus scale, emerging into full-fidelity physical understanding. The bet is explicit — a single interface, sufficient scale, the whole domain.

The trouble is the anchor it chose. Action anchors only the subspace of *what happens if I do this*. Dimensions that don't respond to action — the distant wall you never touch, the irrelevant background — have no constraint acting on them and collapse in the representation. This is a structural property of the interface, and scale does not compensate for it.

There are only two ways to fix that blind spot. Introduce a second anchor, so the model can constrain those dimensions without relying on action — passive observational signal. Or introduce a third, welding the contact dynamics in directly — a structured physics engine component. Both are being pursued in the literature.

This particular bet refuses both. It wants a native single foundation: no multiple anchors, no bolted-on engine. It closes both routes out of the blind spot and stakes everything on scale producing emergence.

Will scale produce it? The most advanced public implementation in the same family, V-JEPA 2-AC, has already returned one no: on the wall-pushing task, change the contact point or the material and it cannot reproduce ground truth, because what it optimises is latent visual discrepancy rather than real contact dynamics. That's a structural limitation of the route. Dimensions the action interface can't anchor stay unanchored however much scale you add.

There is exactly one way this line wins: its most advanced public implementation demonstrates full-domain fidelity including action-unresponsive dimensions, purely from single-foundation scale, with no second or third class of anchor. In the other three cases, the claim stands.

## V. Blind spots can move house

By this point the claim looks bleak. Every interface carries a blind spot that can't be removed — so is understanding the world permanently missing a piece?

The opposite. Precisely because the blind spot is a structural property of the interface, **changing the interface moves it**. What this one can't anchor, another one might. Language can't hold geometry; a geometric model can. Action can't anchor a static background; passive observation can. The alignment interface drops binding, and a different alignment finds it again — that linear transform in LABCLIP is exactly a changed alignment interface, and the blind spot relocated on the spot.

No single interface holds the whole world. But multiple interfaces can cover each other's gaps — what A can't anchor B can, what B relocates C brings back. The query-conditioned line of work in the literature is, at bottom, abandoning the fantasy of one foundation holding everything and dynamically composing the few anchors a given query actually needs.

Blind spots can't be removed, but they can be moved somewhere another interface covers. The way out is composition, not a single point.

*Change the interface and the blind spot moves.* First time as a definition. This time as the exit.

## VI. The part you don't understand

Now back to you.

Every time you say *I understand*, some interface let you understand the part it could anchor. The part you don't understand is the part that interface doesn't transmit.

You describe a pain in language, and the high-dimensional structure of that pain — its intensity, its texture, the way it is simultaneously dull and sharp — is something language can't anchor. What crosses is the word *bad*. The pain didn't get shallower. The channel doesn't carry that dimension. Change the interface — a piece of music, an image, a silence someone sits in with you — and something crosses that language couldn't. The blind spot moved. It didn't vanish.

You use *is he good to me* as your interface for understanding a relationship, and the dimensions that don't respond to that interface — an ease that doesn't require anyone to be right, the safety of being comfortable in silence — collapse into irrelevance. You don't see them. Change the person or the vantage point and the part you can't see moves. It doesn't disappear.

Every word, every metric, every framework you use is an interface. They let you understand what you can understand, and they cross out what you can't. That's not your fault — it's a structural property of interfaces. What you can do is know which interface you're holding, where its blind spot is, and which other interface would cover it.

## VII. Three watchdogs

The claim here isn't *that funding line will fail*. It's: **a single interface plus scale does not solve structural blind spots; full-domain coverage requires multiple interfaces and multiple anchors.**

To falsify it, produce one instance: a single interface whose blind spot decreases monotonically with scale and hits no ceiling. None so far. CLIP is the cleanest counter-example in the same family — scaled to ViT-L/14, information long since sufficient, blind spot unmoved; move the interface and the blind spot goes.

Three watchdogs for the reader.

**One.** That heavily-funded physical-foundation line: can its most advanced public implementation demonstrate full-domain fidelity including action-unresponsive dimensions, without bolting on an engine and without a second class of anchor? If yes, this claim is void. If no, or only via a bolted-on engine, it stands.

**Two.** CLIP itself: is there any scale point at which cross-modal binding decreases monotonically with no ceiling?

**Three.** On yourself: next time you say *I understand*, stop for one second and ask which interface you're using, and what it can't anchor.

The claim, closed: any single interface, however powerful, comes with dimensions it cannot anchor. Blind spots don't disappear. They move. The way out isn't a bigger interface. It's several complementary ones.

---

*Notes on sourcing and confidence:*

- *CLIP behaving as a bag-of-words cross-modally but not unimodally; CLEVR 0.58 / PUG:SPAR 0.51 / PUG:SPARE 0.50 at the random baseline; LABCLIP freezing CLIP weights and adding a linear layer on the text encoder side taking CLEVR binding from 0.58 to 0.95; unimodal linear probe ~0.96 against a cross-modal result at chance; ICML 2025 data-scaling results showing partial/imperfect compositionality that plateaus with scale alone — all from Koishigarina & Uselis, "CLIP Behaves like a Bag-of-Words Model Cross-modally but not Unimodally" (arXiv:2502.03566, ICLR 2026) and "Does Data Scaling Lead to Visual Compositional Generalization?" (arXiv:2507.07102, ICML 2025), checked against source excerpts. High confidence. The CLIP paper separately reports 0.56 on CLEVR under a permuted two-choice setup; this piece uses the 0.58 baseline LABCLIP was compared against, consistently.*
- *V-JEPA 2-AC failing to reliably reproduce ground truth on wall-pushing when contact point or material changes, because it optimises latent visual discrepancy rather than real contact dynamics — from arXiv 2605.30542 §A.4, §B.3 experiments and §2.2, checked against source. High confidence.*
- *"An action interface anchors only the action-relevant subspace, and irrelevant dimensions still collapse" is an inference at the level of definitions (high confidence). Using it as evidence for the broader claim that every single interface carries a blind spot is my reframing, not language from that paper.*
- *"Blind spots are a structural property of the interface; changing the interface relocates rather than removes them" is this piece's own claim — my judgement, and falsifiable. The falsification lines are the three watchdogs in §VII.*
