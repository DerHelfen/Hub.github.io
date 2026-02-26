# Firefox Bookmark Import Implementation Plan

## Goal

Replace the demo links in Hub with real bookmarks from Firefox, converting the nested folder structure from `bookmarks-2026-02-26.json` into the flat category system used by Hub.

## Prerequisites

Ensure you are on the `feature/bookmark-import` branch. If not, create and switch to it:

```powershell
git checkout -b feature/bookmark-import
```

### Step-by-Step Instructions

#### Step 1: Create the Bookmark Parser Script

- [x] Create a new directory named `scripts` in the root of the project.
- [x] Create a file named `scripts/parse-bookmarks.js`.
- [x] Copy and paste the code below into `scripts/parse-bookmarks.js`:

```javascript
import fs from "fs";
import path from "path";

/**
 * This script parses a Firefox bookmarks JSON export and transforms it into
 * the format required by Hub (src/data/links.js).
 *
 * Logic:
 * 1. Targets the "toolbar" folder (GUID: toolbar_____).
 * 2. Links at the root of the toolbar are categorized as "Quick Access".
 * 3. Links inside folders are categorized by their immediate parent folder name.
 * 4. Skips nested folders to keep categories flat.
 */

const BOOKMARKS_FILE = "bookmarks-2026-02-26.json";
const OUTPUT_FILE = "src/data/links.js";

async function main() {
  if (!fs.existsSync(BOOKMARKS_FILE)) {
    console.error(`Error: ${BOOKMARKS_FILE} not found in root directory.`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(BOOKMARKS_FILE, "utf-8");
  const data = JSON.parse(rawData);

  // 1. Find the Toolbar folder
  // Firefox uses "toolbar_____" for the bookmarks toolbar
  const rootChildren = data.children || [];
  const toolbar = rootChildren.find((c) => c.guid === "toolbar_____");

  if (!toolbar) {
    console.error(
      "Error: Could not find the toolbar folder (guid: toolbar_____) in the JSON.",
    );
    process.exit(1);
  }

  const hubLinks = [];
  let currentId = 1;

  function processNode(node, categoryName = "Quick Access") {
    // typeCode 1 is a Link
    if (node.typeCode === 1) {
      hubLinks.push({
        id: currentId++,
        title: node.title,
        url: node.uri,
        category: categoryName,
        description: "", // Firefox bookmarks don't have descriptions
      });
    }
    // typeCode 2 is a Folder
    else if (node.typeCode === 2 && node.children) {
      // Use this folder's name as the category for its direct links
      // and recurse into subfolders (using the parent name to keep categories flat)
      // or use the current folder name to allow specific categories.
      // Based on PR plan: Use immediate parent folder name.
      const newCategory =
        node.guid === "toolbar_____" ? "Quick Access" : node.title;

      node.children.forEach((child) => {
        processNode(child, newCategory);
      });
    }
  }

  // Start processing from the toolbar
  processNode(toolbar);

  // Generate the file content
  const fileHeader = `/**\n * Auto-generated links from Firefox bookmarks\n * Generated on: ${new Date().toISOString()}\n */\n\n`;
  const fileContent = `${fileHeader}export const INITIAL_LINKS = ${JSON.stringify(hubLinks, null, 2)};\n`;

  // Write to src/data/links.js
  fs.writeFileSync(OUTPUT_FILE, fileContent, "utf-8");

  console.log(
    `Successfully imported ${hubLinks.length} bookmarks into ${OUTPUT_FILE}`,
  );
  console.log(
    `Categories created: ${[...new Set(hubLinks.map((l) => l.category))].join(", ")}`,
  );
}

main().catch(console.error);
```

##### Step 1 Verification Checklist

- [x] File `scripts/parse-bookmarks.js` created successfully.
- [x] Directory `scripts` exists.

#### Step 1 STOP & COMMIT

**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 2: Execute Import and Verify Data

- [x] Run the parser script using Node.js:

```powershell
node scripts/parse-bookmarks.js
```

- [x] Verify the terminal output shows a successful import (approx. 248 links).
- [x] Open `src/data/links.js` and verify it contains the imported links with sequential IDs.

##### Step 2 Verification Checklist

- [x] `src/data/links.js` is updated with your bookmarks.
- [x] No syntax errors in `src/data/links.js`.

#### Step 2 STOP & COMMIT

**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 3: Verify Hub UI with New Links

- [x] Start the development server:

```powershell
npm run dev
```

- [x] Open the browser and verify:
  - [x] All categories (Business Central, AL Entwicklung, Tools, etc.) are visible.
  - [x] Search functionality works for your specific bookmarks.
  - [x] Layout remains responsive with the larger dataset (169 links).
  - [x] Glassmorphism cards look correct.

##### Step 3 Verification Checklist

- [x] Dashboard renders all imported categories and links.
- [x] Search functions correctly.
- [x] Performance is smooth.

#### Step 3 STOP & COMMIT

**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.
