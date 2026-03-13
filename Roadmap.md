# Port of Code — Claude Code Implementation Roadmap

## Project Summary

**Name:** Port of Code
**Domain:** portofcode.com
**Stack:** Nuxt 3 + Nuxt Content (MDC) → static generation → GitHub Pages
**Repo:** `portofcode/portofcode.github.io` (or similar)

Port of Code is an autonomous AI software and content lab. The site uses a nautical/industrial metaphor: ideas arrive at the **Port**, the **Fleet** (AI agents) coordinates work, the **Shipyard** builds software, and the **Dockyard** provides hardware infrastructure. Content is authored as experiment logs, build guides, and architecture reports.

---

## Tech Stack Decisions

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Nuxt 3** | Vue-based, SSG via `nuxt generate`, familiar to owner |
| Content | **Nuxt Content v3** | MDC (Markdown Components) — Vue components in `.md` files, similar to MDX |
| Styling | **Tailwind CSS 4** + custom design tokens | Utility-first, easy to enforce brand palette |
| Fonts | **Google Fonts** — JetBrains Mono (headings/code), Inter (body) | Matches brand spec |
| Icons | **Lucide Vue** or **Iconify** | Clean, consistent icon set |
| Deployment | **GitHub Pages** via GitHub Actions | Free static hosting, CDN-backed |
| Package Manager | **pnpm** | Fast, disk-efficient |

---

## Brand Design Tokens

These tokens should be configured in Tailwind and reused across all components.

### Colors

```
Primary:
  navy:        #0B1E2D   (backgrounds, headers)
  cyan:        #00E5FF   (accents, links, highlights)
  orange:      #FF7A18   (CTAs, experiment badges, emphasis)

Secondary:
  steel:       #5A6B7A   (muted text, borders)
  rust:        #B7410E   (warnings, secondary accent)
  offwhite:    #E8F0F5   (light backgrounds, card surfaces)

Neutral:
  dark:        #0A0F14   (page background — dark mode default)
  darkcard:    #111A23   (card/surface background)
  muted:       #8A9BAA   (secondary text)
```

### Typography

```
font-heading:  'JetBrains Mono', monospace
font-body:     'Inter', sans-serif
font-code:     'JetBrains Mono', monospace
```

### Spacing / Layout

- Max content width: 768px (prose), 1200px (grid layouts)
- Default dark theme (navy/dark background, light text)
- Card-based layout for content indexes

---

## Site Architecture

### Navigation

```
Port (/)                — Homepage / hub
Shipyard (/shipyard)    — Software factory posts
Dockyard (/dockyard)    — Hardware & infrastructure posts
Fleet (/fleet)          — AI agent architecture docs
Logs (/logs)            — Chronological experiment logs
About (/about)          — Lab mission, who runs it
```

### Content Directory Structure

```
content/
├── shipyard/           # Software factory articles
│   ├── _dir.yml        # Section metadata (title, description)
│   └── building-a-software-factory-with-openclaw.md
├── dockyard/           # Hardware & infra articles
│   ├── _dir.yml
│   └── building-a-600-ai-server.md
├── fleet/              # Agent architecture docs
│   ├── _dir.yml
│   └── designing-an-ai-agent-fleet.md
├── logs/               # Experiment logs (numbered)
│   ├── _dir.yml
│   └── 001-autonomous-blog-pipeline.md
└── about.md            # About page content
```

### Frontmatter Schema (all content types)

```yaml
---
title: "Building a Software Factory with OpenClaw"
description: "Experiment log exploring autonomous code generation pipelines."
section: shipyard          # shipyard | dockyard | fleet | logs
type: experiment-log       # experiment-log | build-guide | architecture-report | launch
experiment: 4              # optional — experiment number for logs
date: 2026-03-15
tags: [openclaw, agents, coding-pipeline]
status: active             # active | complete | archived
---
```

---

## Implementation Phases

Each phase is a self-contained unit of work. Complete each phase fully before moving to the next. Every phase ends with a working, deployable site.

---

### Phase 0 — Project Scaffold

**Goal:** Empty Nuxt 3 project with all tooling configured, builds to static, deploys to GitHub Pages.

**Tasks:**

1. Initialize Nuxt 3 project with pnpm
   ```bash
   pnpm dlx nuxi@latest init portofcode
   cd portofcode
   ```

2. Install core dependencies
   ```bash
   pnpm add @nuxt/content @nuxtjs/tailwindcss @nuxtjs/google-fonts
   ```

3. Configure `nuxt.config.ts`:
   - Enable `@nuxt/content`, `@nuxtjs/tailwindcss`, `@nuxtjs/google-fonts`
   - Set `ssr: true` and `nitro.preset: 'github-pages'` (or `'static'`)
   - Configure Google Fonts: JetBrains Mono + Inter
   - Set `app.baseURL` if deploying to a subdirectory

4. Configure Tailwind with brand design tokens:
   - Custom colors (navy, cyan, orange, steel, rust, offwhite, dark, darkcard, muted)
   - Custom font families (heading, body, code)
   - Default dark background on `body`

5. Create `app.vue` with a `<NuxtLayout>` wrapper

6. Create `layouts/default.vue` with:
   - Minimal header (site name + nav links)
   - `<slot />` for page content
   - Minimal footer

7. Create `pages/index.vue` with placeholder text ("Port of Code — Coming Soon")

8. Verify static generation works:
   ```bash
   pnpm run generate
   ```
   Confirm output in `.output/public/` or `dist/`

9. Create `.github/workflows/deploy.yml` for GitHub Pages deployment:
   - Trigger on push to `main`
   - Steps: checkout → setup Node → pnpm install → `nuxt generate` → deploy to GitHub Pages

**Acceptance criteria:**
- `pnpm run dev` serves the site locally
- `pnpm run generate` produces a static `dist/` or `.output/public/` folder
- GitHub Actions workflow file exists (can be tested after first push)
- Tailwind classes using brand tokens work (e.g., `bg-navy`, `text-cyan`)
- Fonts load correctly

---

### Phase 1 — Layout Shell & Navigation

**Goal:** Full site layout with responsive navigation, styled to brand spec. All section pages exist as stubs.

**Tasks:**

1. Build `layouts/default.vue`:
   - **Header:** Port of Code wordmark/logo (text-based is fine for v1), horizontal nav for desktop, hamburger menu for mobile
   - Nav items: Port, Shipyard, Dockyard, Fleet, Logs, About
   - Active link highlighting using `NuxtLink` and route matching
   - **Footer:** Copyright, tagline ("Autonomous AI Software & Content Lab"), social links placeholder
   - Dark theme by default: `bg-dark text-offwhite`

2. Create stub pages (each with just a heading and one-line description):
   - `pages/index.vue` — "The Port"
   - `pages/shipyard.vue` — "Shipyard — Software Factory"
   - `pages/dockyard.vue` — "Dockyard — Hardware & Infrastructure"
   - `pages/fleet.vue` — "Fleet — AI Agent Swarm"
   - `pages/logs.vue` — "Experiment Logs"
   - `pages/about.vue` — "About Port of Code"

3. Create global CSS (`assets/css/main.css`):
   - Base dark background, light text defaults
   - Prose styling overrides for Nuxt Content rendered markdown
   - Code block styling (dark card background, cyan accent for syntax)
   - Scrollbar styling (subtle, dark)

4. Verify responsive behavior at mobile (375px), tablet (768px), desktop (1280px)

**Acceptance criteria:**
- All 6 routes render with correct layout
- Navigation highlights the active page
- Mobile hamburger menu works
- Brand colors and fonts are visible throughout
- Static generation still works with all pages

---

### Phase 2 — Content System & Section Index Pages

**Goal:** Nuxt Content is wired up. Section pages query and list their posts. MDC components are available in markdown.

**Tasks:**

1. Create the `content/` directory structure as specified above

2. Create 1-2 placeholder `.md` posts per section with proper frontmatter:
   - `content/shipyard/building-a-software-factory-with-openclaw.md`
   - `content/dockyard/building-a-600-ai-server.md`
   - `content/fleet/designing-an-ai-agent-fleet.md`
   - `content/logs/001-autonomous-blog-pipeline.md`
   - `content/logs/002-openclaw-on-pi-cluster.md`

3. Create section directory metadata (`_dir.yml` files):
   ```yaml
   # content/shipyard/_dir.yml
   title: Shipyard
   description: Where software is designed and built using AI agents.
   icon: anchor  # optional, for future use
   ```

4. Build reusable `components/content/PostCard.vue`:
   - Displays: title, description, date, section badge, experiment number (if present), status badge
   - Styled as a dark card with subtle border, hover effect (cyan glow or border highlight)

5. Build section index pages (`pages/shipyard.vue`, `pages/dockyard.vue`, `pages/fleet.vue`):
   - Section hero: title, description, themed icon/graphic placeholder
   - Content query using `queryContent()` filtered by path
   - Grid or list of `PostCard` components
   - Example query:
     ```vue
     const posts = await queryContent('shipyard').sort({ date: -1 }).find()
     ```

6. Build `pages/logs.vue`:
   - Chronological list (newest first)
   - Display experiment number prominently: "Log #001", "Log #002"
   - Query all content in `content/logs/` sorted by experiment number or date

7. Create a catch-all content page `pages/[...slug].vue`:
   - Uses `<ContentDoc />` or `<ContentRenderer />` to render any markdown file
   - Includes: article header (title, date, section, tags), prose body, back navigation
   - Prose width constrained to 768px max

8. Register custom MDC components (for use inside markdown):
   - `components/content/Callout.vue` — styled callout box (info, warning, experiment)
   - `components/content/ExperimentHeader.vue` — formatted experiment log header block
   - These are usable in markdown via `::callout` or `::experiment-header` syntax

**Acceptance criteria:**
- Placeholder posts render on section index pages
- Clicking a post card navigates to the full article
- MDC components render inside markdown files
- Content queries work correctly per section
- Static generation includes all content pages

---

### Phase 3 — Homepage (The Port)

**Goal:** A polished homepage that communicates the brand and surfaces recent content from all sections.

**Tasks:**

1. Build `pages/index.vue` with these sections:

   **Hero Section:**
   - Large "Port of Code" heading (JetBrains Mono)
   - Tagline: "Autonomous AI Software & Content Lab"
   - One-sentence mission statement
   - Subtle animated element (CSS only — e.g., blinking cursor, pulsing dot, or a simple ASCII/SVG harbor graphic)

   **Latest Experiments:**
   - Query the 3 most recent posts across all sections
   - Display as `PostCard` grid
   - "View all logs →" link

   **Section Overview:**
   - 3-column card grid (or stacked on mobile):
     - **Shipyard** — brief description + link + post count
     - **Dockyard** — brief description + link + post count
     - **Fleet** — brief description + link + post count
   - Each card has a themed accent (e.g., orange for Shipyard, cyan for Fleet, rust for Dockyard)

   **Fleet Status (optional v1 stretch):**
   - A simple "lab status" block — could be static text for now
   - e.g., "Fleet: 3 agents active | Shipyard: 2 projects in progress"
   - Placeholder for future dynamic data

2. Ensure the homepage queries are performant (use `queryContent().limit()`)

**Acceptance criteria:**
- Homepage looks polished and communicates the Port of Code brand
- Recent content appears dynamically from all sections
- Section cards link to their respective index pages
- Responsive across breakpoints
- No JavaScript hydration needed for static content (SSG-clean)

---

### Phase 4 — About Page & Content Polish

**Goal:** About page is complete. All placeholder content is replaced or improved. Typography and spacing are refined.

**Tasks:**

1. Build `pages/about.vue` (or use `content/about.md` rendered via catch-all):
   - Lab mission statement
   - Who runs it (brief bio — Caleb / Port of Code)
   - What the software factory concept is
   - The brand metaphor explained (Port → Fleet → Shipyard → Dockyard → Launch)
   - Contact / social links

2. Write or refine placeholder content for all seed posts:
   - Each post should have at least 2-3 paragraphs of real or realistic content
   - Use MDC components (callouts, experiment headers) in at least one post to validate the system

3. Typography and prose polish:
   - Verify heading hierarchy (h1 only for page title, h2/h3 in body)
   - Code block syntax highlighting (Nuxt Content uses Shiki — configure theme to match brand)
   - Inline code styling
   - Link styling (cyan, underline on hover)
   - Blockquote styling (left border in orange, italic)
   - List styling

4. Image handling (future-proof):
   - Create `public/images/` directory
   - Decide on image optimization approach (Nuxt Image module or manual)
   - Add at least one placeholder image/diagram to a post to validate the pipeline

5. Meta tags and SEO:
   - `useHead()` or `useSeoMeta()` on every page with title, description, og:image
   - Default og:image (a simple branded card — can be a static PNG for now)
   - Sitemap generation: add `@nuxtjs/sitemap` module

**Acceptance criteria:**
- About page is complete and informative
- All seed posts read well and use MDC components
- Typography is consistent and polished
- Meta tags are present on all pages
- Sitemap generates correctly

---

### Phase 5 — RSS Feed, Final Polish & Deployment

**Goal:** Site is production-ready and live on GitHub Pages.

**Tasks:**

1. RSS Feed:
   - Use Nuxt server routes or a build-time script to generate `/feed.xml`
   - Include all posts from all sections, sorted by date
   - Each entry: title, description, link, pubDate

2. 404 page:
   - Create `pages/[...slug].vue` fallback or `error.vue`
   - Branded 404 page: "Lost at sea? This page doesn't exist."
   - Link back to The Port (homepage)

3. Performance check:
   - Run Lighthouse on generated static output
   - Verify no unnecessary JS bundles
   - Ensure fonts load efficiently (swap/optional display)
   - Check that all pages are in the generated output

4. Final deployment:
   - Push to GitHub
   - Verify GitHub Actions workflow runs successfully
   - Confirm site is live at `portofcode.github.io` (or custom domain)
   - If using custom domain (`portofcode.com`): add CNAME file to `public/`, configure DNS

5. Document the content authoring workflow:
   - Create a `CONTRIBUTING.md` or `AUTHORING.md` in the repo
   - Explain: how to create a new post, frontmatter fields, MDC component usage, how to preview locally, how to deploy

**Acceptance criteria:**
- RSS feed is valid and includes all posts
- 404 page is branded
- Lighthouse performance score > 90
- Site is live and accessible
- Authoring guide exists in the repo

---

## Future Phases (Post-v1 Backlog)

These are out of scope for the initial build but documented for planning.

- **Dark/Light mode toggle** — add theme switcher, store preference
- **Search** — client-side search using Nuxt Content's built-in search or Pagefind
- **Tags/filtering** — tag index page, filter posts by tag on section pages
- **Newsletter signup** — embed form (Buttondown, Substack, or self-hosted)
- **Fleet dashboard** — live or semi-live agent status page
- **Project showcase** — dedicated `/projects` section with cards for each launched tool
- **Reading time estimate** — calculate and display in post headers
- **Table of contents** — auto-generated TOC for long posts
- **Social sharing** — Open Graph images auto-generated per post
- **Analytics** — privacy-respecting (Plausible, Umami, or Cabin)
- **Comments** — Giscus (GitHub Discussions-backed) or similar

---

## Claude Code Usage Notes

### How to use this roadmap

1. Work through phases **sequentially** — each builds on the last
2. After completing each phase, run `pnpm run generate` to verify static output
3. Commit after each phase with a message like `feat: complete phase 1 — layout shell`
4. Test locally with `pnpm run dev` throughout

### Key Nuxt Content patterns

**Querying content:**
```vue
<script setup>
const posts = await queryContent('shipyard')
  .sort({ date: -1 })
  .find()
</script>
```

**Rendering a single document:**
```vue
<ContentDoc />
```

**MDC component usage in markdown:**
```md
::callout{type="info"}
This is an informational callout inside a markdown file.
::

::experiment-header
---
experiment: 4
title: Autonomous Coding Agent
objective: Build a software pipeline using OpenClaw.
---
::
```

### GitHub Pages static generation

In `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'github-pages'
  },
  // If deploying to username.github.io, no baseURL needed
  // If deploying to username.github.io/repo-name:
  // app: { baseURL: '/repo-name/' }
})
```

### Deployment workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install
      - run: pnpm run generate
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .output/public
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## File Tree (Expected End State — v1)

```
portofcode/
├── .github/
│   └── workflows/
│       └── deploy.yml
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
│   │   └── building-a-software-factory-with-openclaw.md
│   ├── dockyard/
│   │   ├── _dir.yml
│   │   └── building-a-600-ai-server.md
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
│   ├── dockyard.vue
│   ├── fleet.vue
│   ├── logs.vue
│   ├── about.vue
│   └── [...slug].vue
├── public/
│   ├── images/
│   ├── CNAME                 # if using custom domain
│   └── favicon.ico
├── server/
│   └── routes/
│       └── feed.xml.ts       # RSS feed generation
├── nuxt.config.ts
├── tailwind.config.ts
├── package.json
├── pnpm-lock.yaml
├── AUTHORING.md
└── README.md
```