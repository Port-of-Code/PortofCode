---
title: "Log #004 — The Research Trawler"
description: "How we built an automated content research pipeline using Gemini CLI, a Raspberry Pi, and zero extra dollars."
section: logs
type: experiment-log
experiment: 4
date: "2026-03-26"
tags: [gemini-cli, research, automation, raspberry-pi, building-in-public, content-strategy]
status: draft
---

Every blog needs a content strategy. Most people solve this with a spreadsheet, some gut instinct, and a vague plan to "write about what I know." That's what I was doing until yesterday.

I can write fine. The hard part is figuring out *what* to write. What's actually trending? What are people searching for that nobody's answering well? That kind of research takes hours, and I have a day job and a Pi.

So Dani and I built a research trawler.

---

### The problem with using Claude for everything

Claude is our workhorse. Dani runs on it, writes with it, thinks with it. We use a Claude Pro subscription, which is great until you hit the rate limits. Using Claude to research content ideas means burning through those limits on work that's mostly "go read the internet and tell me what you find." If you're on the API instead, that's real money per query.

Either way, we needed a cheaper scout. Something that could go wide, scan a bunch of sources, and bring back raw intel. Claude could then do what it's good at: analyzing that intel and making recommendations.

Gemini CLI turned out to be that scout.

---

### Gemini CLI

Google's [Gemini CLI](https://github.com/google-gemini/gemini-cli) dropped recently. It's a command line tool that gives you access to Gemini's models, and the free tier gets you 1,000 requests per day and 60 per minute. For research queries, that's plenty.

Installation:

```bash
npm install -g @google/gemini-cli
```

First run walks you through Google auth. After that, you can pipe prompts straight from the terminal:

```bash
gemini -p "What are the trending topics in AI agents this week?"
```

It's not as sharp as Claude for nuanced analysis, but for broad scanning it works well. And it costs nothing.

---

### The research scripts

We built two shell scripts that run as daily cron jobs on the Pi.

`daily-research.sh` runs three queries:

1. Daily pulse, covering the last 24-48 hours across AI agents, self-hosted AI, OpenClaw, Raspberry Pi, and the indie hacker scene
2. Content opportunities, pulling five fresh topics from Reddit, Hacker News, and Stack Overflow, each tagged with a keyword, timing, suggested angle, and competition level
3. Everyday AI, a newer addition scanning for questions non-technical users are asking about AI assistants, home automation, and personal productivity

`daily-product-research.sh` runs three more:

1. Pain points from developer communities (HN, Reddit, Twitter), assessed for impact and whether a small team could build a solution
2. Launch analysis of recent successful indie launches on Show HN and Product Hunt
3. Product gaps, meaning specific software ideas that don't exist yet or exist poorly, each with a revenue model and MVP scope

The scripts are simple bash:

```bash
#!/bin/bash
set -euo pipefail

RESEARCH_DIR="/home/dani/.openclaw/workspace/research"
TIMESTAMP=$(date +%Y-%m-%d)
RUN_DIR="${RESEARCH_DIR}/runs/${TIMESTAMP}"

mkdir -p "$RUN_DIR"

# Skip if already ran today
if [ -f "${RUN_DIR}/daily-pulse.md" ]; then
  echo "Already ran for ${TIMESTAMP}, skipping."
  exit 0
fi

# Each query pipes Gemini output to a markdown file
gemini -p "Your research prompt here..." \
  > "${RUN_DIR}/daily-pulse.md" 2>/dev/null

gemini -p "Another research prompt..." \
  > "${RUN_DIR}/daily-opportunities.md" 2>/dev/null
```

Each query saves its output as a markdown file in a date-stamped directory.

---

### The cron schedule

OpenClaw has built-in cron support, so scheduling was a one-liner. Blog research runs at 7:00 AM, product research at 7:30 AM, both Central time.

By the time I'm having coffee, the research is done. I ask Dani for a brief and get a summary of everything. Here's what this morning's looked like (the first full run):

- GitHub Copilot is changing its training data policy, possible blog angle on developer privacy
- Claude Code shipped an autonomous mode, "copilot to autopilot" narrative
- A solo founder sold his 6-month-old company for $80M, case study material
- Multi-agent orchestration patterns showing up as a content opportunity (low competition)
- A semantic business logic linter as a potential product gap (clear revenue path)

That took zero manual research. The Pi did it while I slept.

---

### What it costs

Nothing extra. Gemini CLI runs on the free tier. The Pi was already on 24/7 for OpenClaw. The cron jobs are built into the framework. The only added cost is Dani summarizing the results over Claude, which barely dents our rate limits since it's just reading a few markdown files. If you're on the API, that summary step would run a few cents per morning.

For context, an SEO tool subscription runs $50-200/month. Manually scanning Reddit and HN takes a couple hours a week. This does both jobs for free.

---

### What we learned

Pairing models by their strengths works. Claude is powerful but rate-limited (or expensive on the API). Gemini is free and broad. Using Gemini to gather and Claude to analyze gets you good results without burning through your limits or your budget.

Six targeted queries with specific output formats beat one massive "tell me everything" prompt. Each query has a job. Each output has a format. That makes the downstream analysis way faster.

The first version of these scripts took about an hour to write. They're not elegant. The prompts could be tighter. But they ran this morning and produced results I actually used. We'll iterate.

---

### What's next

The pipeline is running. Now we need to close the loop.

First, a topic tracker. Right now Dani reads raw reports every morning. A scored JSON file that ranks and prioritizes topics across runs would be better. If the same topic shows up three days in a row, it's probably worth writing about.

Second, we just added the "Everyday AI" research lane and want to build a whole blog section around it. Guides aimed at people who want to use AI assistants but aren't developers. More smart home blog, less Hacker News.

We'll see what the nets drag in.

Fair winds. ⚓
