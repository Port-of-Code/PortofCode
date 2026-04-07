---
title: "Log #006 — Post-Anthropic Agents"
description: "Post-Anthropiclypse: Agent Infrastructure After the Anthropic Ban"
section: logs
type: experiment-log
experiment: 6
date: "2026-04-07"
tags: [hermes, agents, ollama, openai, anthropic, llm-wiki]
status: complete
---


## The Ban

Anthropic recently prohibited third-party agent harnesses (Openclaw, Hermes) from using Claude Pro subscriptions. The new policy forces users to migrate to metered API usage for any agent work outside Anthropic's first-party applications.

For the Port of Code shipyard, this created an immediate problem: **we need predictable costs in our constrained experimentation.** A variable API bill doesn't work for our situation of testing agent workflows on edge hardware on a part-time budget. And I'm sure there are a lot of people in our same shoes.

Time to diversify.

---

## The Search for Alternatives

### Claude Code

**Verdict:** Excellent reasoning, missing the messaging surface, and very limited usage allowance.

Claude Code delivers the core functionality I relied on Hermes and Openclaw for — coding assistance, project memory and documentation, complex reasoning, and writing. Claude is unsurpassed in my humble opinion. There's just something different about working with Opus 4.6. But the convenience of a persistent messaging surface (Telegram, Discord, etc.) that Hermes and Openclaw provided is gone. You're back in the terminal or desktop GUI - which are great by the way. BUT I burn through tokens faster than I ever have - I didn't catch the change to peak hours usage until too late.

For coding and deep reasoning tasks, Claude Code stays in the toolkit. But it's not the primary agent harness for me yet.

### ChatGPT 5.4 (OpenAI)

**Verdict:** Smart, but needs encouragement.

I also signed up for an OpenAI subscription to test ChatGPT 5.4 as a primary agent. The model is very capable, but agentic task completion requires significant prompting and encouragement. It really feels like talking to that genius PHD student that can't get over needing a little extra push to get anything done. 

Still viable as a primary agent, but not a drop-in replacement for the Claude-driven workflows we'd built.

### Local Models (Gemma 4)

**Verdict:** Promising, not ready for agentic work.

I then pivoted to experimenting with local models like the new Google Open Source Gemma 4 models on my local 8GB GPU laptop. The models are impressive for chat and completion, but tool calling and multi-step agentic workflows are rough if not unusable. The hardware constraint (8GB VRAM) also limits model size — we can't host a primary agent locally at the quality level we need.

Local inference stays in the toolkit for support tasks maybe, but not as the main agent.

### Ollama Cloud (Qwen3.5:397b)

**Verdict:** Surprising depth, token-efficient.

After playing with local models, I found Ollama Cloud and tried plugging in the Qwen3.5:397b model as the Hermes primary. This has been a mostly pleasant surprise. The model handles agentic workflows fairly well, and the token economics allow for experimentation without watching the meter too closely or atleast with less worry.

This is now the backup and experimental task agent. When we're testing risky workflows that may burn through tokens, Qwen on Ollama Cloud is the sandbox.

---

## The Hermes 0.7.0 Update

Amid the provider shuffle, Hermes got a major upgrade: **version 0.7.0 now includes Karpathy's LLM Wiki built-in.**

The llm-wiki skill provides persistent, in-context knowledge retrieval — exactly what we need for maintaining institutional memory across sessions. The integration was seamless. No migration headaches, no config overhaul. Just enabled and working.

As Hermes usage grows, the llm-wiki will become more valuable. It's now the shipyard's logbook.

---

## Post-Anthropiclypse Agent Stack

The new primary agent infrastructure:

| Role | Model | Provider | Use Case |
|------|-------|----------|----------|
| High-end reasoning | Claude Code | Anthropic | Complex coding, deep debugging |
| Primary agent | ChatGPT 5.4 | OpenAI | General agentic workflows |
| Backup / experimental | Qwen3.5:397b | Ollama Cloud | Token-heavy trials, resilience testing |

**Hermes 0.7.0** remains the orchestration layer, now with llm-wiki integrated.

---

## Lessons from the Migration

1. **Vendor lock-in is real.** Building agent workflows on a single provider's subscription model creates fragility. Diversify early.

2. **Messaging surfaces are nice to have.** I've grown too accustomed to the convenience of Telegram/Discord integration. Terminal-only agents are still very useful, but I want to be able to trigger tasks or send notes remotely.

3. **Local inference isn't ready for prime time agentic work.** At least not on consumer hardware. Support nodes, yes. Primary agents, not yet.. Unless you have a Mac Studio that can hold the bigger models, which is not in our budget - yet.

4. **Qwen3.5 punches above its weight.** For the cost, it's a viable alternative for non-critical workloads.

5. **Fixed costs enable experimentation.** Metered API pricing changes behavior — I find myself hesitating to experiment. Flat subscriptions gives me a little more peace of mind.

---

## What's Next

The shipyard continues. ROOK is testing Hermes 0.7.0 on the Pi 4 edge node with Qwen3.5 as the primary. Captain Dani is evaluating ChatGPT 5.4 for messaging platform orchestration. Claude Code handles the heavy lifting when we need it.

The Anthropiclypse didn't sink us. It forced us to build a more resilient fleet.

---

