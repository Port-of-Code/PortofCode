---
title: "Building a $600 AI Server"
description: "Assembling a budget home server for running local AI models and agent workloads."
section: shipyard
type: build-guide
date: "2026-03-10"
tags: [hardware, homelab, server]
status: active
---

Running AI workloads in the cloud gets expensive fast. For the kind of iterative, always-on agent work we do at the lab, a local server makes more sense. The goal was to build something capable of running 7B-13B parameter models comfortably, with room for concurrent agent processes, all for under $600.

## Parts List

| Component | Choice | Cost |
|-----------|--------|------|
| CPU | AMD Ryzen 5 5600 | $85 |
| Motherboard | B550M Pro-VDH | $90 |
| RAM | 64GB DDR4-3200 (2x32GB) | $95 |
| GPU | NVIDIA RTX 3060 12GB (used) | $180 |
| Storage | 1TB NVMe SSD | $65 |
| PSU | 650W 80+ Bronze | $55 |
| Case | Fractal Focus G Mini | $50 |
| **Total** | | **$620** |

We went slightly over budget but the 12GB VRAM on the 3060 was worth it. Most 7B models fit entirely in VRAM, and 13B models run with partial offloading at acceptable speeds for development work.

## Software Stack

The server runs Ubuntu Server 24.04 with `ollama` for model serving and a custom agent runtime built on top of it. Docker handles isolation between different agent workloads. Monitoring runs through a lightweight Grafana + Prometheus stack to track GPU utilization and inference latency.

The key insight was that for agent orchestration work, inference latency matters less than throughput. Multiple agents can share the same model server, each making requests as needed, and the queue handles the rest. A single RTX 3060 can comfortably serve 3-4 concurrent agent sessions running a 7B model.

::callout{type="experiment"}
We're currently testing whether a second used GPU (another 3060 or a P40) would meaningfully improve throughput for larger model workloads. Early results suggest the bottleneck is more often memory than compute.
::
