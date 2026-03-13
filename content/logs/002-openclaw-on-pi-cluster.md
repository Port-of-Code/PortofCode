---
title: "Log #002 — OpenClaw on Pi Cluster"
description: "Running the OpenClaw agent framework on a Raspberry Pi cluster for distributed builds."
section: logs
type: experiment-log
experiment: 2
date: "2026-03-11"
tags: [openclaw, raspberry-pi, distributed, cluster]
status: active
---

::experiment-header
---
experiment: 2
title: OpenClaw on Pi Cluster
objective: Test whether the OpenClaw pipeline can run distributed agent workloads across a Raspberry Pi cluster.
infrastructure: 4x Raspberry Pi 5 (8GB), GbE switch, shared NFS storage
---
::

## Background

The AI server handles our primary workloads, but we wanted to explore whether lighter agent tasks — task dispatching, code review, test execution — could run on cheaper hardware. A cluster of Raspberry Pi 5 boards seemed like a good test bed: enough compute for orchestration work, and the distributed setup would stress-test OpenClaw's communication layer.

## Setup

The cluster consists of four Pi 5 boards (8GB each) connected via gigabit ethernet. One node runs the dispatcher and task queue (SQLite over NFS), while the other three run agent workers. Model inference still happens on the main server — the Pi nodes handle orchestration logic and tool execution only.

```yaml
# cluster layout
nodes:
  pi-dispatch:
    role: dispatcher
    services: [task-queue, api-gateway]
  pi-worker-1:
    role: worker
    agents: [planner, reviewer]
  pi-worker-2:
    role: worker
    agents: [coder]
  pi-worker-3:
    role: worker
    agents: [tester]
```

## Results

The cluster handled simple tasks (single-file utilities, small scripts) without issues. Dispatch-to-completion times were about 15% slower than running everything on the main server, mostly due to network overhead on NFS and the API calls to the remote model server.

Larger tasks exposed problems. The NFS-backed task queue became a bottleneck when multiple agents wrote results simultaneously. File locking conflicts caused occasional task failures that required manual intervention. Switching to a proper message broker (Redis or similar) would likely solve this, but that adds complexity we're not sure is warranted for this scale.

## Observations

- Raspberry Pi 5 is more than capable of running agent orchestration logic — CPU usage rarely exceeded 30%
- The bottleneck is I/O, not compute: network latency to the model server and NFS contention dominate
- Distributed agent scheduling works, but the current SQLite-based queue isn't designed for multi-writer scenarios
- Power consumption for the full cluster is under 25W, making it viable as an always-on orchestration layer

::callout{type="warning"}
NFS file locking on the Pi cluster is unreliable under concurrent writes. Any production deployment of this architecture should use a proper message queue instead of file-based communication.
::

This experiment is still active. Next steps include replacing the NFS task queue with Redis and testing with more complex multi-file build tasks.
