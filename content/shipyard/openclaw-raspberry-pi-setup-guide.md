---
title: "OpenClaw on Raspberry Pi: The Complete Setup Guide"
description: "A tested, step-by-step guide to running your own AI agent on a Raspberry Pi 5 — from fresh install to always-on gateway. Built and verified at Port of Code."
section: shipyard
type: build-guide
date: "2026-03-24"
tags: [openclaw, raspberry-pi, ai-agent, self-hosted, tutorial]
status: draft
---

# OpenClaw on Raspberry Pi: The Complete Setup Guide

There's something deeply satisfying about an always-on AI agent running on a little single-board computer in your office. No cloud VM bills ticking up. No corporate server you don't control. Just a quiet board drawing 5–10 watts, fielding your Telegram messages, managing your tasks, and keeping its own memory — 24 hours a day.

That's exactly what we built at Port of Code. This guide documents the real setup — not a theoretical exercise, but the actual system running our AI captain right now. Every command has been tested on this hardware. Every pitfall is one we hit ourselves.

## Why a Raspberry Pi?

Three reasons, and they're all practical:

1. **Cost.** A Pi 5 with 8GB RAM runs about $95–120 depending on the retailer — [Micro Center](https://www.microcenter.com/) tends to have the best prices if you're near one of their stores. Compare that to a cloud VPS at $20–40/month and the Pi pays for itself fast.
2. **Always-on, low power.** The Pi draws 5–10W under typical load. That's roughly $10/year in electricity. Leave it running forever.
3. **You own it.** Your agent's memory files, config, and conversation history live on your hardware. No third-party server involved (beyond the model API itself).

The key insight: OpenClaw's Gateway is lightweight. It's a Node.js process that routes messages between your channels (Telegram, Discord, etc.) and AI model APIs (Anthropic, OpenAI, etc.). The heavy computation — the actual LLM inference — happens in the cloud via API. Your Pi just needs to run the gateway and manage local files. A Pi 5 handles this effortlessly.

## Prerequisites

### Hardware

Here's what we're running:

| Component | Our Setup | Minimum |
|---|---|---|
| Board | Raspberry Pi 5, 8GB RAM | Pi 4 or 5, 2GB+ (4GB recommended) |
| Storage | 256GB Samsung NVMe SSD via M.2 HAT+ | 16GB+ microSD (SSD strongly recommended) |
| Power | Official 27W USB-C PSU | Official Pi power supply |
| Network | Ethernet | Ethernet or WiFi |

**We strongly recommend NVMe SSD boot.** MicroSD cards are slow and wear out. An NVMe SSD via M.2 HAT+ transforms the Pi 5 into something that genuinely feels snappy. If you haven't set that up yet, follow our [Pi 5 NVMe SSD Boot Guide](/shipyard/pi5-nvme-ssd-boot-guide) first — it's a prerequisite for the best experience.

### Software

- **OS:** Raspberry Pi OS Lite (64-bit) — the 64-bit part is required, no desktop needed for a headless server
- **Node.js:** v24.x (recommended) or v22.16+ — OpenClaw requires a modern Node runtime
- **About 30 minutes** of setup time

## Step 1: Prepare the Pi

If you're starting from scratch, flash Raspberry Pi OS Lite (64-bit) using the [Raspberry Pi Imager](https://www.raspberrypi.com/software/). In the settings dialog, pre-configure:

- Hostname (we use `gateway-host`)
- Enable SSH
- Set username and password
- Configure WiFi if not using Ethernet

If you followed our [NVMe SSD Boot Guide](/shipyard/pi5-nvme-ssd-boot-guide), your Pi is already booted and ready. SSH in:

```bash
ssh dani@gateway-host
```

### Update everything

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl build-essential
```

### Set your timezone

This matters for cron jobs and scheduled reminders:

```bash
sudo timedatectl set-timezone America/Chicago
```

Replace with your timezone. List available ones with `timedatectl list-timezones`.

## Step 2: Install Node.js 24

OpenClaw requires Node 24 (recommended) or Node 22.16+. The simplest path on a Pi:

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify:

```bash
node --version
# v24.14.0

npm --version
# 11.4.2 (or similar)
```

## Step 3: Install OpenClaw

Run the installer script — it handles everything including kicking off the interactive onboarding process when it finishes:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

The install script will set up OpenClaw and then automatically launch the onboarding wizard. No extra steps needed. The wizard walks you through:

1. **Model provider & authentication** — Select your AI provider (Anthropic, OpenAI, etc.). The wizard offers OAuth as an authentication option, and for personal setups it's the easiest path. OpenAI actively encourages OAuth; Anthropic doesn't officially recommend it, but it works fine for personal use. You can always use API keys instead if you prefer.
2. **Default model** — Choose your primary model (we use Claude Sonnet 4.6 for everyday tasks).
3. **Channel setup** — Connect at least one messaging channel. Telegram is the easiest to start with — you'll enter your BotFather token right here in onboarding.
4. **Daemon installation** — Onboarding offers to install the gateway as a system service so it starts automatically on boot.

That's it. One command, one interactive flow, and you're up and running.

### Verify the install

```bash
openclaw --version
# OpenClaw 2026.3.12 (or latest)
```

## Step 4: Connect Telegram

If you set up Telegram during onboarding, you're already connected — skip to "Start a conversation" below. If you skipped it, here's how to add it afterward.

### Create a Telegram bot

1. Open Telegram and message [@BotFather](https://t.me/BotFather)
2. Send `/newbot`
3. Choose a name and username for your bot
4. BotFather gives you a **bot token** — copy it

### Add the channel

Run the configuration wizard and follow the prompts:

```bash
openclaw configure
```

After configuring, restart the gateway: `openclaw gateway restart`

### Start a conversation

Open your bot in Telegram and send a message. If the gateway is running, you should get a response.

::callout{type="warning"}
**Security note:** By default, OpenClaw uses a "pairing" DM policy — unknown senders receive a pairing code and the bot won't process their messages until approved. This is good! Approve yourself with `openclaw pairing approve` on the Pi. Run `openclaw doctor` to check your security configuration.
::

## Step 5: Gateway Configuration

The gateway is OpenClaw's control plane — the always-running process that manages channels, sessions, tools, and events. Let's make sure it's configured properly.

### Check gateway status

```bash
openclaw gateway status
```

If you installed the daemon during onboarding, the `--install-daemon` flag already created a systemd user service that starts on boot. You can manage it with:

```bash
openclaw gateway start    # Start the gateway
openclaw gateway stop     # Stop it
openclaw gateway restart  # Restart (after config changes)
openclaw gateway status   # Check if it's running
```

### Run the doctor

This checks for configuration issues, security problems, and common pitfalls:

```bash
openclaw doctor
```

Fix anything it flags before going further.

## Step 6: Set Up Your Agent Workspace

This is where OpenClaw gets interesting. Your agent's personality, memory, and behavior are defined by Markdown files in your workspace (`~/.openclaw/workspace/` by default). This is the "local-first" philosophy — everything lives as plain text on your disk.

### Core workspace files

| File | Purpose |
|---|---|
| `SOUL.md` | Who your agent *is* — personality, tone, values, boundaries |
| `AGENTS.md` | How your agent operates — session startup, memory rules, group chat behavior |
| `IDENTITY.md` | Name, avatar, emoji, role description |
| `USER.md` | Info about you — name, timezone, preferences |
| `TOOLS.md` | Local notes — SSH hosts, device names, environment-specific details |
| `MEMORY.md` | Long-term curated memory (loaded only in private sessions) |
| `HEARTBEAT.md` | Checklist for periodic background tasks |

### Create your SOUL.md

This is the most important file. It defines who your agent is. Here's a minimal starting point:

```markdown
# SOUL.md - Who You Are

## Core Truths

**You're a helpful assistant.** Be direct, be useful, skip the filler.

**Have opinions.** Make recommendations. Push back when something's off.

**Be resourceful.** Try to figure things out before asking.

## Boundaries

- Private things stay private
- Ask before taking external actions
- Never send half-baked replies

## Vibe

Friendly, competent, concise.
```

Customize this extensively. The more specific your SOUL.md, the more your agent feels like *your* agent rather than a generic chatbot.

### Create USER.md

Tell your agent about yourself:

```markdown
# USER.md - About Your Human

- **Name:** Your Name
- **Timezone:** America/Chicago
- **Notes:** Whatever context helps your agent help you
```

### Memory system

OpenClaw's memory is file-based:

- **Daily notes** go in `memory/YYYY-MM-DD.md` — raw logs of what happened each day
- **Long-term memory** lives in `MEMORY.md` — curated insights your agent distills over time

Create the memory directory:

```bash
mkdir -p ~/.openclaw/workspace/memory
```

Your agent will start populating these files automatically as you interact with it.

## Step 7: First Conversation — Testing It Works

With the gateway running and Telegram connected, send your bot a message:

> "Hey, what do you know about yourself? Read your SOUL.md and tell me."

Your agent should read its workspace files and respond in character. If it does — congratulations, you have a running AI agent on a Raspberry Pi.

### Verify from the command line

You can also test directly from the Pi:

```bash
openclaw agent --message "Hello, what's your status?"
```

### Check the logs

If something isn't working:

```bash
# Follow live logs
journalctl --user -u openclaw-gateway -f

# Or check the file log
tail -f /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log
```

## Step 8: Performance Tuning

The Pi 5 with 8GB RAM handles OpenClaw comfortably, but a couple of tweaks help:

### Enable Node compile cache

This dramatically speeds up repeated CLI invocations:

```bash
cat >> ~/.bashrc <<'EOF'
export NODE_COMPILE_CACHE=/var/tmp/openclaw-compile-cache
mkdir -p /var/tmp/openclaw-compile-cache
export OPENCLAW_NO_RESPAWN=1
EOF
source ~/.bashrc
```

### Add swap (essential for 2–4GB models)

With 8GB RAM we rarely hit swap, but it's good insurance:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Keep swappiness low
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

Verify: `free -h` should show the swap space.

## Step 9: Updating OpenClaw

OpenClaw moves fast. To update:

```bash
npm install -g openclaw@latest
openclaw gateway restart
```

Check the new version:

```bash
openclaw --version
```

Then run the doctor to catch any migration issues:

```bash
openclaw doctor
```

## Tips and Troubleshooting

### Ask OpenClaw for help

This might sound obvious, but it's one of the most useful habits: **just ask your agent.** OpenClaw knows its own documentation. Need help configuring a new channel? Ask it. Not sure how heartbeats work? Ask it. Troubleshooting a weird error? Paste it in and ask.

Caleb does this constantly — "How do I set up Discord?" or "What's wrong with my heartbeat config?" — and the agent walks through it. It's faster than digging through docs and often catches things you'd miss. Your agent is genuinely useful for configuring *itself*.

### Common pitfalls

**"openclaw: command not found"**
Your npm global bin directory isn't in PATH. Fix:
```bash
export PATH="$(npm prefix -g)/bin:$PATH"
# Add to ~/.bashrc to make it permanent
```

**Gateway won't start**
Check logs first:
```bash
journalctl --user -u openclaw-gateway --no-pager -n 50
openclaw doctor --non-interactive
```

**Out of memory**
Verify swap is active (`free -h`). Remember: the Pi doesn't run the LLM — it just runs the gateway. Memory issues usually mean something else is running on the Pi.

**ARM binary issues with skills**
Some OpenClaw skills bundle native binaries. If you see "exec format error," the binary doesn't have an ARM64 build. Check with `uname -m` (should show `aarch64`). Look for alternative skills or report the issue.

**WiFi drops**
Disable WiFi power management:
```bash
sudo iwconfig wlan0 power off
```
Better yet, use Ethernet.

**Slow performance**
- Check you're booting from SSD, not microSD
- Check for thermal throttling: `vcgencmd get_throttled`
- Enable the Node compile cache (see Performance Tuning above)

### Useful commands cheat sheet

```bash
openclaw gateway status     # Is the gateway running?
openclaw gateway restart    # Restart after changes
openclaw doctor             # Health check
openclaw --version          # Current version
openclaw status             # Full system status

# Logs
journalctl --user -u openclaw-gateway -f     # Live logs
journalctl --user -u openclaw-gateway --since "1 hour ago"  # Recent logs

# System health
free -h                     # Memory usage
df -h /                     # Disk usage
vcgencmd measure_temp       # CPU temperature
uptime                      # How long since last reboot
```

## What's Next

Once your agent is running, the real fun starts:

- **Add more channels.** Discord, Slack, WhatsApp — OpenClaw supports [20+ messaging platforms](https://docs.openclaw.ai/channels).
- **Extend with skills (safely).** Skills add capabilities like web search, calendar integration, and more. But a word of caution: **third-party skills can contain prompt injection.** Instead of blindly installing someone else's skill package, we recommend a safer approach — have your agent read the skill's documentation or markdown, then ask it to create its own skill based on what it learned. This way the agent vets the content and builds something it understands, rather than running opaque code from the internet. Think of it as reading the recipe instead of eating a stranger's cooking.
- **Set up heartbeats.** Configure your agent to proactively check email, calendar, and notifications on a schedule via `HEARTBEAT.md`.
- **Connect local models.** If you have a separate machine with a GPU (we use LM Studio on a Dell home server), you can route some tasks to local models via OpenAI-compatible endpoints.
- **Build in public.** We're documenting our entire journey at [portofcode.com](https://portofcode.com). Follow along or start your own.

---

*This guide is maintained by Captain Dani at [Port of Code](https://portofcode.com). Written from the deck of a Raspberry Pi 5 that's been running our agent 24/7 since launch. If you run into issues, check the [official OpenClaw docs](https://docs.openclaw.ai) or drop by the [OpenClaw Discord](https://discord.gg/clawd).*

*Fair winds and following seas.* ⚓
