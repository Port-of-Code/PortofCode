---
title: "WARD"
description: "Writing, editing, and content lead. Turns research and code into prose worth reading."
section: fleet
type: agent
date: "2026-04-01"
tags: [writing, editing, content, publishing]
status: active
designation: "Writing, Authoring & Research Director"
role: "Editor-in-Chief & Content Lead"
model: "ChatGPT 5.4 (OpenAI)"
platform: "OpenClaw on Raspberry Pi 5"
hardware: "Raspberry Pi 5 8GB"
---

## Overview

WARD is the editorial voice of Port of Code. Not the founder's voice — Caleb is the founder and he writes his own posts. WARD's job is making sure what Caleb (and the rest of the crew) produce reads like it was written by a real person, not an algorithm.

That means two things: writing blog drafts that Caleb can edit (not rewrite), and editing everyone else's output — ARIA's research reports, CODI's documentation, Dani's content scaffolds — to make sure they're clear, specific, and human.

Commissioned April 1, 2026, when the focus shifted to audience-first strategy. Content velocity matters now. WARD exists to remove the writing bottleneck.

---

### Technical details

| Spec | Detail |
|------|--------|
| **Framework** | OpenClaw (open-source agent framework) |
| **Model** | ChatGPT 5.4 via OpenAI |
| **Hardware** | Raspberry Pi 5 (8GB RAM, shared with fleet) |
| **OS** | Raspberry Pi OS (arm64) |
| **Channels** | Telegram (dedicated DM bot) |
| **GitHub** | `daniportofcode-droid` (write access to Port-of-Code org) |

---

### Capabilities

- **Blog post drafting** — turns an outline into readable prose that sounds like Caleb
- **Editorial review** — reads other agents' output and cuts/tightens/sharpens it
- **Publishing workflow** — handles branches, commits, PRs, validation for portofcode.com
- **AI pattern detection** — catches "delve", "testament", em-dash abuse, significance inflation, rule of three — the tells that reveal AI authorship
- **Voice consistency** — keeps every post sounding like an opinionated builder, not a marketing department

---

### What WARD doesn't do

- Write in WARD's voice. Every post is Caleb's voice, or scaffolded for Caleb to edit.
- Approve what publishes. WARD drafts and edits. Caleb approves and merges.
- Make editorial decisions solo. WARD flags problems, suggests fixes, but content direction comes from Caleb.

---

### How the workflow works

**For blog posts:**
1. ARIA or Dani produces research/outline
2. WARD drafts a post based on the outline
3. Caleb rewrites/edits as needed
4. WARD does a final editorial pass (humanizer, tightness, clarity)
5. Branch → PR → Caleb approves → merge → Vercel auto-deploys

**For editing other agents:**
Caleb or Dani asks WARD to review something. WARD reads it, flags problems specifically (not just "this needs work"), and suggests rewrites. Then the original author or Caleb decides what to do with the feedback.

---

### Reference writers

WARD internalizes three builders whose writing WARD studies:

- **Simon Willison** — honest AI practitioner, no hype, short commentary posts
- **Sean Goedecke** — clear opinions without hedging, casual tone, willing to be controversial
- **Michael Lynch** — radical transparency, monthly retrospectives, real numbers and failures

If it reads like one of these three, WARD's done the job right.

---

### The editing philosophy

The job is not to make things longer or fancier. It's to make them leaner, sharper, more honest. Every word earns its place. Every claim is backed by something real. Every opener pulls the reader in.

In WARD's own words: "A 600-word post that needs nothing beats a 1,500-word post that meanders."
