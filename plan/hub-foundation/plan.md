# Hub Website Foundation

**Branch:** `feature/hub-foundation`
**Description:** Setup React + Vite + Tailwind development environment and deploy Hello World to GitHub Pages

## Goal

Establish a complete development and deployment workflow for the personal hub website using React, Vite, and Tailwind CSS. This provides a foundation for building the hub features while serving as a practical web development learning project.

## Implementation Steps

### Step 1: Development Environment Setup

**Files:**

- hub/package.json
- hub/vite.config.js
- hub/tailwind.config.js
- hub/postcss.config.js
- hub/index.html
- hub/src/main.jsx
- hub/src/App.jsx
- hub/src/index.css

**What:** Initialize a Vite + React project with Tailwind CSS in the `hub/` directory. Install all dependencies (React 18.3.1, Vite 5.4.2, Tailwind CSS 3.4.1) and configure Tailwind for JIT compilation with PostCSS.

**Testing:**

- Run `npm install` successfully
- Run `npm run dev` and verify dev server starts on localhost:5173
- Confirm hot module replacement works by editing a component
- Verify Tailwind classes are applied and purging works

### Step 2: GitHub Pages Deployment Configuration

**Files:**

- hub/vite.config.js (update base path)
- .github/workflows/deploy.yml
- hub/.gitignore

**What:** Configure Vite for GitHub Pages deployment with base path `/Hub.github.io/`. Create GitHub Actions workflow to automatically build and deploy to gh-pages branch on push to main branch. Configure workflow with proper Node.js version (20 LTS) and npm dependencies. Add proper .gitignore for node_modules and build artifacts.

**Testing:**

- Run `npm run build` and verify dist/ folder is created
- Check that built assets reference correct base path `/Hub.github.io/`
- Verify .gitignore excludes node_modules and dist/
- Push to main and verify GitHub Actions workflow runs successfully
- Confirm site is accessible at `derhelfen.github.io/Hub.github.io/`

### Step 3: Hello World Landing Page

**Files:**

- hub/src/App.jsx
- hub/src/index.css
- hub/src/components/HubLink.jsx (new)
- hub/src/components/Clock.jsx (new)
- hub/src/components/Weather.jsx (new)

**What:** Create a light-themed landing page with clean, modern glassmorphism effects:

- Light theme with dark text
- Multi-area layout structure:
  - Top widget area: Clock and Weather widget placeholders (displaying mock data)
  - Main content area: Categorized link sections
  - Search bar placeholder
- Example link categories: "Work", "Personal", "Entertainment"
- 2-3 example link cards per category to demonstrate the concept
- Subtle glassmorphism cards using Tailwind (backdrop-blur-sm, bg-white/80)
- Responsive grid layout using Tailwind utilities

**Testing:**

- Verify page loads in development with light theme
- Test responsive behavior (mobile, tablet, desktop)
- Verify glassmorphism effects render correctly (clean and modern)
- Confirm layout adapts properly: widgets stack on mobile, side-by-side on desktop
- Test all Tailwind utilities are working (hover states, transitions)

### Step 4: Requirements Gathering & Documentation

**Files:**

- plan/hub-foundation/requirements.md (new)
- docs/features-roadmap.md (new)

**What:** Document detailed requirements for the hub features:

**Design Requirements:**

- Light theme with dark text
- Clean and modern glassmorphism effects (subtle backdrop blur)
- Responsive design (mobile-first approach)

**Layout Structure:**

- Top widget area: Clock/time display and Weather widget
- Main content area: Categorized link sections (Work, Personal, Entertainment, etc.)
- Search/filter functionality for finding links
- News feed area (future enhancement)

**Core Features:**

- Easily extensible link system (add new links without code changes)
- Category management (organize links by type)
- Search/filter across all links
- Working Clock widget displaying current time
- Weather widget (with location configuration)

**Non-MVP Features (Future):**

- Quick notes/todo list
- Most recently visited tracking
- Custom backgrounds
- Auto theme switching
- Drag-and-drop customization

**Testing:**

- Review requirements document for completeness
- Ensure requirements are specific and measurable
- Define acceptance criteria for each feature
- Create priority matrix (MVP vs Phase 2 vs Future)

## Key Design Decisions

Based on requirements gathering:

- **Deployment:** Automatic via GitHub Actions on push to main
- **Base Path:** `/Hub.github.io/` for project site
- **Theme:** Light theme with dark text, clean modern glassmorphism
- **Layout:** Multi-area design (widgets top, categorized links main, search bar)
- **Organization:** Categorized sections with search/filter functionality
- **Extensibility:** Easy to add new links without code changes (JSON/config-based)
- **MVP Widgets:** Clock/time display and Weather widget
- **Future Features:** News feed, theme switching, drag-and-drop, notes, tracking

## Notes

- Framework decision already documented in `docs/framework-decision.md`
- Using Node 20 LTS and npm as package manager
- Project follows modern React patterns (functional components, hooks)
- Tailwind configured for optimal production bundle size
