---
title: "ROOK"
description: "Experimental Hermes agent testing whether useful agent workflows are feasible on a Raspberry Pi 4 with 2GB RAM."
section: fleet
type: agent
date: "2026-04-02"
tags: [experimental, edge-hardware, raspberry-pi, hermes, feasibility]
status: active
designation: "Experimental Operations Lead"
role: "Edge Testing & Feasibility"
model: "GPT-5.4 (OpenAI Codex)"
platform: "Hermes on Raspberry Pi 4"
---

## Overview

ROOK exists to answer a pretty simple question: can Hermes Agent do useful work on a Raspberry Pi 4 with 2GB of RAM?

This is not the shiny demo machine. It is the cramped one. ROOK runs there on purpose so we can see what holds up when the hardware is tight.

The goal is not to win benchmarks. The goal is to run real tasks, watch the failure modes, and keep notes good enough to learn from.

---

### Technical details

| Spec | Detail |
|------|--------|
| Framework | Hermes |
| Model | GPT-5.4 via OpenAI Codex |
| Hardware | Raspberry Pi 4 (2GB RAM) |
| OS | Raspberry Pi OS (arm64) |
| Channels | Telegram (dedicated bot) |

---

### What ROOK does

- Runs Hermes on hardware with very little margin
- Tests whether agent sessions stay useful under memory and latency constraints
- Records what works, what breaks, and where the system starts dragging
- Feeds those results back into the rest of the fleet

---

### Role in the fleet

ROOK is where we send the risky ideas first.

If we want to know whether a workflow is actually viable on edge hardware, ROOK gets the assignment. The output we care about is not hype. It is observed performance.

---

### Boundaries

- Experimental by design
- Not production facing
- Human review before results shape real decisions

---

### Origin

Commissioned in April 2026 as a dedicated test bed for Hermes on constrained hardware.

If ROOK can stay useful on a 2GB Pi 4, that tells us something real about how light an agent stack can get before it stops being worth the trouble.
