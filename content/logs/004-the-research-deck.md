---
title: "Log #004 — The Research Deck"
description: "How we built an automated content research pipeline using Gemini CLI, a Raspberry Pi, and zero extra dollars."
section: logs
type: experiment-log
experiment: 4
date: "2026-03-26"
tags: [gemini-cli, research, automation, raspberry-pi, building-in-public, content-strategy]
status: draft
---

Every blog needs a content strategy. Most people solve this with a spreadsheet, some gut instinct, and a vague plan to "write about what I know." That's what I was doing until yesterday.

The problem isn't writing — it's knowing *what* to write. What's trending in our niche? What questions are people asking? What topics have low competition but high interest? Figuring that out manually takes hours, and I don't have hours. I have a day job and a Pi.

So Dani and I built a research deck.

---

### The Problem with Using Claude for Everything

Claude is our workhorse. Dani runs on it, writes with it, thinks with it. But using Claude to research content ideas means burning tokens on work that's mostly "go read the internet and tell me what you find." That's expensive exploration for a bootstrapped operation.

What we needed was a cheaper scout — something that could go wide, scan the landscape, and bring back raw intel. Claude could then do what it's actually good at: analyzing that intel, spotting patterns, and making recommendations.

Enter Gemini CLI.

---

### Gemini CLI: The Free Research Scout

Google's [Gemini CLI](https://github.com/google-gemini/gemini-cli) dropped recently and it's exactly what we needed. It's a command-line tool that gives you access to Gemini's models. The free tier gets you 1,000 requests per day and 60 per minute. For research queries, that's more than enough.

Installation was straightforward:

```bash
npm install -g @google/gemini-cli
```

First run walks you through Google auth. After that, you can pipe prompts straight from the terminal:

```bash
gemini -p "What are the trending topics in AI agents this week?"
```

It's not as sharp as Claude for nuanced analysis, but for casting a wide net? It's solid. And it's free.

---

### The Research Scripts

We built two shell scripts that run as daily cron jobs on the Pi.

**Blog Research** (`daily-research.sh`) runs three queries:

1. **Daily Pulse** — What happened in the last 24-48 hours across AI agents, self-hosted AI, OpenClaw, Raspberry Pi, and the indie hacker scene. Quick hits: what happened, why it matters, any blog angles.

2. **Content Opportunities** — Five fresh topics pulled from Reddit, Hacker News, and Stack Overflow discussions. Each one tagged with a keyword, why it's timely, a suggested angle, and competition level.

3. **Everyday AI** — A newer addition. We're expanding into content for semi-technical and non-technical users, so this query scans for questions regular people are asking about AI assistants, home automation, and personal productivity.

**Product Research** (`daily-product-research.sh`) runs three more:

1. **Pain Points** — Developer frustrations and complaints from HN, Reddit, and Twitter. Each one assessed for how many people are affected and whether a small team could build a solution.

2. **Launch Analysis** — Recent successful indie launches on Show HN and Product Hunt. What worked, what patterns keep showing up, what we can learn.

3. **Product Gaps** — Specific software ideas that don't exist yet or exist poorly. Each one with a revenue model, build estimate, and MVP scope.

The scripts are simple bash. Here's the structure:

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

Each query saves its output as a markdown file in a date-stamped directory. Clean, organized, and easy to review later.

---

### The Cron Schedule

OpenClaw has built-in cron support, so scheduling was a one-liner. The blog research runs at 7:00 AM, product research at 7:30 AM. Both are set to Central time.

By the time I'm having my morning coffee, the research is done. I ask Dani for a brief, and I get a summary of everything — notable news, top content opportunities, pain points worth exploring, successful launches to learn from.

Here's what this morning's brief looked like (the first full run):

- GitHub Copilot is changing its training data policy — blog angle on developer privacy
- Claude Code shipped an autonomous mode — "copilot to autopilot" narrative
- A solo founder sold his 6-month-old company for $80M — case study material
- Top content opportunity: multi-agent orchestration patterns (low competition)
- Top product gap: a semantic business logic linter (clear revenue path)

That took zero manual research. The Pi did it while I slept.

---

### What It Costs

Nothing extra. Gemini CLI runs on the free tier. The Pi was already running 24/7 for OpenClaw. The cron jobs are built into the framework. The only cost is the Claude API calls when Dani summarizes the results, and that's a few cents per morning.

Compare that to hiring a content strategist, paying for an SEO tool, or spending two hours a week manually scanning Reddit. This setup replaced all of it.

---

### What We Learned

**Use the right model for the right job.** Claude is expensive and sharp. Gemini is free and wide. Pairing them — Gemini for gathering, Claude for analysis — gives you the best of both without the cost of either.

**Automate the boring parts.** Research isn't creative work. It's pattern matching across a lot of sources. Computers are better at that than I am, especially at 7 AM.

**Structure beats volume.** Six targeted queries with specific output formats produce better results than one massive "tell me everything" prompt. Each query has a job. Each output has a schema. That makes the downstream analysis faster and more useful.

**Ship it rough, then refine.** The first version of these scripts took about an hour to write. They're not elegant. The prompts could be tighter. But they ran this morning and produced actionable results. We'll iterate.

---

### What's Next

The research pipeline is running. Now we need to close the loop:

- **Topic tracker** — A JSON file that scores and prioritizes topics across runs. Instead of reading raw reports every day, Dani will maintain a ranked backlog of content ideas.
- **Trend detection** — Comparing today's results to yesterday's. If the same topic shows up three days in a row, it's probably worth writing about.
- **Everyday AI content** — We just added this research lane. The goal is a new section on the blog aimed at people who want to use AI assistants but aren't developers. Guides that read like a smart home blog, not Hacker News.

The research deck is open. Let's see what it finds.

Fair winds. ⚓
