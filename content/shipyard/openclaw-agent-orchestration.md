---
title: "OpenClaw Agent Orchestration"
description: "How OpenClaw coordinates multiple AI agents to build software autonomously."
section: shipyard
type: architecture-report
date: "2026-03-12"
tags: [openclaw, agents, architecture]
status: active
---

OpenClaw's orchestration layer is the central nervous system of the software factory. It handles task decomposition, agent assignment, inter-agent communication, and quality gates. This document covers the current architecture and the reasoning behind key design decisions.

## Architecture Overview

The system follows a pipeline pattern with feedback loops. A task enters through the dispatcher, which breaks it into subtasks based on complexity analysis. Each subtask is assigned to a specialized agent:

- **Planner** — Analyzes the spec and produces an implementation plan with file structure, dependencies, and interface definitions
- **Coder** — Takes the plan and writes the actual code, one module at a time
- **Reviewer** — Reads the code against the plan and flags issues, style violations, or potential bugs
- **Tester** — Generates and runs tests, reporting coverage and failures back to the pipeline

When the reviewer or tester finds issues, the task loops back to the coder with specific feedback. This creates a natural convergence toward working software, though it means build times vary depending on code quality in the first pass.

## Communication Model

Agents communicate through a shared SQLite-backed task queue. Each message includes the task context, the agent's output, and metadata about the current pipeline stage. This keeps agents stateless — any agent can pick up any task without needing to know what happened before, because the full context travels with the task.

```
Dispatcher → Planner → Coder → Reviewer → Tester → Done
                         ↑         |          |
                         └─────────┴──────────┘
                         (revision feedback loop)
```

## Current Limitations

The biggest challenge is context window management. Complex tasks generate a lot of context, and agents can lose track of earlier decisions when the context grows. We're experimenting with summarization agents that compress context at each stage, keeping only what the next agent needs.

Another open problem is parallelism. The current pipeline is sequential — each agent waits for the previous one to finish. For larger projects with independent modules, we want agents to work in parallel on different parts of the codebase. The task queue supports this, but the planner doesn't yet produce parallelizable task graphs.
