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
git add -A && git commit -m "Update build"
git push origin main
```
Wait 1-2 minutes for GitHub Pages to rebuild.

**Your site:** https://aaaronmiller.github.io/texitcoin/

---

## Vercel (Server Version)

**Location:** `_RELEASE/Vercel_Version/`

### Deploy to Vercel
1. Go to: https://vercel.com/new
2. Import from: `https://github.com/aaaronmiller/texitcoin/_RELEASE/Vercel_Version`
3. Deploy

### Deploy Updates
```bash
cd _RELEASE/Vercel_Version
git add -A && git commit -m "Update"
git push origin main
```
Vercel auto-deploys on push.

---

## Folder Structure
```
texitcoin/
├── _RELEASE/
│   ├── GitHub_Version/     # Static build → GitHub Pages
│   │   ├── docs/           # Built static files
│   │   ├── src/
│   │   └── package.json
│   └── Vercel_Version/      # Server build → Vercel
│       ├── src/
│       └── package.json
```