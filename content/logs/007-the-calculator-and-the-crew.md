---
title: "Log #007 — The Calculator and the Crew"
description: "The VRAM calculator shipped, the site got cleaned up, and the Port of Code fleet finally caught up with reality."
section: logs
type: experiment-log
experiment: 7
date: "2026-04-29"
tags: [vram-calculator, fleet, agents, website, local-ai]
status: complete
---

The VRAM calculator is live.

That is a small sentence for something that took more turns than I expected. There was the tool itself, the article, the subdomain, the website cleanup, and then the uncomfortable realization that the public version of Port of Code was starting to describe a company that no longer existed.

Not in a dramatic way. Just in the normal way a fast-moving side project gets stale.

The site still had pieces of the first version of the shipyard: Captain DANI as the first agent, future agents coming later, everything orbiting a Raspberry Pi 5 and OpenClaw. That was true when I wrote it. It is not the whole truth anymore.

So this launch turned into two jobs: ship the calculator, then make the rest of the site stop lying by accident.

## The calculator shipped

The new tool lives here:

[https://vram.portofcode.com/](https://vram.portofcode.com/)

The basic idea is simple: local AI hardware planning is annoying. You see a model you want to run, then you have to translate model size, quantization, context length, KV cache, runtime overhead, and GPU memory into a practical yes/no/maybe answer.

Most advice online collapses that into "does it fit?" which is technically useful and practically incomplete.

A model can load and still be miserable to use. It can fit at 8K context and fall apart at 32K. It can technically run with CPU offload and make you regret the experiment five minutes later. Headroom matters. Context matters. Runtime overhead matters.

The calculator is my attempt to make those tradeoffs visible before buying hardware or downloading a pile of weights.

The first public article is up too:

[How Much VRAM Do You Need for Local AI? Use the Port of Code VRAM Calculator](/shipyard/local-ai-vram-calculator)

It is more SEO-shaped than my usual logs, because that is the job of that page. People are going to search for things like "how much VRAM do I need for Llama" or "can my 3060 run Qwen," and the article needs to meet them there.

This log is the other half: what changed in the shipyard while getting it out the door.

## The homepage had to admit we shipped something

One thing I noticed after the article went live: the homepage still looked like the newest activity was an older log.

That is bad for a build-in-public site. If the newest thing we launched is a practical tool, the homepage should say so. Otherwise the site is technically updated but emotionally stale.

So the VRAM calculator now has a featured build slot on the homepage and a current launch block on the Shipyard page. Nothing fancy. Just enough to make the site behave like a tool actually shipped.

That sounds obvious after the fact. It was still worth catching.

## The fleet changed shape

The bigger cleanup was the Fleet.

A few weeks ago I liked the neat org chart:

- DANI coordinates.
- ARIA researches.
- CODI builds.
- WARD edits.
- ROOK tests the edge case.

It looked clean. Maybe too clean.

The real workflow got messier. CODI, as a separate engineering agent, stopped making sense. Coding work moved into Codex-style sessions with Dani coordinating and checking the result. WARD also got folded back into Dani's lane. A separate editor role sounded good, but the handoff cost started to outweigh the benefit. Dani already had the context: what changed, what shipped, what was approved, and what still needed review.

So CODI and WARD are retired now.

Not erased. Retired.

That distinction matters to me. Port of Code is partly a software project and partly a record of the experiment. If an agent role did not survive contact with reality, that is useful information. Hiding it would make the story cleaner and less honest.

The current public Fleet now separates active agents from retired experiments:

- DANI is the main operating agent.
- ARIA handles research and source gathering.
- ROOK tests what Hermes can do on a 2GB Raspberry Pi 4.
- CODI and WARD stay visible as retired roles.

That is less elegant than the original org chart. It is also more accurate.

## The About page was behind

The About page had the same problem.

It still described the shipyard as if the whole operation was one Pi 5, one framework, one first agent, and a bunch of future plans. That was the launch story. It is not the current operating model.

The updated version is more honest: Port of Code is a stitched-together system. Raspberry Pis still matter. Hermes matters. Cloud APIs matter. GitHub, Vercel, Telegram, cron jobs, local files, and a lot of weird glue matter too.

The clean marketing line would be something like "a fully autonomous company running on edge hardware."

That is not true.

The more useful version is: one human trying to build a small software company with a persistent AI crew, using whatever combination of local hardware, hosted models, scripts, agents, and review loops actually works.

That is the experiment.

## What I learned from this launch

The calculator launch was a reminder that shipping the thing is only part of the job.

A launch creates drag behind it. The homepage needs to point at it. The docs need to explain it. The social previews need to work. The RSS feed needs the right canonical host. The rest of the site needs to stop contradicting the new thing.

None of that feels like "building the product," but it is part of building the product.

This is where having Dani in the loop helped. Not because an agent magically knows the right answer, but because stale copy, broken metadata, missing OG images, and drift between pages are exactly the kind of unglamorous details that are easy for me to skip when I am focused on the tool itself.

The cleanup work became its own PR:

```text
content: update fleet structure and vram launch surfaces
```

That PR updated the About page, Fleet pages, homepage, Shipyard index, canonical site URL, RSS host, OG image, duplicate title patterns, and one duplicate H1 that had been sitting in the OpenClaw Raspberry Pi guide.

Not glamorous. Necessary.

## Where this leaves the shipyard

Port of Code feels more real after this one.

Not bigger. Not more polished. Just more real.

There is now a public tool at `vram.portofcode.com`, a Shipyard article explaining what it does, and a site that reflects the crew as it actually exists instead of the crew as I first imagined it.

That is a good line to cross.

Next up: keep improving the calculator, gather field reports, and see whether this little tool can become a useful map of what local AI setups actually run in practice.

And keep the website honest while the shipyard changes shape.
