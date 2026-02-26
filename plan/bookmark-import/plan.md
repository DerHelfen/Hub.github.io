# Firefox Bookmark Import

**Branch:** `feature/bookmark-import`
**Description:** Import Firefox bookmarks into Hub, transforming nested folder structure into flat categories

## Goal

Replace the demo links in Hub with real bookmarks from Firefox, converting the deeply nested bookmark folder structure (66 folders, 248 links) into the flat category system used by Hub. This will populate the dashboard with actual, useful links organized by category.

## Research Summary

**Current State:**

- Hub has 6 demo links across 3 categories
- Links stored in `src/data/links.js` as static data
- Structure: `{ id, title, url, category, description }`
- Categories are derived dynamically from links

**Firefox Bookmarks:**

- 248 total bookmark links across 66 folders
- Deeply nested structure (up to 5+ levels)
- Main toolbar bookmarks organized into folders like:
  - Business Central, AL Entwicklung, CosmoConsult
  - Privat, Tools, Projekte, Azure
  - Top-level links: Azure, GitHub, ChatGPT, DeepL
- Structure: `{ guid, title, uri (for links), typeCode, children (for folders) }`

## Implementation Steps

### Step 1: Create Bookmark Parser Script

**Files:** `scripts/parse-bookmarks.js` (new)
**What:** Create a Node.js script that reads the Firefox JSON, extracts bookmark links (typeCode: 1) from toolbar only, and transforms them into Hub's link format. Uses immediate parent folder name as category. Top-level toolbar links go into "Quick Access" category.
**Testing:** Run script with bookmarks-2026-02-26.json and verify it outputs valid JavaScript array

**Category Mapping Strategy:**

- Use immediate parent folder name (e.g., "AL Entwicklung" → "AL Entwicklung" category)
- Top-level toolbar bookmarks (Azure, GitHub, ChatGPT, DeepL) → "Quick Access" category

**Folder Selection:**

- Import from **toolbar only** (`root > children[1] > toolbar________`)
- Skip menu bookmarks and Mozilla defaults

### Step 2: Handle Description Field

**Files:** `scripts/parse-bookmarks.js`
**What:** Set description to empty string for all imported bookmarks (Firefox doesn't provide descriptions).
**Testing:** Verify output has `description: ""` for all links

### Step 3: Run Parser and Replace links.js

**Files:** `src/data/links.js`, `scripts/parse-bookmarks.js`
**What:** Execute the parser script to generate the new links array, then replace the INITIAL_LINKS in src/data/links.js with the transformed bookmarks.
**Testing:**

- Verify links.js is valid JavaScript (no syntax errors)
- Run dev server (`npm run dev`) and confirm Hub loads
- Check that categories appear correctly
- Test search functionality with new links

### Step 4: Verify UI with Large Dataset

**Files:** `src/App.jsx`, `src/components/CategorySection.jsx`
**What:** Test the Hub UI with 248 links (vs. the original 6) to ensure layout, search, and performance are acceptable. Document any UI issues for future optimization.
**Testing:**

- Load Hub and verify all categories render
- Test search with various terms
- Check responsive layout on mobile/tablet/desktop
- Verify glassmorphism styling is consistent
- Note performance (should be fine for 248 links)

## Design Decisions Required

Before implementation, please clarify:

1. **Category Mapping:** Which option (A, B, or C) for flattening folders to categories?
   (Confirmed)

✅ **Category Mapping:** Use immediate parent folder name  
✅ **Folder Selection:** Toolbar bookmarks only (no menu or Mozilla defaults)  
✅ **Description Field:** Leave empty  
✅ **Top-Level Links:** Create "Quick Access" category for toolbar root links  
✅ **Demo Links:** Will be completely replaced with imported bookmarks

- Duplicate URL checking not needed (assuming Firefox doesn't have duplicates)
- No localStorage persistence needed (static import into links.js)
- UI performance should be fine with 248 links (no virtualization needed)
