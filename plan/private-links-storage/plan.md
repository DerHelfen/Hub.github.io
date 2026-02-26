# Private Links Storage

**Branch:** `feature/private-links-storage`
**Description:** Move links.js to a private repository to prevent exposing sensitive corporate URLs

## Goal

Secure the 169 imported bookmarks (which contain sensitive COSMO CONSULT internal URLs like Azure DevOps, SharePoint, and internal tools) by storing them in a private GitHub repository while maintaining automatic deployment to GitHub Pages.

## Research Summary

**Privacy Risk Identified:**
The current `src/data/links.js` contains sensitive URLs including:

- Company internal systems (`cosma.cosmoconsult.com`, `docs.cosmoconsult.com`)
- Azure DevOps organization (`dev.azure.com/CosmoConsultMuensterGmbH/`)
- SharePoint sites (`cosmo365.sharepoint.com`)
- Internal development tools

**Solution Chosen: Private Repository**

- Create separate private repo `Hub-private-data` to store `links.js`
- Public repo pulls from private repo during GitHub Actions build
- Maintains automatic deployment workflow
- Provides proper version control and backup for links

## Implementation Steps

### Step 1: Create Private Repository and Move Links

**Already Done:** Created `Hub-private-data` repository and copied `src/data/links.js` to it. Added `links.js` to `.gitignore` in the public repo.

### Step 2: Create Personal Access Token

**Files:** GitHub Settings (no code files)
**What:** Generate a GitHub Personal Access Token (classic) with `repo` scope to allow the public repository's workflow to access the private repository.
**Testing:** Verify token is created and copied to clipboard

### Step 3: Configure GitHub Secret

**Files:** GitHub Repository Settings (no code files)
**What:** Add the PAT as a repository secret named `PRIVATE_DATA_TOKEN` in the Hub.github.io repository settings.
**Testing:** Verify secret appears in repository settings

### Step 4: Update Build Workflow

**Files:** `.github/workflows/deploy.yml`
**What:** Modify the deployment workflow to checkout the private repository before building, copy `links.js` into place, then proceed with the normal build process.
**Testing:** Push changes and verify workflow succeeds, deployed site shows all 169 bookmarks

## Technical Notes

- Private repo name: `Hub-private-data`
- PAT permissions needed: `repo` (Full control of private repositories)
- Secret name: `PRIVATE_DATA_TOKEN`
- Workflow will fail gracefully if token is invalid or private repo is inaccessible
- Local development: Keep `links.js` file locally (gitignored)
- Future updates: Push changes to private repo, public repo deploys automatically
