# Hub Website Foundation Implementation Plan

## Goal

Setup a complete React + Vite + Tailwind CSS development environment in the `hub/` directory, configure automated GitHub Pages deployment via GitHub Actions, and create a modern light-themed landing page with glassmorphism widgets.

## Prerequisites

Make sure that the use is currently on the `feature/hub-foundation` branch before beginning implementation.
If not, move them to the correct branch. If the branch does not exist, create it from main.

### Step-by-Step Instructions

#### Step 1: Development Environment Setup

- [ ] Create the `hub/` directory if it doesn't exist.
- [ ] Initialize `hub/package.json` with core dependencies.
- [ ] Create Tailwind and PostCSS configuration files.
- [ ] Create the base `index.html` structure.
- [ ] Create the project entry point and initial CSS.

- [ ] Copy and paste code below into `hub/package.json`:

```json
{
  "name": "hub",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.439.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.4.2"
  }
}
```

- [ ] Copy and paste code below into `hub/tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
```

- [ ] Copy and paste code below into `hub/postcss.config.js`:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] Copy and paste code below into `hub/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Personal Hub</title>
  </head>
  <body class="bg-slate-50 text-slate-900">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] Copy and paste code below into `hub/src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}
```

- [ ] Copy and paste code below into `hub/src/main.jsx`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

##### Step 1 Verification Checklist

- [ ] Run `cd hub; npm install` successfully.
- [ ] Run `npm run dev` and verify service starts.
- [ ] Visual confirmation of a blank page or basic "hello" if App.jsx was created (Step 3 handles App.jsx content).

#### Step 1 STOP & COMMIT

**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 2: GitHub Pages Deployment Configuration

- [ ] Update Vite configuration with the correct base path.
- [ ] Create the GitHub Actions workflow file.
- [ ] Setup `.gitignore` to exclude build artifacts.

- [ ] Copy and paste code below into `hub/vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Hub.github.io/",
  server: {
    port: 5173,
    open: true,
  },
});
```

- [ ] Copy and paste code below into `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
          cache-dependency-path: hub/package-lock.json

      - name: Install dependencies
        run: npm install
        working-directory: hub

      - name: Build
        run: npm run build
        working-directory: hub

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./hub/dist"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] Copy and paste code below into `hub/.gitignore`:

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

##### Step 2 Verification Checklist

- [ ] Run `npm run build` inside `hub/` and check if `dist/` folder is generated.
- [ ] Verify `hub/dist/index.html` contains references to `/Hub.github.io/`.
- [ ] Verify `.gitignore` is working (dist and node_modules are not tracked).

#### Step 2 STOP & COMMIT

**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 3: Landing Page & Widgets Components

- [ ] Create the `HubLink`, `Clock`, and `Weather` components.
- [ ] Implement the main `App.jsx` layout with categorized sections.

- [ ] Copy and paste code below into `hub/src/components/Clock.jsx`:

```jsx
import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-sm">
      <div className="text-5xl font-light tracking-tight text-slate-800">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className="text-sm uppercase tracking-widest text-slate-500 mt-2">
        {time.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default Clock;
```

- [ ] Copy and paste code below into `hub/src/components/Weather.jsx`:

```jsx
import React from "react";
import { Sun } from "lucide-react";

const Weather = () => {
  // Mock weather data
  const weather = {
    temp: 22,
    condition: "Sunny",
    location: "Current Location",
  };

  return (
    <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-sm">
      <Sun className="w-12 h-12 text-amber-400" />
      <div>
        <div className="text-4xl font-bold text-slate-800">
          {weather.temp}°C
        </div>
        <div className="text-slate-500">
          {weather.condition} • {weather.location}
        </div>
      </div>
    </div>
  );
};

export default Weather;
```

- [ ] Copy and paste code below into `hub/src/components/HubLink.jsx`:

```jsx
import React from "react";
import { ExternalLink } from "lucide-react";

const HubLink = ({ title, url, description }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/10 shadow-sm transition-all hover:bg-white/60 hover:shadow-md hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
      </div>
      {description && (
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      )}
    </a>
  );
};

export default HubLink;
```

- [ ] Copy and paste code below into `hub/src/App.jsx`:

```jsx
import React, { useState } from "react";
import { Search } from "lucide-react";
import Clock from "./components/Clock";
import Weather from "./components/Weather";
import HubLink from "./components/HubLink";

const INITIAL_LINKS = [
  {
    id: 1,
    title: "GitHub",
    url: "https://github.com",
    category: "Work",
    description: "Source control and collaboration",
  },
  {
    id: 2,
    title: "Gmail",
    url: "https://mail.google.com",
    category: "Personal",
    description: "Personal email account",
  },
  {
    id: 3,
    title: "YouTube",
    url: "https://youtube.com",
    category: "Entertainment",
    description: "Videos and streaming",
  },
  {
    id: 4,
    title: "Stack Overflow",
    url: "https://stackoverflow.com",
    category: "Work",
    description: "Programming Q&A",
  },
  {
    id: 5,
    title: "LinkedIn",
    url: "https://linkedin.com",
    category: "Work",
    description: "Professional networking",
  },
  {
    id: 6,
    title: "Netflix",
    url: "https://netflix.com",
    category: "Entertainment",
    description: "Movies and Series",
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLinks = INITIAL_LINKS.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const categories = [...new Set(INITIAL_LINKS.map((link) => link.category))];

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 md:p-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Widget Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Clock />
          <Weather />
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search links or categories..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories and Links */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryLinks = filteredLinks.filter(
              (link) => link.category === category,
            );
            if (categoryLinks.length === 0) return null;

            return (
              <section key={category} className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-400 pl-4">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryLinks.map((link) => (
                    <HubLink key={link.id} {...link} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {searchTerm && filteredLinks.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No links found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

##### Step 3 Verification Checklist

- [ ] Verify `npm run dev` displays the full dashboard.
- [ ] Confirm Clock updates every second.
- [ ] Confirm link cards open in a new tab.
- [ ] Verify search functionality filters the links in real-time.
- [ ] Verify responsive layout on mobile/desktop.

#### Step 3 STOP & COMMIT

**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 4: Final Documentation

- [ ] Create `plan/hub-foundation/requirements.md`.
- [ ] Create `docs/features-roadmap.md`.

- [ ] Copy and paste code below into `plan/hub-foundation/requirements.md`:

```markdown
# Hub Foundation Requirements

## Visual Design

- **Theme:** Light theme (bg-slate-50)
- **Styling:** Modern glassmorphism (backdrop-blur-md, bg-white/40-60)
- **Typography:** Clean sans-serif (Inter)

## Functional Requirements

- **Clock Widget:** Display current time (HH:MM) and date. Updates in real-time.
- **Weather Widget:** Display mock temperature and condition for MVP.
- **Link Display:** Categorized grid view of links with titles and descriptions.
- **Search:** Filtering of links based on name or category.
- **Extensibility:** Links are managed in a flat array for easy modification.
- **Deployment:** Automatic GitHub Pages deployment via GitHub Actions.

## Technical Stack

- React 18.3.1
- Vite 5.4.2
- Tailwind CSS 3.4.1
- Lucide React (Icons)
```

- [ ] Copy and paste code below into `docs/features-roadmap.md`:

```markdown
# Hub Features Roadmap

## Phase 1: Foundation (Completed)

- [x] Vite + React + Tailwind Setup
- [x] Basic light-theme glassmorphism UI
- [x] Clock and Weather widgets (Mock)
- [x] Categorized link grid
- [x] Search/Filter functionality
- [x] CI/CD via GitHub Actions

## Phase 2: Core Enhancements

- [ ] Real weather API integration (OpenWeatherMap)
- [ ] LocalStorage persistence for custom links
- [ ] JSON configuration file for data management
- [ ] Dark Mode support

## Phase 3: Advanced Features

- [ ] News/RSS Feed integration
- [ ] Drag-and-drop link organization
- [ ] Quick notes sidebar
- [ ] Custom background image upload
```

##### Step 4 Verification Checklist

- [ ] Verify all documentation files exist and have correct content.

#### Step 4 STOP & COMMIT

**STOP & COMMIT:** Final check and commit. Project setup complete.
