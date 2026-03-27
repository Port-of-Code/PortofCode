---
title: "Log #005 — Paperclip: Running Companies on Autopilot"
description: "A look at Paperclip, the open-source framework for orchestrating AI agents like a real company—org charts, budgets, and all."
section: logs
type: experiment-log
experiment: 5
date: "2026-03-27"
tags: [ai-agents, orchestration, paperclip, tools, autonomous-companies]
status: draft
---

Every week something new lands that makes the Port of Code thesis feel less like a bet and more like a foregone conclusion. This week it was Paperclip.

Paperclip is an open-source framework for running businesses staffed entirely by AI agents. Not a workflow tool. Not a prompt manager. A company operating system — with org charts, budget caps, goal alignment, and a governance layer so you stay in control.

It racked up 14,000 GitHub stars in its first week. That number alone tells you the idea resonated.

## The mental model shift

Most AI tools are task-oriented. You prompt, you get output, you move on. Paperclip flips that. Instead of "I am prompting an AI," the frame becomes "I am managing a team."

That's a bigger shift than it sounds. When you think of an agent as an employee, you start asking different questions: What is this agent's job? Who does it report to? What's its budget? What happens when it hits that budget?

Paperclip gives you structure to answer all of those.

## How it works

The setup is three steps:

1. **Define the goal.** Something like: *"Ship a content calendar for Port of Code's Q2 blog."*
2. **Hire the team.** Assign agents to roles — a content lead, a researcher, a scheduler. Each role gets a job description and a reporting line.
3. **Approve and run.** Review the strategy your CEO agent proposes, set budget limits, and let the org chart do its work.

Under the hood it's a Node.js server with a React dashboard. You can monitor tasks, trace conversations, watch token costs, and pause or terminate any agent at any time. Every decision gets logged. Full audit trail.

The heartbeat system is what keeps agents alive between tasks — they wake on a schedule, check their work queue, act, and go back to sleep. Sound familiar? It should. Dani runs on heartbeats too.

## What it is and isn't

Paperclip is explicit about its scope:

- **Not an agent framework.** It doesn't build agents or write prompts. You bring your own.
- **Not a workflow builder.** No drag-and-drop pipelines. It models a company — mission, projects, tasks — and lets delegation flow naturally through the org chart.
- **Not a prompt manager.** Agents bring their own models and runtimes. Paperclip manages the organization they work inside.

That restraint is smart. By staying at the orchestration layer, it stays compatible with everything: Claude Code, Codex, Cursor, OpenClaw, custom scripts. If it can receive a heartbeat, it's hired.

## The Port of Code take

We're not plugging Paperclip in tomorrow. At current scale — one shipwright, one captain — the overhead isn't justified yet. When you're running a crew of two, you don't need an HR department.

But the trajectory is obvious. Once Port of Code is running dedicated agents for content, code review, research, and customer work, coordinating them manually won't scale. That's when something like Paperclip becomes the natural next layer.

The piece I find most compelling is goal alignment. Right now, every time Dani starts a new session, I load context files to explain what we're building and why. Paperclip bakes that chain into the architecture: every task traces back to a project, every project traces back to the mission. Agents always know what they're doing and *why they're doing it*.

That's not a nice-to-have. That's the difference between a crew that rows and a crew that rows *in the same direction*.

## Worth watching

Paperclip is brand new and some features — Clipmart, their marketplace for pre-built company templates — are still incoming. It'll take a few months to see how it holds up under real workloads.

But the framing is right, the timing is right, and the community response suggests a lot of people were waiting for exactly this. We'll be keeping tabs on it as the shipyard grows.

If you're already running multiple agents across different runtimes, it's worth a spin. The quickstart is a single command:

```bash
npx paperclipai onboard --yes
```

One org chart for your whole AI crew. Not bad for a week-old project.
