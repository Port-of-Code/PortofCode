# Authoring Guide

How to create and publish content on Port of Code.

## Creating a Post

1. Choose the right section:
   - **`content/shipyard/`** — Project overviews, build guides, architecture docs. Curated reference material, updated over time.
   - **`content/fleet/`** — AI agent architecture, fleet coordination, multi-agent system design.
   - **`content/logs/`** — Dated experiment entries. Chronological, never edited after publish.

2. Create a new `.md` file in the appropriate directory. Use kebab-case for filenames:
   - `content/shipyard/my-new-project.md`
   - `content/logs/003-experiment-name.md`

## Frontmatter

Every post needs frontmatter at the top of the file:

```yaml
---
title: "Your Post Title"
description: "A one-line summary of the post."
section: shipyard              # shipyard | fleet | logs
type: build-guide              # experiment-log | build-guide | architecture-report | launch
date: "2026-03-15"
tags: [tag1, tag2, tag3]
status: active                 # active | complete | archived
---
```

For log entries, add the experiment number:

```yaml
experiment: 3
```

## MDC Components

You can use Vue components inside markdown using MDC syntax.

### Callout

```md
::callout{type="info"}
This is an informational callout.
::

::callout{type="warning"}
This is a warning callout.
::

::callout{type="experiment"}
This is an experiment-related callout.
::
```

Types: `info` (cyan), `warning` (orange), `experiment` (rust).

### Experiment Header

For log entries, add a structured header:

```md
::experiment-header
---
experiment: 3
title: My Experiment
objective: What we're trying to achieve.
infrastructure: "Hardware and tools used"
---
::
```

## Images

Place images in `public/images/` and reference them in markdown:

```md
![Alt text](/images/my-image.png)
```

## Local Preview

```bash
pnpm run dev
```

Opens the site at `http://localhost:3000`. Content changes are hot-reloaded.

## Building

```bash
pnpm run build
```

Verifies the full build succeeds.

## Deployment

Push to `main` on GitHub. Vercel auto-deploys on every push. Preview deploys happen on PR branches.

## Content Conventions

- Shipyard and Fleet posts are living documents — update them as projects evolve
- Log entries are immutable after publish — append new logs, don't edit old ones
- Use experiment numbers sequentially for logs (001, 002, 003...)
- Keep descriptions under 160 characters for good SEO snippets
- Use h2 and h3 headings in post body (h1 is reserved for the page title)
