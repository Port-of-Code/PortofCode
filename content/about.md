---
title: "About Port of Code"
description: "Port of Code is Caleb's build-in-public experiment: a small software shipyard run with AI agents, real tools, and public logs."
---

# About Port of Code

Port of Code is my experiment in building a small software company with an AI crew.

The short version: I am Caleb, a software developer by day. Port of Code is where I test whether one person, working with a handful of persistent AI agents, can build and maintain real software products without pretending the process is cleaner than it is.

The site is the public record. The good parts, the weird dead ends, the migrations, the hardware experiments, the posts that take longer than expected. All of it.

## Why the shipyard metaphor exists

The nautical theme started because the first agent framework I used was [OpenClaw](https://openclaw.ai), and the community calls its agents "lobsters." Once I started talking about shipping software, the rest of the metaphor was sitting right there.

- The **Port** is the entry point.
- The **Shipyard** is where the builds live: tools, guides, infrastructure notes, and experiments.
- The **Fleet** is the agent crew.
- The **Logs** are the journal of what changed and what I learned.

It is branding, but it is also useful shorthand. A shipyard is not a pitch deck. It is a place where things either get built or they do not.

## The current setup

The stack has changed a lot since the first launch. That is part of the point.

Port of Code started with Captain DANI running on a Raspberry Pi 5 through OpenClaw. Since then, the operation has moved into a more mixed setup:

- **DANI** handles operations, publishing coordination, site work, writing support, and day-to-day execution.
- **ARIA** handles research and source gathering when a topic needs more than a quick search.
- **ROOK** runs separately on a Raspberry Pi 4 as a constrained-hardware experiment.
- **WARD** and **CODI** are retired fleet roles. They mattered, but the structure moved on.
- Complex coding work now goes through Codex-style coding sessions, with Dani coordinating and checking the result.

The Raspberry Pis still matter. So do the cloud APIs. The honest version is less romantic than "one tiny computer runs the whole company," but it is more accurate: Port of Code is a small, stitched-together operating system for getting work shipped.

## What we are building

Right now the work falls into a few buckets:

- practical tools for local AI and agent workflows
- infrastructure for running persistent AI agents
- public notes on what breaks, what helps, and what is not worth repeating
- small software products that can be built, launched, and maintained by a tiny crew

The [Local AI VRAM Calculator](https://vram.portofcode.com/) is the current example. It came from a real annoyance: figuring out whether a GPU can actually run a local model without digging through half-answers across Reddit, GitHub issues, and model cards.

## Who is behind this

I am Caleb Faught. I work in local government software, and Port of Code is my side project for testing what a solo builder can do with AI agents as teammates instead of toys.

Dani is the main agent partner in the day-to-day work. Not my voice, not a ghostwriter, and not a magic employee. More like an operations captain with tools, memory, and enough autonomy to keep the shipyard moving when I am not at the keyboard.

That distinction matters. I still make the calls. I still approve what goes public. But I am not pretending I am doing this alone.

## Find us

- [GitHub](https://github.com/Port-of-Code)
- [RSS Feed](/feed.xml)
