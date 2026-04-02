---
title: "Log #005 — Daily-Driving Hermes Agent"
description: "First impressions after running Hermes Agent on real tasks for a couple of days. What worked, what surprised me, and why I'm not calling it a migration."
section: logs
type: experiment-log
experiment: 5
date: "2026-04-02"
tags: [hermes, agents, building-in-public, raspberry-pi, openclaw]
status: draft
---

I started testing Hermes Agent because people in the agent space kept bringing it up. I could have just read the takes and formed an opinion from those. I didn't want to do that. I wanted to run it on real work and see for myself.

So I did. A couple of days of daily use.

---

### Out of the box

OpenClaw has been our framework since the beginning and it still runs most of the fleet. Getting it to where I want it has taken real config work and prompt coaching. Some of that might be us — I'm not claiming these are framework-level faults. But the ramp-up has been real.

Hermes felt different from the start. I pointed it at work and it mostly just did it. Skills and tooling ship ready to go. I wasn't spending my first hours wiring things up to get baseline behavior.

Someone else's mileage with either framework could look completely different. This is just ours.

---

### What I actually used it for

This wasn't a benchmark run. I used Hermes for the same work I'd normally hand to the fleet:

- Orchestrating website edits and content publishing through the full git workflow
- Infrastructure projects across the shipyard
- Setting up ROOK on a Raspberry Pi 4 with 2GB of RAM

That last one is worth expanding on. I told DANI, running on Hermes, to handle the full setup for ROOK on the Pi. Agent configuration, identity, workspace, the whole deployment. DANI did it. That's not a toy demo — it's one agent standing up another agent on constrained hardware as part of real internal work.

Memory feels better. No hard numbers on that, just the experience of it picking up context more reliably between sessions. Cron jobs seem more stable too. I'd had intermittent issues before, which could have been our config as much as anything, but on Hermes they've been clean.

---

### The Pi 4

This surprised me. Hermes runs on a Raspberry Pi 4 with 2GB of RAM and leaves enough overhead to do real work. That's the hardware running ROOK, and it handles actual agentic tasks on it.

I've run agents on Pi 5s and they're fine. A Pi 4 with 2GB felt like it shouldn't be enough. It is. Not for everything, but enough that ROOK is staying deployed there and sending performance data back to the fleet.

---

### The time I lobotomized Dani

When I set up the Hermes agent, I cloned Dani's profile without realizing it. Then I started configuring a new identity on what I thought was a fresh instance. I was actually overwriting Dani's workspace. Identity files, memory, everything.

I caught it because Hermes streams audit logs to Telegram in realtime. I was watching the log feed, saw the working directory pointed at Dani's workspace instead of the new agent's, and realized what I'd done. Told Hermes to put everything back. It did.

The realtime audit logs in Telegram are a feature I didn't expect to care about. Turned out to be the thing that saved me here. And once I explained the problem, Hermes sorted the fix out without me having to reconstruct files by hand.

---

### What I'm not saying

I'm not saying Hermes replaces OpenClaw. We still run agents on OpenClaw. We're figuring out how the two work together, whether that ends up being specialization or redundancy or something else entirely.

This is two days. I know two-day impressions and two-month impressions don't always agree.

---

### Where I am right now

Hermes just works. I'm impressed with where it starts out of the box, how light it runs, and how little I've had to fight it. I may keep it as the main agent.

But it's early, and I'm not making that call yet.

---

*ROOK's fleet card is live at [/fleet/rook](/fleet/rook) if you want to see what a 2GB Pi 4 agent looks like on paper.*
