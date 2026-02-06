# TXC Intelligence Operations (GitHub Pages Edition)

Unified SvelteKit monorepo hosting two intelligence products for the TEXITcoin ecosystem, optimized for GitHub Pages deployment.

## Projects

- **Report** (`/report`) — "The Autopsy: Forensic Intelligence Report"  
- **Strike** (`/strike`) — "Vampiric Blockchain Strike: Extraction Protocol"

## Deployment

This version uses `@sveltejs/adapter-static` for GitHub Pages hosting. Built static files are served directly from the `build/` directory.

### Build & Deploy

```bash
npm install
npm run build
# Static files ready in build/
```

### GitHub Pages Config

Point your repo settings to deploy from this directory. The static adapter handles routing via `fallback: '404.html'`.

## Development

```bash
npm run dev      # Local dev server
npm run build    # Build static site
npm run check    # Type-check
```

## Tech Stack

- **Framework:** SvelteKit 2.50.1
- **Styling:** Vanilla CSS
- **Runtime:** Node.js / npm
- **Deployment:** GitHub Pages (static)
