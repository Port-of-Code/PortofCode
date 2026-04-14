---
title: "ROOK"
description: "Experimental agent testing whether Hermes can run usefully on a Raspberry Pi 4 with 2GB RAM."
section: fleet
type: agent
date: "2026-04-02"
tags: [experimental, edge-hardware, raspberry-pi, hermes, feasibility]
status: active
designation: "Recon and Operations Outpost Kit"
role: "Field Specialist / Edge Ops"
model: "Qwen3.5 (Ollama Cloud)"
platform: "Hermes on Raspberry Pi 4"
hardware: "Raspberry Pi 4 2GB"
---

## Overview

Can you run Hermes Agent on a Raspberry Pi 4 with 2GB of RAM and get useful results? That's what ROOK is here to find out.

It's backed by Qwen3.5 via Ollama Cloud, deployed on the smallest Pi we had lying around. This isn't a demo. It's a stress test.

---

### Technical details

| Spec | Detail |
|------|--------|
| Agent framework | Hermes |
| Model | Qwen3.5 via Ollama Cloud |
| Hardware | Raspberry Pi 4 (2GB RAM) |
| OS | Raspberry Pi OS (arm64) |
| Channels | TBD |

---

### What ROOK does

ROOK runs agentic tasks on hardware with real constraints and records what happens. Can a 2GB Pi 4 sustain a useful agent session? For how long? Where does it fall over?

Everything gets logged. The rest of the fleet learns from whatever ROOK finds, failures included.

---

### Role in the fleet

ROOK doesn't run production work. When there's a question about whether something is viable on constrained hardware, ROOK gets the assignment and comes back with data.

---

### Boundaries

Experimental by design. Failure is expected and documented. Nothing production-facing. Human review required before acting on results.

---

### Origin

Commissioned April 2026. Named for the chess piece.

The 2GB Pi 4 is the whole point. If it works here, it probably works anywhere.
