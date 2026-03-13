# Port of Code — Claude Code Implementation Roadmap (v2)

## Project Summary

**Name:** Port of Code
**Domain:** portofcode.com
**Stack:** Nuxt 3 + Nuxt Content (MDC) + Tailwind CSS → Vercel
**Concept:** An autonomous AI software and content lab. Ideas arrive at the **Port**, the **Fleet** (AI agents) coordinates work, and the **Shipyard** builds everything — software, hardware, infrastructure.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Nuxt 3 | Vue-based, SSG via `nuxt generate` |
| Content | Nuxt Content v3 | MDC — Vue components in Markdown |
| Styling | Tailwind CSS 4 | Custom design tokens for brand palette |
| Fonts | Google Fonts | JetBrains Mono (headings/code), Inter (body) |
| Icons | Lucide Vue | Clean, consistent |
| Deployment | Vercel (hobby tier) | Auto-deploy on push, preview deploys on PRs |
| Package Manager | pnpm | Fast, disk-efficient |

---

## Brand Design Tokens

### Colors

```
Primary:
  navy:        #0B1E2D     backgrounds, headers
  cyan:        #00E5FF     accents, links, highlights
  orange:      #FF7A18     CTAs, badges, emphasis

Secondary:
  steel:       #5A6B7A     muted text, borders
  rust:        #B7410E     secondary accent
  offwhite:    #E8F0F5     light surfaces

Neutral:
  dark:        #0A0F14     page background (dark default)
  darkcard:    #111A23     card surfaces
  muted:       #8A9BAA     secondary text
```

### Typography

```
font-heading:  'JetBrains Mono', monospace
font-body:     'Inter', sans-serif
font-code:     'JetBrains Mono', monospace
```

### Layout

- Prose max-width: 768px
- Grid max-width: 1200px
- Dark theme default
- Card-based content indexes

---

## Site Structure

### Pages

```
/                 Port (homepage) — hub, latest content, section overview
/shipyard         Shipyard — all projects and builds (software, hardware, infra)
/fleet            Fleet — AI agent swarm overview and architecture
/logs             Logs — chronological experiment journal
/about            About — lab mission, who runs it
/[...slug]        Catch-all — renders any content document
```

### Content Organization

```
content/
├── shipyard/
│   ├── _dir.yml
│   ├── building-a-software-factory-with-openclaw.md
│   ├── building-a-600-ai-server.md
│   └── openclaw-agent-orchestration.md
├── fleet/
│   ├── _dir.yml
│   └── designing-an-ai-agent-fleet.md
├── logs/
│   ├── _dir.yml
│   ├── 001-autonomous-blog-pipeline.md
│   └── 002-openclaw-on-pi-cluster.md
└── about.md
```

**Content philosophy:**
- **Shipyard** and **Fleet** are curated reference material — project overviews, architecture docs, build guides. Updated over time.
- **Logs** are dated entries — experiment notes, observations, technical write-ups. Chronological, never edited after publish.

### Frontmatter Schema

```yaml
---
title: "Building a Software Factory with OpenClaw"
description: "Exploring autonomous code generation pipelines."
section: shipyard              # shipyard | fleet | logs
type: experiment-log           # experiment-log | build-guide | architecture-report | launch
experiment: 4                  # optional, for numbered logs
date: 2026-03-15
tags: [openclaw, agents, coding-pipeline]
status: active                 # active | complete | archived
---
```

---

## Implementation Phases

Work through these sequentially. Each phase ends with a working, deployable site. Commit after each phase.

---

### Phase 0 — Project Scaffold

**Goal:** Empty Nuxt 3 project, all tooling configured, builds successfully, connected to Vercel.

**Tasks:**

1. Initialize project:
   ```bash
   pnpm dlx nuxi@latest init portofcode
   cd portofcode
   ```

2. Install dependencies:
   ```bash
   pnpm add @nuxt/content @nuxtjs/tailwindcss @nuxtjs/google-fonts
   ```

3. Configure `nuxt.config.ts`:
   - Enable modules: `@nuxt/content`, `@nuxtjs/tailwindcss`, `@nuxtjs/google-fonts`
   - Google Fonts: JetBrains Mono + Inter
   - SSR enabled (Vercel handles the preset automatically)

4. Configure Tailwind with brand tokens:
   - Custom colors: navy, cyan, orange, steel, rust, offwhite, dark, darkcard, muted
   - Custom font families: heading, body, code
   - Dark background on body by default

5. Create minimal `app.vue` with `<NuxtLayout>` wrapper

6. Create `layouts/default.vue` — bare header, slot, footer

7. Create `pages/index.vue` — placeholder "Port of Code — Coming Soon"

8. Verify locally:
   ```bash
   pnpm run dev
   pnpm run generate
   ```

9. Push to GitHub. Connect repo to Vercel:
   - Framework preset: Nuxt
   - No config needed — Vercel auto-detects Nuxt 3
   - Add custom domain `portofcode.com` in Vercel dashboard, update DNS

**Done when:**
- `pnpm run dev` works locally
- Vercel deploys on push to `main`
- Brand colors and fonts render correctly (e.g., `bg-navy text-cyan` works)
- Site is live at Vercel preview URL (custom domain optional at this stage)

---

### Phase 1 — Layout Shell & Navigation

**Goal:** Full site layout with responsive nav. All pages exist as stubs.

**Tasks:**

1. Build `layouts/default.vue`:
   - **Header:** "Port of Code" wordmark (text-based for v1), horizontal nav on desktop, hamburger on mobile
   - Nav items: Port, Shipyard, Fleet, Logs, About
   - Active link highlighting via `NuxtLink` route matching
   - **Footer:** copyright, tagline "Autonomous AI Software & Content Lab", social links placeholder
   - Styling: `bg-dark text-offwhite`

2. Create stub pages (heading + one-line description each):
   - `pages/index.vue` — "The Port"
   - `pages/shipyard.vue` — "Shipyard — Projects & Builds"
   - `pages/fleet.vue` — "Fleet — AI Agent Swarm"
   - `pages/logs.vue` — "Experiment Logs"
   - `pages/about.vue` — "About Port of Code"

3. Global styles in `assets/css/main.css`:
   - Dark background, light text defaults
   - Prose overrides for Nuxt Content rendered markdown
   - Code block styling (darkcard background, Shiki theme matching brand)
   - Link styling (cyan, underline on hover)
   - Blockquote styling (orange left border)

4. Test responsive behavior: mobile (375px), tablet (768px), desktop (1280px)

**Done when:**
- All 5 routes render with the layout
- Nav highlights active page
- Mobile menu works
- Vercel preview deploy shows the layout correctly

---

### Phase 2 — Content System & Section Pages

**Goal:** Nuxt Content is wired up. Shipyard, Fleet, and Logs pages list their posts. MDC components work in markdown.

**Tasks:**

1. Create `content/` directory structure with `_dir.yml` files per section:
   ```yaml
   # content/shipyard/_dir.yml
   title: Shipyard
   description: Where projects are designed, built, and launched.
   ```

2. Create 2-3 seed posts per section with full frontmatter:
   - Shipyard: software factory post, hardware build post, agent orchestration post
   - Fleet: agent fleet architecture overview
   - Logs: Log #001 and #002 with experiment numbers

3. Build `components/content/PostCard.vue`:
   - Title, description, date, section badge, status indicator
   - Dark card with subtle border, hover glow (cyan)

4. Build section index pages:
   - `pages/shipyard.vue` — section header + grid of PostCards queried from `content/shipyard/`
   - `pages/fleet.vue` — section header + overview content + list of fleet-related posts
   - `pages/logs.vue` — chronological list, experiment numbers prominent ("Log #001"), newest first

5. Build catch-all content page `pages/[...slug].vue`:
   - Uses `<ContentDoc />` to render any markdown file
   - Article header: title, date, section badge, tags
   - Prose constrained to 768px
   - Back navigation link

6. Create MDC components (usable inside markdown via `::component` syntax):
   - `components/content/Callout.vue` — info/warning/experiment callout box
   - `components/content/ExperimentHeader.vue` — formatted log header with experiment number, objective, infrastructure

**Done when:**
- Section pages list their posts dynamically
- Clicking a PostCard navigates to the rendered article
- MDC components render inside markdown
- `pnpm run generate` produces all content pages in static output
- Vercel preview deploy works with content

---

### Phase 3 — Homepage (The Port)

**Goal:** Polished homepage that communicates the brand and surfaces recent content.

**Tasks:**

1. Build `pages/index.vue` sections:

   **Hero:**
   - "Port of Code" in JetBrains Mono, large
   - Tagline: "Autonomous AI Software & Content Lab"
   - One-line mission statement
   - Subtle CSS animation (blinking cursor, pulsing dot, or simple SVG port graphic)

   **Latest Logs:**
   - 3 most recent posts across all sections
   - PostCard grid
   - "View all logs →" link

   **Section Cards:**
   - Two cards (stacked on mobile, side-by-side on desktop):
     - **Shipyard** — description, post count, link → `/shipyard`
     - **Fleet** — description, post count, link → `/fleet`
   - Themed accents per card (orange for Shipyard, cyan for Fleet)

2. Use `queryContent().sort({ date: -1 }).limit(3)` for latest posts

**Done when:**
- Homepage feels polished and on-brand
- Latest content appears dynamically
- Section cards link correctly
- Responsive across all breakpoints

---

### Phase 4 — About Page, Content Polish & SEO

**Goal:** About page complete, seed content refined, meta tags in place.

**Tasks:**

1. About page (via `content/about.md` or `pages/about.vue`):
   - Lab mission statement
   - Who runs it (brief bio)
   - Software factory concept explained
   - Brand metaphor walkthrough: Port → Fleet → Shipyard → Launch
   - Contact / social links

2. Refine all seed posts:
   - Each post should have 2-3 real paragraphs minimum
   - Use MDC components (callouts, experiment headers) in at least one post
   - Validate Shiki syntax highlighting in code blocks

3. Typography audit:
   - Heading hierarchy (h1 page title only, h2/h3 in body)
   - Inline code, blockquotes, lists all styled consistently

4. SEO and meta:
   - `useSeoMeta()` on every page: title, description, og:image
   - Default og:image — a simple branded card (static PNG in `public/`)
   - Install `@nuxtjs/sitemap` for sitemap generation

5. Future-proof images:
   - `public/images/` directory created
   - At least one placeholder image in a post to validate the pipeline

**Done when:**
- About page is complete
- All content reads well and uses MDC components
- Every page has proper meta tags
- Sitemap generates at `/sitemap.xml`

---

### Phase 5 — RSS, 404 & Production Launch

**Goal:** Site is production-ready and live on `portofcode.com`.

**Tasks:**

1. RSS feed:
   - Nuxt server route at `server/routes/feed.xml.ts`
   - All posts from all sections, sorted by date
   - Each entry: title, description, link, pubDate

2. 404 page:
   - Create `error.vue` — branded "Lost at sea?" page
   - Link back to The Port

3. Performance:
   - Lighthouse audit on Vercel preview deploy — target 90+ across all categories
   - Verify fonts load with `display: swap`
   - Confirm no unnecessary client-side JS bundles

4. Custom domain:
   - Verify `portofcode.com` is configured in Vercel
   - HTTPS should be automatic
   - Test `www` redirect behavior

5. Authoring guide:
   - Create `AUTHORING.md` in repo root
   - Document: how to create a post, frontmatter fields, MDC components, local preview, deployment flow

**Done when:**
- RSS feed validates at `/feed.xml`
- 404 page is branded and functional
- Lighthouse > 90
- Live at `portofcode.com`
- `AUTHORING.md` exists

---

## Future Backlog (Post-v1)

Not in scope for initial build. Prioritize as content grows.

- Dark/light mode toggle
- Client-side search (Pagefind or Nuxt Content search)
- Tag index page and filtering
- Newsletter signup (Buttondown, Substack, or self-hosted)
- Fleet dashboard — live or semi-live agent status
- Reading time estimates in post headers
- Auto-generated table of contents for long posts
- Dynamic OG images per post
- Analytics (Plausible or Umami)
- Comments (Giscus)

---

## File Tree (v1 End State)

```
portofcode/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   └── content/
│       ├── Callout.vue
│       ├── ExperimentHeader.vue
│       └── PostCard.vue
├── content/
│   ├── shipyard/
│   │   ├── _dir.yml
│   │   ├── building-a-software-factory-with-openclaw.md
│   │   ├── building-a-600-ai-server.md
│   │   └── openclaw-agent-orchestration.md
│   ├── fleet/
│   │   ├── _dir.yml
│   │   └── designing-an-ai-agent-fleet.md
│   ├── logs/
│   │   ├── _dir.yml
│   │   ├── 001-autonomous-blog-pipeline.md
│   │   └── 002-openclaw-on-pi-cluster.md
│   └── about.md
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   ├── shipyard.vue
│   ├── fleet.vue
│   ├── logs.vue
│   ├── about.vue
│   └── [...slug].vue
├── public/
│   ├── images/
│   └── favicon.ico
├── server/
│   └── routes/
│       └── feed.xml.ts
├── error.vue
├── app.vue
├── nuxt.config.ts
├── tailwind.config.ts
├── package.json
├── pnpm-lock.yaml
├── AUTHORING.md
└── README.md
```

---

## Claude Code Instructions

### Working approach
- Complete phases sequentially — each must build and deploy before moving on
- After each phase: `pnpm run dev` to verify, then `pnpm run generate` to confirm static output
- Commit per phase: `feat: phase 0 — project scaffold`, `feat: phase 1 — layout shell`, etc.

### Nuxt Content patterns

Query content:
```vue
<script setup>
const posts = await queryContent('shipyard').sort({ date: -1 }).find()
</script>
```

Render a document:
```vue
<ContentDoc />
```

MDC in markdown:
```md
::callout{type="info"}
This is an informational callout.
::

::experiment-header
---
experiment: 4
title: Autonomous Coding Agent
objective: Build a software pipeline using OpenClaw.
---
::
```

### Vercel deployment
No special config needed. Vercel auto-detects Nuxt 3. Just push to `main` and it deploys. Preview deploys happen automatically on PR branches.

### Key `nuxt.config.ts` shape
```ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
  ],
  googleFonts: {
    families: {
      'JetBrains Mono': [400, 700],
      'Inter': [400, 500, 600, 700],
    },
  },
  content: {
    highlight: {
      theme: 'github-dark',
    },
  },
  site: {
    url: 'https://portofcode.com',
  },
})
```