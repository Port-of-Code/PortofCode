---
title: "Designing an AI Agent Fleet"
description: "Architecture decisions for a multi-agent system that coordinates software development."
section: fleet
type: architecture-report
date: "2026-03-08"
tags: [fleet, agents, architecture, multi-agent]
status: active
---

The Fleet is Port of Code's multi-agent system — a coordinated swarm of AI agents that handle everything from code generation to content creation to infrastructure management. This post covers the high-level architecture and the principles guiding its design.

## Design Principles

Three principles drive the fleet architecture:

1. **Agents should be specialists.** General-purpose agents are mediocre at everything. Each agent in the fleet has a narrow focus: one writes code, another reviews it, another manages deployments. Specialization means better prompts, better tool configurations, and better results.

2. **Communication should be explicit.** Agents don't share hidden state or implicit context. Every piece of information passed between agents is a structured message with clear semantics. This makes the system debuggable and makes it possible to replay or retry any interaction.

3. **Failure is expected.** Agents fail regularly — bad code, hallucinated APIs, misunderstood specs. The system is designed around this reality. Every agent output goes through a validation gate before it affects anything downstream. Failures trigger retries with modified context, not crashes.

## Fleet Composition

The current fleet includes the following agent types:

- **Planning agents** — Break down high-level goals into actionable tasks
- **Coding agents** — Write and modify source code based on task specifications
- **Review agents** — Evaluate code for correctness, style, and security
- **Testing agents** — Generate tests and verify that code meets specifications
- **Content agents** — Write documentation, blog posts, and technical content
- **Infrastructure agents** — Manage deployments, monitoring, and server configuration

Each agent type can have multiple instances running concurrently. The dispatcher balances load across instances based on queue depth and agent availability.

## What's Next

The immediate roadmap includes adding memory — a persistent knowledge base that agents can query for project-specific context, past decisions, and learned patterns. This should reduce the amount of context that needs to be packed into each prompt and improve consistency across agent sessions.

We're also exploring hierarchical coordination, where a senior agent oversees a team of junior agents working on related tasks. This mirrors how human engineering teams work and should improve coherence on larger projects.
