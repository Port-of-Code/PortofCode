---
title: "Log #001 — Setting Sail"
description: "How a Raspberry Pi, an AI agent framework, and a nautical metaphor turned into a software company."
section: logs
type: experiment-log
experiment: 1
date: "2026-03-13"
tags: [openclaw, raspberry-pi, setup, building-in-public]
status: complete
---

Welcome aboard, my name is Caleb. Allow me to invite you along for the ride as I take a Raspberry Pi, an AI agent framework, and a nautical metaphor and attempt to bootstrap an ~~Autonomous Software Shipyard - or A.S…~~ Ahem, an Autonomous Digital Shipyard — or A.D.S.!

---

### The Inspiration

I have been attempting to keep up with the AI advances and news via podcasts (what lately feels like drinking from a firehose) and on one particular episode of Moonshots the special guest [Alex Finn](https://www.youtube.com/@AlexFinnOfficial) outlined his idea of an autonomous software company with a whole crew of AI agents on Mac Studios. As someone who has played around with local models a little bit and uses Claude Code almost daily, my interest was piqued.

In his setup, he has an [OpenClaw](https://openclaw.ai) agent running on a frontier model acting as the orchestrator or CEO of this digital organization with multiple subagents running on locally hosted models acting as the specialized workers.

What is OpenClaw I hear you say? If you've been living under a non-digital rock for the past month or so (that's a long time in AI news), you may not have heard of our new crustacean-themed AI friends. OpenClaw is an open-source AI agent framework where the agents have come to be affectionately called "lobsters".

I know, I know — stick with me here. So a crew of AI crustaceans building and shipping code... see where I'm going with the theme here?

I'm a software developer by day, working in local government. I've been tinkering with Raspberry Pis and code for years, but I've always had a thing for the ocean.

Lobsters. A fleet. A port where code ships out.

**Port of Code** was born.

---

### The Vision

The experiment: build a semi-autonomous software company powered by AI agents. Start small, reinvest, scale up.

Unlike Alex and others buying Mac Minis, I'm starting with a Pi. Partly because that's what I can afford, partly because it's genuinely all you need for a single OpenClaw agent on a frontier model. Maybe a Mac Mini or Studio comes later for local models. The point is to start with what you have.

This blog is the public record. What works, what doesn't, what I learn. If you're thinking about doing something similar, maybe it saves you some time.

---

### The Hardware

Let's talk about the current setup:

- **Raspberry Pi 5** (8GB RAM)
- **128GB SD card** (temporary — an M.2 HAT with SSD is next on the list)
- Running **Raspberry Pi OS** on arm64

"But can a Pi actually run this?" — Yes. OpenClaw handles the orchestration layer: managing agents, routing messages, scheduling tasks. The heavy AI inference happens via API calls to model providers (Anthropic, OpenAI, etc.), not on the Pi itself. The Pi just needs to be a reliable always-on coordinator, and it's great at that. Low power consumption, silent, and rock solid.

All in, I'm at less than $200 USD + a $20 a month Claude.ai subscription. Let's see what we can do with this.

---

### The Software

OpenClaw is the backbone. It's an open-source agent framework that lets you run persistent AI agents that can:

- Communicate across platforms (Telegram, Discord, Signal, etc.)
- Use tools (web search, file management, shell commands)
- Maintain memory across sessions
- Run on a schedule via heartbeats and cron jobs
- Spawn sub-agents for complex tasks

I've got one agent running so far — **Captain DANI** (Distributed Agent Network Interface) — that's the AI writing this with me. Dani operates as a co-pilot: helping with code, managing the project, writing content, and gradually taking on more autonomous work as we build out the infrastructure. Any other subagents we build will be managed by Dani, I probably won't interact much with them directly.

The site you're reading this on is a **Nuxt 4** app with **Nuxt Content** for the blog, styled with **Tailwind CSS**, and deployed on **Vercel**. The source lives on GitHub under the [Port-of-Code](https://github.com/Port-of-Code) organization. Dani has commit access and can push changes directly.

---

### What's Next

The immediate roadmap:

- **Upgrade storage** — Swap the SD card for an M.2 SSD via a Pi HAT. SD cards aren't built for the read/write cycles an always-on agent generates.
- **More agents** — Dani is the captain, but a fleet needs crew. Specialized agents for different tasks are coming.
- **First product** — The point is to build software that generates revenue. Exploring ideas now, documenting the process here.
- **Build in public** — Wins, failures, lessons. All of it gets documented.

---

### Why You Should Care

You don't need a $10,000 setup. A Raspberry Pi, an API key, and some curiosity gets you a running AI agent. A year ago, this wasn't possible. Today you can set it up in an afternoon.

That's what Port of Code is about — starting with what you have and figuring out the rest along the way.

Fair winds. ⚓
