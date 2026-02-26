# GitHub Copilot Instructions

This file provides repository-level context for AI-assisted development on the Hub project.

## Project Overview

A personal dashboard web app hosted on GitHub Pages at `https://derhelfen.github.io/hub/`. It displays a glassmorphism-styled landing page with a clock widget, weather widget, categorized link grid, and search functionality.

## Repository Structure

```
Hub.github.io/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Actions deployment workflow
│   └── copilot-instructions.md # This file
├── docs/                       # Architecture decisions and roadmap documentation
│   ├── framework-decision.md
│   └── features-roadmap.md
├── hub/                        # The React + Vite application (deployable unit)
│   ├── src/
│   │   ├── components/         # Reusable UI components (Clock, Weather, etc.)
│   │   ├── data/               # Static data (links.js)
│   │   ├── App.jsx             # Root component with dashboard layout
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles (Tailwind directives)
│   ├── dist/                   # Build output (gitignored)
│   ├── index.html              # Vite HTML template
│   ├── vite.config.js          # base: "/hub/" for GitHub Pages
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── package.json            # Dependencies and scripts
│   └── package-lock.json       # Exact dependency versions
├── plan/                       # Per-feature planning documents
│   └── hub-foundation/
│       ├── plan.md
│       ├── implementation.md   # Step-by-step instructions for the AI agent
│       └── requirements.md
├── README.md                   # Legacy documentation (can be updated/removed)
├── index.html                  # Legacy file (not used in React app)
├── style.css                   # Legacy file (not used in React app)
├── script.js                   # Legacy file (not used in React app)
└── LICENSE
```

## Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| UI Library | React 18                      |
| Build Tool | Vite 5                        |
| Styling    | Tailwind CSS 3                |
| Icons      | Lucide React                  |
| Deployment | GitHub Actions → GitHub Pages |

## AI-Assisted Development Workflow

New features follow a structured plan-first workflow:

1. **Plan** — Create a `plan/<feature-name>/plan.md` describing the goal and approach.
2. **Requirements** — Create `plan/<feature-name>/requirements.md` capturing functional and visual requirements.
3. **Implementation Plan** — Create `plan/<feature-name>/implementation.md` with explicit step-by-step instructions.
   - Each step ends with a **STOP & COMMIT** instruction. The agent must halt and return control to the user after each step.
   - The agent checks off completed items inline using `[x]` markdown syntax.
4. **Roadmap** — Update `docs/features-roadmap.md` to reflect completed and upcoming work.

When asked to implement, always use the `sa-imp` prompt mode (implementation agent). Do not deviate from the plan — implement only what is explicitly specified.

## Coding Conventions

### Components

- One component per file in `hub/src/components/`.
- Named exports are fine, but default export is preferred for components.
- Props are passed directly (no prop spreading on DOM elements).

### Styling

- Use Tailwind utility classes exclusively. Do not write custom CSS unless necessary.
- Glassmorphism pattern: `bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-sm`.
- Hover states use `group` + `group-hover:` pattern for compound hover effects.
- Consistent spacing scale: `p-4`, `p-6`, `gap-6`, `space-y-12`.

### Data

- Static link data lives in `hub/src/data/links.js` as `INITIAL_LINKS`.
- Each link object shape: `{ id, title, url, category, description }`.

### State Management

- Use `useState` and `useMemo` for local state. No external state library.
- Derived state (filtered lists, categories) is computed with `useMemo`.

## Deployment

- **Method**: GitHub Actions (not "Deploy from branch")
- The app deploys automatically when code is pushed to `main`
- Build process: Vite builds React app from `hub/` → `hub/dist/`
- Deploy target: `hub/dist/` contents are deployed to GitHub Pages
- Base path: `/hub/` for GitHub Pages compatibility (configured in `vite.config.js`)
- Workflow: [`.github/workflows/deploy.yml`](workflows/deploy.yml)
- **Important**: GitHub Pages source must be set to "GitHub Actions" (not branch deployment)

## Branch Strategy

- `main` — production branch, triggers deployment on push.
- `feature/<name>` — one branch per feature, branched from `main`.
- Merge to `main` only after all steps in the implementation plan are committed and verified.
