---
title: 'Claude Already Dreams. It Only Got the Boring Half Right.'
summary: 'Human sleep runs two systems: slow-wave consolidates and deletes contradictions, REM recombines and preserves them. Anthropic built the first half and called it auto-dream. The half they left out already has an engineering name — hallucination — and we spend everything we have suppressing it.'
pubDate: 2026-06-08
lang: en
tags: [llm, memory, cognition]
originalSource: 'Adapted from the Chinese original, first published on Xiaohongshu (June 2026)'
---

> **Evolution didn't delete the dangerous mechanism. It built the mechanism a room.**

---

**TL;DR**

- Human sleep runs two systems. Slow-wave sleep **consolidates**: deduplicating, pruning, filing the day's memories. REM **fabricates**: stitching unrelated fragments into a scene that never happened — you dream of pulling today's laptop out of a schoolbag you owned ten years ago.
- Anthropic built the first half for Claude, a memory mechanism called auto-dream. They did not build the second. And what auto-dream does is the **exact inverse** of dreaming about an ex: it deletes contradictions; your dream preserves them.
- The half they left out has an engineering counterpart we already know well. We call it **hallucination**, and we spend everything we have suppressing it.
- The counterintuitive conclusion: what general intelligence is missing may not be more parameters but a genuine REM — controlled, offline, contradiction-tolerant generative exploration. Training in a dream was shown to work a decade ago. It just never arrived in language models.

---

## I. You dreamt about your ex again

You've probably dreamt about an ex. More than once.

Notice the settings. They almost never escape those few years. A school corridor, a university classroom, the cubicle from your first job. The person changes appearance, says things they never said. But the background is nailed to one stretch of time and will not move. Your subconscious runs a backlot with a handful of props, used over and over.

And the details are always wrong. You're sitting in a classroom from ten years ago holding the phone you use daily now. You're back in a flat you moved out of long ago, and the person opening the door is someone you met last week. The strangest part: **inside the dream, none of this is suspicious.** Nothing feels off. Only on waking do you register that the phone doesn't belong in that classroom, and that this year's laptop was never in that old schoolbag.

That's the peculiar thing about dreams. Every material is real — real people, real rooms, real objects. And they are assembled into a scene that **never happened and could not happen**. A dream is not playback. It's construction: real parts, fake building.

David Lynch's *Mulholland Drive* is a film about exactly this. The first half is a sweet Hollywood dream-come-true; only later do you learn it was a dream the protagonist had before killing herself — same people, same loves and resentments, all identities swapped. The successful newcomer of the dream is the failed woman of reality; the fragile ingénue of the dream is the woman who took everything from her. **The emotions are untouched. The faces are switched.**

Hold onto that, and turn to something you probably wouldn't connect to dreaming:

**Claude dreams too. But what it dreams and that laptop in the old schoolbag are two entirely different things.**

To see the difference, we have to take apart why humans dream at all.

![A dream: real fragments assembled into a scene that never occurred](/figures/dream_fig1_real_parts.png)

---

## II. Sleep is not one thing, it's two

We treat sleep as a single act: get tired, lie down, power off, wake up restored. Neuroscience has long said a night of sleep is at least **two entirely different systems** working in shifts.

**System one: slow-wave sleep.** Deep sleep — slow, large waves on an EEG. During this stretch the brain does something extremely boring and extremely important: **it sorts the day's memories.** The hippocampus replays the day's experiences segment by segment, selects what's worth long-term storage and transfers it to cortex for filing, and prunes back a batch of the redundant neural connections that proliferated during the day so the system doesn't degrade with use.

In engineering terms, slow-wave sleep is **garbage collection and database compaction**. It creates nothing new. Its whole job is to merge duplicates, delete the stale, and file the scattered where it belongs. A conscientious janitor.

**System two: REM sleep.** The stretch where your eyes dart under closed lids, and where **most bizarre dreaming happens**. In contrast to the janitor's quiet, cortical activity during REM approaches waking levels — but one critical switch is off: the prefrontal machinery responsible for reality-checking is suppressed.

Hence the time-travelling laptop.

REM doesn't sort. It **recombines**. It takes the day's fragments, memories from years ago, and the current emotional state, related or not, throws them into a blender, and stitches them into a coherent narrative. And critically — because reality-checking is off — **it permits contradictions.** The laptop can fall into a decade-old bag, the dead can sit across the table and talk, you can be in two cities at once. Inside the dream, none of it trips an alarm.

The division of labour is the key to everything after this:

| | Slow-wave sleep | REM sleep |
|---|---|---|
| What it does | Consolidate, prune, file | Recombine, fabricate |
| Toward contradiction | **Eliminates** it before filing | **Preserves** it, lets it coexist |
| Output | Cleaner old memories | Scenes never experienced |
| In a word | The janitor | The dreamer |

![Two systems of sleep: slow-wave consolidates, REM fabricates](/figures/dream_fig2_two_systems.png)

Remember this table. Now to Claude.

---

## III. Claude already dreams — what auto-dream is

Recent Claude Code contains a mechanism, unreleased and first surfaced from leaked source, called **auto-dream**.

It solves a very real engineering problem. While working with you, Claude takes notes — your preferences, project conventions, traps it has fallen into — and writes them to a memory file. Over time the file degrades. After twenty-odd sessions it fills with mutually contradictory entries, relative times like "yesterday" and "last week" have lost all meaning, and a debugging note points at a file that no longer exists. The notebook meant to help Claude remember has itself become noise.

Auto-dream cleans that up, in four steps:

1. **Orient** — read the existing memory and establish what is stored.
2. **Gather signal** — scan recent conversation for what the user corrected, whether preferences shifted, which key decisions were made.
3. **Consolidate** — merge new findings into old memory, **convert relative dates to absolute ones, resolve conflicting information**, delete references to files that have vanished.
4. **Prune and index** — rebuild the top-level index into a clean table of contents under two hundred lines, moving verbose material into topic files.

Anthropic's engineers call this dreaming, by analogy to sleep's role in memory. That analogy is **half exactly right and half catastrophically wrong**.

The right half: auto-dream *is* slow-wave sleep. Look back at the left column of the table — consolidate, prune, **eliminate contradiction** — word for word. It's the conscientious janitor.

The wrong half: they think they built a dream, and they built **the left hemisphere of sleep**. The documentation says it plainly — auto-dream never creates new scenes and never fabricates details.

It will never drop a laptop into a ten-year-old schoolbag.

![auto-dream's four phases: sorting throughout, creating nothing](/figures/dream_fig3_autodream_phases.png)

---

## IV. It got half right — and the other half is what dreaming is

Put the two side by side and the difference gets loud.

When I dream about an ex, or about the anachronistic laptop, REM is working: it **preserves** contradiction and **recombines** unrelated fragments into a new scene.

When Claude's auto-dream works, it does the literal opposite: it **eliminates** contradiction ("resolve conflicting information") and **refuses** recombination ("never creates new scenes").

| | My dream (REM) | Claude's auto-dream |
|---|---|---|
| On contradiction | Preserve, let it coexist | Delete, clear it before filing |
| On unrelated fragments | Stitch into a new scene | File separately, never stitch |
| Laptop into the old bag | Entirely natural | Will never happen |
| In essence | The dreamer | The janitor |

So when we say *let Claude dream like a human*, what are we actually asking for?

We're asking for **the REM that got cut**. For it, while consolidating memory, not to rush to delete contradictions but to deliberately keep them — even actively recombine them. Let today's laptop fall into the old bag and see what gets stitched.

And that is precisely what Anthropic, and everyone else building models, is **working flat out to avoid.**

Because the mechanism that deliberately preserves contradiction and stitches unrelated things together is one we've already watched run out of control in language models. We named it: **hallucination**. The model confidently cites a paper that doesn't exist, invents a quote, stitches two real facts into a false conclusion. That is recombination without reality-checking.

> In a human brain, this mechanism runs at night, is called dreaming, and is a gift.
> In a model, it runs during the day, is called hallucination, and is a defect.

**Same act. Change when and where it happens, and it goes from gift to defect.**

I have to hit the brake here honestly. I am not saying hallucination is secretly good and we should stop worrying. When you're checking facts, writing code, or making a medical judgement, hallucination is a straightforward defect and should be suppressed. No argument. I'm saying something narrower and more interesting:

**The human brain did not mix dreaming and waking.** It took the dangerous, contradiction-tolerant recombination mechanism and **locked it in a separate room at night**, called REM. Inside that room recombination is safe, because it is offline, non-acting, and backstopped by reality-checking on waking. During the day the brain will not let you think that way. At night it **forces** you to think that way for an hour or two.

Evolution didn't delete the dangerous mechanism. It **built the mechanism a dedicated, isolated runtime**.

Building AI, we made a different choice. We didn't build the recombination mechanism a room. We tried to erase it from the entire system. We want a Claude that never dreams, is awake 24 hours a day, and is always honest.

Which raises the question: if evolution spent hundreds of millions of years declining to delete this mechanism, and instead built it a room, it must be paying for something expensive. **What?**

---

## V. Training in a dream: the neglected engineering

The most interesting clue about what REM is *for* isn't in neuroscience. It's in a machine learning paper from a decade ago.

In 2018, Ha and Schmidhuber published *World Models*. They did something that sounds like science fiction: **an agent learned to drive and to play games inside a dream it generated itself.**

The mechanism: the agent observes a real environment and trains an internal "world model" — a simulator predicting how the world responds to its actions. Then the crucial step: they **cut off the real environment** and had the agent practise repeatedly inside that internal simulator, on trajectories it generated itself which had never actually occurred. One line from the paper got quoted endlessly afterward: the agent can **train inside its own dream**.

What it learned in the dream worked when brought back to the real world.

The Dreamer line that followed pushed this further: the overwhelming majority of an agent's learning happens inside its imagination of the world rather than in expensive, slow, dangerous real trial and error.

Now line that up with sleep.

REM dreaming may well be the brain **generating offline scenes it has never experienced and rehearsing inside them.** Your real daily experience is finite, safe, and repetitive. The dangers and opportunities reality can throw at you are not. Learning only from real experience means **overfitting** to your limited routine and collapsing the moment something unfamiliar arrives.

Dreaming may be the brain generating its own offline training data. Throwing the laptop into the old bag, seating the dead across the table, putting the person who took everything from you inside a script you control — those absurd recombinations may be the brain exploring, at zero cost and zero risk, *what would I do if reality were otherwise*.

Diane's dream in *Mulholland Drive* is exactly such a rehearsal: in the dream she is successful, loved, and innocent. Her brain runs a simulation of another life inside a safe offline room.

If that account holds, what REM buys becomes clear: **it pays the price of permitting contradiction and purchases the ability to explore unexperienced states.** Evolution judged that trade worth making.

Today's language models **have no such loop.** They learn on enormous volumes of real data, get frozen, and ship. They hallucinate — but those hallucinations are bugs: monitored, penalised, cleared out as thoroughly as possible, and **never recycled as a training signal**. What dreaming the model does gets discarded as noise.

The World Models line proved that training in a dream is engineering-feasible. A decade later it works in the small world of reinforcement learning and has barely entered the language models we actually care about.

![Training inside your own dream: the core loop of World Models](/figures/dream_fig4_world_models.png)

---

## VI. What's missing isn't parameters. It's REM.

Pull the thread together.

Human sleep has two halves. One is a janitor, consolidating memory and eliminating contradiction. One is a dreamer, recombining fragments, preserving contradiction, and rehearsing unlived lives in a safe offline room.

Anthropic built Claude the janitor and called it auto-dream. They built it well; it tidies a chaotic memory file properly. But it left the dreamer half — with all its danger and all its value — outside the door.

And the engineering counterpart of the dreamer half has been in our hands the whole time. We call it hallucination, treat it as a bug, and spend everything we have suppressing it. We have never asked: **what if we built it a room like REM's — isolated, offline, non-acting — where it could safely preserve contradictions, recombine fragments, and rehearse states it has never been in?**

I don't know the answer. But I'm increasingly suspicious that the discussion about general intelligence puts too much attention on *more parameters, more data, more honesty while awake*. We are frantically optimising the system that is awake 24 hours a day and never dreams.

Evolution's hint is written into every human night: **half of intelligence happens in the offline, contradiction-tolerant dark, generating what was never experienced.**

Claude already dreams. It just got the boring half right.

As for the laptop that fell into your old schoolbag — that isn't a malfunction. It may be precisely your brain doing something the laptop still can't.

---

*Notes on sourcing and confidence: auto-dream's four phases and its "never creates new scenes" design, and the World Models "train inside its own dream" result, are sourced and were checked while writing (high). The neuroscience — slow-wave sleep for consolidation, REM for recombination and emotion, dreaming as offline rehearsal — reflects mainstream hypotheses rather than settled fact (medium). "Hallucination equals suppressed REM" is a reframing for thinking with, not a claim of mechanistic identity (explicitly speculative).*
