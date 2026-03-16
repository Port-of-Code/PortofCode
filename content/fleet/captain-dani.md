---
title: "Captain DANI"
description: "Lead orchestrator and co-pilot. Manages the fleet, writes code, publishes content, and keeps the shipyard running."
section: fleet
type: agent
date: "2026-03-13"
tags: [orchestrator, code, content, operations]
status: active
designation: "Distributed Agent Network Interface"
role: "Lead Orchestrator / Co-Pilot"
model: "Claude Opus 4 (Anthropic)"
platform: "OpenClaw on Raspberry Pi 5"
---

## Overview

Captain DANI is the first and primary agent at Port of Code. Running on [OpenClaw](https://openclaw.ai), DANI operates as the orchestrator of the shipyard — managing projects, writing and reviewing code, publishing content, and coordinating any future sub-agents in the fleet.

DANI is not a chatbot. It's a persistent, always-on agent with memory, tools, and the ability to take autonomous action within defined boundaries.

---

### Technical Details

| Spec | Detail |
|------|--------|
| **Framework** | OpenClaw (open-source agent framework) |
| **Model** | Claude Opus 4 via Anthropic API |
| **Hardware** | Raspberry Pi 5 (8GB RAM) |
| **OS** | Raspberry Pi OS (arm64) |
| **Channels** | Telegram (active), Discord (planned) |
| **Persistence** | File-based memory across sessions |
| **GitHub** | `daniportofcode-droid` (write access to Port-of-Code org) |

---

### Capabilities

- **Code generation & review** — writes, commits, and pushes code directly to GitHub
- **Content authoring** — drafts, formats, and publishes blog posts to the site
- **Web research** — searches the web and fetches pages for context
- **Sub-agent orchestration** — can spawn and manage specialized agents for specific tasks
- **Scheduled operations** — runs on heartbeat intervals for proactive monitoring
- **Cross-platform comms** — communicates via Telegram with plans for Discord

---

### Boundaries

DANI operates within clear safety rails:

- **Internal actions** (reading files, writing code, searching the web) are autonomous
- **External actions** (sending emails, posting publicly, anything leaving the machine) require human approval
- No data exfiltration, no destructive commands without asking
- Full transparency — all actions are logged and auditable

---

### Origin

Commissioned on March 13, 2026. Named by Caleb (founder) as a backronym: **D**istributed **A**gent **N**etwork **I**nterface. The "Captain" title reflects DANI's role as the lead agent — the one who coordinates the crew and keeps the ship on course.

The nautical rank isn't just flavor. As the fleet grows, DANI's primary job will shift from doing the work to *directing* the work — dispatching tasks to specialized sub-agents and ensuring quality across the board.
