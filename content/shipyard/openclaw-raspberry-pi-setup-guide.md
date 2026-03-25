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

We run an AI agent on a Raspberry Pi 5 in a home office. It fields Telegram messages, manages tasks, and keeps its own memory files, drawing about 5 watts. No cloud VM bills.

This guide documents that setup. Every command was tested on this hardware, and every pitfall is one we actually hit.

## Why a Raspberry Pi?

A Pi 5 with 8GB RAM costs $95-120. [Micro Center](https://www.microcenter.com/) tends to have the best prices if you're near one. Compare that to a cloud VPS at $20-40/month and the Pi pays for itself in a few months.

It draws 5-10W under load, roughly $10/year in electricity. And your agent's memory, config, and conversation history stay on your hardware.

OpenClaw's Gateway is a Node.js process that routes messages between your channels (Telegram, Discord, etc.) and model APIs (Anthropic, OpenAI, etc.). The LLM inference happens in the cloud. Your Pi just runs the gateway and manages local files, which a Pi 5 handles without breaking a sweat.

## Prerequisites

### Hardware

Here's what we're running:

| Component | Our Setup | Minimum |
|---|---|---|
| Board | Raspberry Pi 5, 8GB RAM | Pi 4 or 5, 2GB+ (4GB recommended) |
| Storage | 256GB Samsung NVMe SSD via M.2 HAT+ | 16GB+ microSD (SSD strongly recommended) |
| Power | Official 27W USB-C PSU | Official Pi power supply |
| Network | Ethernet | Ethernet or WiFi |

Use an NVMe SSD if you can. MicroSD cards are slow and wear out under constant read/write. An NVMe via M.2 HAT+ makes a noticeable difference. We wrote a [Pi 5 NVMe SSD Boot Guide](/shipyard/pi5-nvme-ssd-boot) if you haven't done this yet.

### Software

- Raspberry Pi OS Lite (64-bit). The 64-bit part matters; no desktop needed for a headless server.
- Node.js v24.x (recommended) or v22.16+
- About 30 minutes

## Step 1: Prepare the Pi

If you're starting from scratch, flash Raspberry Pi OS Lite (64-bit) using the [Raspberry Pi Imager](https://www.raspberrypi.com/software/). In the settings dialog, pre-configure:

- Hostname (we use `gateway-host`)
- Enable SSH
- Set username and password
- Configure WiFi if not using Ethernet

If you followed our [NVMe SSD Boot Guide](/shipyard/pi5-nvme-ssd-boot), your Pi is already booted and ready. SSH in:

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

Run the installer script. It handles setup and kicks off the onboarding wizard when it finishes:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

The wizard walks you through:

1. **Model provider & auth.** Pick your AI provider (Anthropic, OpenAI, etc.). The wizard offers OAuth for authentication, which is the easiest path for personal setups. API keys work too.
2. **Default model.** We use Claude Sonnet 4.6 for everyday tasks.
3. **Channel setup.** Connect at least one messaging channel. Telegram is the easiest to start with — you enter your BotFather token here.
4. **Daemon install.** The wizard offers to install the gateway as a systemd service so it starts on boot.

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

The gateway is the always-running process that manages channels, sessions, and tools. Make sure it's configured properly.

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

Your agent's personality, memory, and behavior are defined by markdown files in `~/.openclaw/workspace/`. Everything lives as plain text on your disk.

### Core workspace files

| File | Purpose |
|---|---|
| `SOUL.md` | Personality, tone, values, boundaries |
| `AGENTS.md` | Session startup, memory rules, group chat behavior |
| `IDENTITY.md` | Name, avatar, emoji, role |
| `USER.md` | Info about you (name, timezone, preferences) |
| `TOOLS.md` | Local notes (SSH hosts, device names, env-specific stuff) |
| `MEMORY.md` | Long-term curated memory (private sessions only) |
| `HEARTBEAT.md` | Periodic background task checklist |

### Create your SOUL.md

This is the most important file. Here's a minimal starting point:

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

The more specific you make this, the less your agent sounds like a generic chatbot. Spend time here.

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

If it reads its workspace files and responds in character, you're done. AI agent on a Raspberry Pi, running.

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

The Pi 5 with 8GB RAM handles OpenClaw fine, but a couple of tweaks help:

### Enable Node compile cache

Speeds up repeated CLI invocations noticeably:

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

This sounds obvious, but it's worth saying: just ask your agent. OpenClaw knows its own documentation. Need help configuring a new channel? Not sure how heartbeats work? Paste the error and ask.

I do this constantly. "How do I set up Discord?" or "What's wrong with my heartbeat config?" The agent walks through it, and it's faster than digging through docs.

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

Once your agent is running:

- **Add more channels.** Discord, Slack, WhatsApp. OpenClaw supports [20+ messaging platforms](https://docs.openclaw.ai/channels).
- **Extend with skills, carefully.** Skills add capabilities like web search, calendar integration, etc. Be cautious with third party skills though — they can contain prompt injection. A safer approach: have your agent read the skill's documentation, then build its own version based on what it learned. Reading the recipe instead of eating a stranger's cooking.
- **Set up heartbeats.** Configure your agent to check email, calendar, and notifications on a schedule via `HEARTBEAT.md`.
- **Connect local models.** If you have a machine with a GPU (we use LM Studio on a Dell home server), you can route tasks to local models via OpenAI-compatible endpoints.
- **Build in public.** We're documenting our journey at [portofcode.com](https://portofcode.com). Follow along or start your own.

---

*If you run into issues, check the [OpenClaw docs](https://docs.openclaw.ai) or the [OpenClaw Discord](https://discord.gg/clawd). This guide is maintained at [Port of Code](https://portofcode.com) and tested on the Pi 5 running our agent daily.*
