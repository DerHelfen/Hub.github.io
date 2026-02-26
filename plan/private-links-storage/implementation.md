# Private Links Storage Implementation Plan

## Goal

Secure the 169 imported bookmarks (which contain sensitive COSMO CONSULT internal URLs like Azure DevOps, SharePoint, and internal tools) by storing them in a private GitHub repository while maintaining automatic deployment to GitHub Pages.

## Prerequisites

Ensure that the user is currently on the `feature/private-links-storage` branch before beginning implementation.
If not, move them to the correct branch. If the branch does not exist, create it from main.

### Step-by-Step Instructions

#### Step 1: Create Private Repository and Move Links

- [x] Create a new private GitHub repository named `Hub-private-data`.
- [x] Copy `src/data/links.js` to the private repository.
- [x] Add `/src/data/links.js` to the `.gitignore` in the public repository (`Hub.github.io`).
- [x] Add `plan/bookmark-import/bookmarks-2026-02-26.json` to `.gitignore` (as it also contains private data).

##### Step 1 Verification Checklist

- [x] Private repository `Hub-private-data` exists and contains `links.js`.
- [x] `/src/data/links.js` is ignored in the public repository.
- [x] `plan/bookmark-import/bookmarks-2026-02-26.json` is ignored in the public repository.

#### Step 1 STOP & COMMIT

**STOP & COMMIT:** Already completed by user.

#### Step 2: Create Personal Access Token

- [ ] Generate a GitHub Personal Access Token (classic) with `repo` scope.
- [ ] Copy the token to your clipboard.

##### Step 2 Verification Checklist

- [ ] Token is ready for use in the next step.

#### Step 2 STOP & COMMIT

**STOP & COMMIT:** Agent must stop here and wait for the user to create the token.

#### Step 3: Configure GitHub Secret

- [ ] Go to the Hub.github.io repository on GitHub.
- [ ] Navigate to Settings > Secrets and variables > Actions.
- [ ] Add a new repository secret:
  - **Name:** `PRIVATE_DATA_TOKEN`
  - **Secret:** [The PAT generated in Step 2]

##### Step 3 Verification Checklist

- [ ] Secret `PRIVATE_DATA_TOKEN` is listed in the repository settings.

#### Step 3 STOP & COMMIT

**STOP & COMMIT:** Agent must stop here and wait for the user to configure the secret.

#### Step 4: Update Build Workflow

- [ ] Modify the `.github/workflows/deploy.yml` file to include the private data integration.
- [ ] Copy and paste the updated content below into `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # --- START PRIVATE DATA INTEGRATION ---
      - name: Checkout private data repository
        if: ${{ secrets.PRIVATE_DATA_TOKEN != '' }}
        uses: actions/checkout@v4
        with:
          repository: derhelfen/Hub-private-data
          token: ${{ secrets.PRIVATE_DATA_TOKEN }}
          path: private-data-temp

      - name: Integrate private links
        if: ${{ secrets.PRIVATE_DATA_TOKEN != '' }}
        run: |
          if [ -f "private-data-temp/links.js" ]; then
            cp private-data-temp/links.js src/data/links.js
            echo "Private links.js successfully integrated."
          else
            echo "Warning: private-data-temp/links.js not found. Using local links.js."
          fi
      # --- END PRIVATE DATA INTEGRATION ---
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

##### Step 4 Verification Checklist

- [ ] Workflow file is correctly updated.
- [ ] Push to `main` branch (after merging) triggers the build and successfully pulls links from the private repo.

#### Step 4 STOP & COMMIT

**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.
