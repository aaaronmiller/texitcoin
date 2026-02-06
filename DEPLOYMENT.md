# Deployment Guide

## GitHub Pages (Static Version)

**Location:** `_RELEASE/GitHub_Version/`

### Setup GitHub Pages (One-time)
1. Go to: https://github.com/aaaronmiller/texitcoin/settings/pages
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** / **docs/**
   - Click Save

### Deploy Updates
```bash
cd _RELEASE/GitHub_Version
npm run build
git add -A && git commit -m "Update" && git push origin main
```
Wait 1-2 minutes for GitHub Pages to rebuild.

**Your site:** https://aaaronmiller.github.io/texitcoin/

---

## Vercel (Server Version)

**Location:** `_RELEASE/Vercel_Version/`

### Setup Vercel (One-time)
1. Go to: https://vercel.com/new
2. Import from: `https://github.com/aaaronmiller/texitcoin`
3. Import Path: `_RELEASE/Vercel_Version`
4. Deploy

### Deploy Updates
Vercel auto-deploys on push to main branch.

---

## Project Structure

```
texitcoin/
├── _RELEASE/
│   ├── GitHub_Version/     # Static adapter → GitHub Pages
│   │   ├── docs/           # Built output
│   │   └── svelte.config.js # adapter-static
│   │
│   └── Vercel_Version/     # Vercel adapter → Vercel
│       └── svelte.config.js # adapter-vercel
```

---

## What Each Version Looks Like

### Gateway Page (Both Versions)
- **Left Card:** "The Autopsy" - Forensic Level 4 → /report
- **Right Card:** "Vampiric Strike" - Predator Level 1 → /strike

### /report (The Autopsy)
Forensic intelligence report about TEXITcoin ecosystem analysis.

### /strike (Vampiric Strike)
Extraction protocol with risk metrics and strategies.