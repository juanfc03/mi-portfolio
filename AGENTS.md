# AGENTS.md

## Stack

- Astro 6 + Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- TypeScript with strict config (`astro/tsconfigs/strict`)
- Node >= 22.12.0 required

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

No test, lint, or typecheck scripts defined. Use `astro check` via `npm run astro check` for type checking.

## Structure

- `src/pages/` — file-based routing (Astro convention)
- `src/layouts/` — layout wrappers (import global CSS here)
- `src/components/` — reusable Astro components
- `src/styles/global.css` — Tailwind entrypoint (single `@import "tailwindcss"`)
- `public/` — static assets served as-is
- `.astro/` — generated types (gitignored)
- `dist/` — build output (gitignored)

## Fonts (Astro 6 Fonts API)

Fonts are configured via `fontProviders` in `astro.config.mjs` — **not** Google Fonts CDN links. Astro downloads, caches, and serves fonts locally for better performance and privacy.

- `fontProviders.fontsource()` — for JetBrains Mono (requires `@fontsource/jetbrains-mono` package)
- `fontProviders.googleicons()` — for Material Symbols Outlined
- `<Font cssVariable="--font-jetbrains-mono" preload />` in `Layout.astro` head injects the font
- Register in Tailwind 4 via `@theme inline { --font-sans: var(--font-jetbrains-mono), monospace; }` in `global.css`

## Conventions

- Tailwind 4 uses the `@tailwindcss/vite` plugin, not PostCSS. Do not add `tailwind.config.*` — Tailwind 4 is config-file-free.
- Global styles go in `src/styles/global.css`; component-scoped styles use Astro `<style>` blocks.
- All pages must import and wrap content with `Layout.astro`.
- Astro components use frontmatter (`---`) for JS, HTML below.
