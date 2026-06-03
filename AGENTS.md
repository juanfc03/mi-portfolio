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
| `npm run check` | Type checking with Astro |

## Structure

- `src/pages/` — file-based routing (Astro convention)
- `src/layouts/` — layout wrappers (import global CSS here)
- `src/components/` — reusable Astro components (nombres en español)
- `src/styles/global.css` — Tailwind entrypoint with `@theme inline` for all design tokens
- `public/` — static assets served as-is
- `.astro/` — generated types (gitignored)
- `dist/` — build output (gitignored)

## Fonts (Astro 6 Fonts API)

Fonts are configured via `fontProviders` in `astro.config.mjs` — **not** Google Fonts CDN links. Astro downloads, caches, and serves fonts locally for better performance and privacy.

- `fontProviders.fontsource()` — for JetBrains Mono (downloads from Fontsource CDN)
- `<Font cssVariable="--font-jetbrains-mono" preload />` in `Layout.astro` head injects the font
- Register in Tailwind 4 via `@theme inline { --font-sans: var(--font-jetbrains-mono), monospace; }` in `global.css`

**Icons:** Material Symbols was removed (3.8MB). Icons are now **inline SVGs** (menu, close, download) — Feather icons style.

## Design System (Mono Archive)

All design tokens are in `src/styles/global.css` inside `@theme inline`:
- Colors: `--color-primary`, `--color-surface-*`, `--color-outline-*`, etc.
- Spacing: `--spacing-margin-mobile` (20px), `--spacing-margin-desktop` (64px), `--spacing-container-max` (1200px), `--spacing-gutter` (24px)
- Font sizes: `--text-display-lg` (48px), `--text-headline-lg` (32px), `--text-body-lg` (18px), `--text-label-md` (12px)
- Font families: `--font-display-lg`, `--font-headline-lg`, `--font-body-lg`, etc. — all map to `--font-jetbrains-mono`

## Component Architecture

- Components use **TypeScript interfaces** in frontmatter for data typing
- Data arrays (experiencias, proyectos, tecnologías) are defined in frontmatter and iterated with `.map()`
- Images use `<Image>` or `<Picture>` from `astro:assets` with responsive `widths` and `sizes`
- Hero portrait: `fetchpriority="high"`, `widths={[400, 700]}`, `sizes="(max-width: 768px) 400px, 700px"`
- Project images: `widths={[400, 800]}`, `sizes="(max-width: 768px) 400px, 800px"`

## Contact Form (Netlify)

- Form uses `data-netlify="true"` and `netlify-honeypot="bot-field"` for spam protection
- Hidden inputs: `form-name` and `bot-field` (honeypot)
- All inputs need `name` attributes for Netlify to capture them
- Toast notification for success/error feedback

## Conventions

- Tailwind 4 uses the `@tailwindcss/vite` plugin, not PostCSS. Do not add `tailwind.config.*` — Tailwind 4 is config-file-free.
- Global styles go in `src/styles/global.css`; component-scoped styles use Astro `<style>` blocks.
- All pages must import and wrap content with `Layout.astro`.
- Component filenames and data are in **Spanish** (Cabecera, Inicio, SobreMi, Experiencia, Proyectos, Tecnologias, Contacto, PiePagina).
- Navigation is one-page with smooth scroll and anchor links (`#sobre-mi`, `#experiencia`, `#proyectos`, `#tecnologias`, `#contacto`).
