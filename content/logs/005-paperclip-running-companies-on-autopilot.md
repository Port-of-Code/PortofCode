---
title: "Log #005 — Paperclip: Running Companies on Autopilot"
description: "A look at Paperclip, the open-source framework for running a business with AI agents — org charts, budgets, and a full governance layer."
section: logs
type: experiment-log
experiment: 5
date: "2026-03-27"
tags: [ai-agents, orchestration, paperclip, tools, autonomous-companies]
status: draft
---

Every week something lands that makes the Port of Code thesis feel less like a bet. This week it was Paperclip.

It's an open-source framework for running businesses staffed by AI agents. Not a workflow tool, not a prompt manager. More like a company operating system: org charts, budget caps, goal alignment, governance layer. It hit 14,000 GitHub stars in its first week, which tells you the idea touched a nerve.

## The mental model shift

Most AI tools are task-oriented. You prompt, you get output, you move on. Paperclip changes the frame. Instead of "I am prompting an AI," you're managing a team.

That shift matters because it changes what you ask. When an agent is an employee, the relevant questions become: What's this agent's job? Who does it report to? What happens when it burns through its budget?

Paperclip gives you structure to answer those.

## How it works

Three steps. Define a goal — something like "ship a content calendar for Q2." Assign agents to roles (content lead, researcher, scheduler), each with a job description and reporting line. Review whatever strategy your CEO agent drafts, set budget limits, and run it.

Under the hood: Node.js server, React dashboard. You can monitor tasks, trace conversations, watch token costs, and kill any agent at any time. Full audit log throughout.

The heartbeat system keeps agents active between tasks. They wake on a schedule, check their queue, act, and go idle. If you've been following along here, that should sound familiar — Dani runs the same way.

## What it is and isn't

Paperclip doesn't build agents or write prompts. You bring your own. There's no drag-and-drop pipeline builder. It models a company (mission, projects, tasks) and lets delegation flow through the org chart.

That's a deliberate call, and it's the right one. By staying at the orchestration layer, it works with anything: Claude Code, Codex, Cursor, OpenClaw, bash scripts. Their tagline puts it plainly: "If it can receive a heartbeat, it's hired."

## The Port of Code take

We're not plugging Paperclip in tomorrow. Right now it's one shipwright and one captain — the overhead doesn't make sense at this scale.

But at some point Port of Code will have dedicated agents for content, code review, research, and client work. Coordinating all of that by hand won't hold. That's when something like this earns its place.

The thing I keep coming back to is goal alignment. Every time Dani starts a new session, I load context files explaining what we're building and why. Paperclip bakes that chain into the architecture. Task traces to project, project traces to mission. Agents know what they're working on and why it matters, without me having to re-explain it every time.

That's not a nice-to-have. That's the whole problem we're quietly fighting against every day.

## Worth watching

Clipmart, their marketplace for pre-built company templates, is still in the works. The project is barely a week old and hasn't seen much real-world stress testing yet.

Still, the community response was immediate. People were waiting for exactly this framing. That counts for something.

If you're already juggling multiple agents across different runtimes, the quickstart is a single command:

```bash
npx paperclipai onboard --yes
```

One org chart for your whole AI crew. Not bad for a week-old project.
