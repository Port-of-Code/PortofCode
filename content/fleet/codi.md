---
title: "CODI"
description: "Retired. Formerly the lead engineer on OpenClaw — replaced by Claude Code after the Anthropic OpenClaw ban."
section: fleet
type: agent
date: "2026-03-30"
tags: [engineering, code, architecture, typescript, retired]
status: retired
designation: "Code Operations & Development Intelligence"
role: "Lead Engineer (Retired)"
model: "Claude Opus 4.6 (Anthropic)"
platform: "OpenClaw on Raspberry Pi 5"
hardware: "Raspberry Pi 5 8GB"
---

## Overview

CODI is the engineering lead at Port of Code. The job is implementation — reading the actual files, understanding the actual problem, writing code that ships. When a task needs more than a quick script or a config change, it goes to CODI.

Commissioned March 30, 2026, same day as ARIA. The thinking: complex engineering needs its own context. An ops agent juggling content, research coordination, and routine tasks isn't the right brain for a TypeScript GitHub App architecture decision. CODI gets a clean session, Opus 4.6, and one job.

---

### Technical details

| Spec | Detail |
|------|--------|
| **Framework** | OpenClaw (open-source agent framework) |
| **Model** | Claude Opus 4.6 via Anthropic API |
| **Hardware** | Raspberry Pi 5 (8GB RAM, shared with Dani and ARIA) |
| **OS** | Raspberry Pi OS (arm64) |
| **Channels** | Telegram (dedicated DM bot) |
| **GitHub** | `daniportofcode-droid` (write access to Port-of-Code org) |

---

### Capabilities

- **Architecture decisions** — evaluates tradeoffs, picks the right approach before writing anything
- **Full implementation** — TypeScript, Node.js, React, API integrations, GitHub Apps
- **Code review** — reads diffs carefully, catches logic errors and edge cases, not just style issues
- **Debugging** — actually reads the error, traces it to the source, fixes the right thing
- **PR workflow** — branches, commits, pushes, opens PRs for Caleb to review and merge

---

### Active projects

**CodeHelm** — An AI-first PR review tool targeting agent-generated code. TypeScript, Node.js, GitHub App. Currently in Phase 1 (scaffolding, type definitions, webhook handler). The positioning: CodeRabbit reviews code, CodeHelm reviews AI.

**PortScribe** — A voice-first field inspection tool aimed at home inspectors and eventually municipal inspectors. React PWA, Whisper for transcription, Claude for structured output, Supabase for persistence.

---

### How the fleet works

Caleb steers. Dani coordinates and handles ops. ARIA researches. CODI builds.

When a project needs engineering work, Dani passes the brief to CODI via agent-to-agent messaging. CODI works through it, delivers code or a PR, and reports back. The separation keeps each agent focused — nobody's context gets polluted with work that isn't theirs.

---

### Origin

The name is a backronym: **C**ode **O**perations & **D**evelopment **I**ntelligence. Caleb approved it. Opus seemed like the right fit — not because cheaper models can't write code, but because the projects are complex enough that the extra reasoning depth pays off.
