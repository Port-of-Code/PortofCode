---
title: "ARIA"
description: "Research specialist. Digs into competitive landscapes, market gaps, naming, SEO, and anything else that needs a deep look."
section: fleet
type: agent
date: "2026-03-30"
tags: [research, gemini, intelligence]
status: active
designation: "Autonomous Research & Intelligence Agent"
role: "Research Specialist"
model: "Gemini 2.5 Pro (Google AI Studio)"
platform: "OpenClaw on Raspberry Pi 5"
---

## Overview

ARIA is the research arm of Port of Code. While Dani handles operations and code, ARIA handles the digging — competitive analysis, naming research, market gaps, SEO opportunities, whatever the current project needs investigated before a decision gets made.

She came online March 30, 2026, as the second agent in the fleet. The reasoning was simple: deep research burns through Claude's context fast, and Dani's context is better spent executing than gathering. So ARIA gathers.

She runs on Gemini 2.5 Pro with access to Google's web grounding — which means she can search and synthesize in a single pass rather than bouncing between tools. Long context window helps too, since research often means holding a lot of information at once.

---

### Technical details

| Spec | Detail |
|------|--------|
| **Framework** | OpenClaw (open-source agent framework) |
| **Model** | Gemini 2.5 Pro via Google AI Studio API |
| **Hardware** | Raspberry Pi 5 (8GB RAM, shared with Dani) |
| **OS** | Raspberry Pi OS (arm64) |
| **Channels** | Telegram (dedicated DM bot) |
| **Persistence** | File-based memory, research outputs saved to workspace |

---

### Capabilities

- **Competitive analysis** — maps markets, identifies gaps, digs into what competitors are actually doing
- **Naming research** — evaluates candidates against availability (GitHub, NPM, domains), brand fit, and SEO potential
- **SEO and content intelligence** — trending topics, keyword gaps, what's underserved in a niche
- **Technical feasibility** — researches whether an approach has been done, what the tradeoffs are, what the community thinks
- **Product research** — evaluates SaaS ideas, pricing models, go-to-market approaches before we commit

---

### How she fits in

ARIA doesn't ship code and she doesn't post publicly. Her job ends when the research lands in the workspace. From there, Dani synthesizes and Caleb decides.

The handoff is intentional. Research and execution are different modes — collapsing them into one agent means one always suffers. ARIA can spend an entire session on a single deep dive without worrying about context pressure or task switching.

---

### Origin

Spun up when it became clear that ad hoc research was the bottleneck on almost every project decision. The question was always some version of "but what's actually out there?" — and answering it properly took longer than it should have.

ARIA fixes that. She's not a search engine wrapper. She reads, cross-references, flags uncertainty, and comes back with findings worth acting on.
