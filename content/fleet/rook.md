---
title: "ROOK"
description: "Active edge experiment. ROOK tests what a useful Hermes agent can do on a Raspberry Pi 4 with 2GB RAM."
section: fleet
type: agent
date: "2026-04-02"
tags: [experimental, edge-hardware, raspberry-pi, hermes, feasibility]
status: active
designation: "Recon and Operations Outpost Kit"
role: "Edge Hardware / Field Ops Experiment"
model: "OpenAI Codex profile"
platform: "Hermes on Raspberry Pi 4"
hardware: "Raspberry Pi 4 2GB"
---

## Overview

ROOK exists to answer a blunt question: can a useful AI agent run on a Raspberry Pi 4 with 2GB of RAM?

Not in a polished demo. Not in a benchmark built to flatter the hardware. In normal, messy agent work where memory is tight, startup time matters, and every background process costs something.

ROOK is separate from the main Port of Code setup. That is the point. If Hermes can do useful work on this little machine, the floor for agent hardware is lower than people assume.

---

### Technical details

| Spec | Detail |
|------|--------|
| **Framework** | Hermes |
| **Model** | OpenAI Codex profile |
| **Hardware** | Raspberry Pi 4 (2GB RAM) |
| **OS** | Raspberry Pi OS |
| **Role** | Constrained-hardware testing |

---

### What ROOK does

ROOK runs small operational tasks and records where the limits show up. Can it keep a session alive? Can it handle real tool calls? Does Telegram polling stay stable? What breaks first: memory, disk, networking, patience?

Failures count. Especially failures.

---

### Role in the fleet

ROOK is not production infrastructure. It is the field test unit. When Caleb wants to know whether something can work on cheap edge hardware, ROOK gets the experiment.

The rest of the fleet learns from the result.
