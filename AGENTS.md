# AGENTS.md

## Stack

- Astro 6 + Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- TypeScript with strict config (`astro/tsconfigs/strict`)
- Node >= 22.12.0 required

## Commands

| Command           | Purpose                        |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server at `localhost:4321` |
| `npm run build`   | Production build to `dist/`    |
| `npm run preview` | Preview production build       |
| `npm run check`   | Type checking with Astro       |

No test framework, no CI/CD (no `.github/`).

## Config quirks

- `trailingSlash: 'always'` in `astro.config.mjs`
- `build.inlineStylesheets: 'always'` — all CSS inlined
- `@astrojs/sitemap` integration enabled
- Path alias `@/` → `src/` (configured in both `astro.config.mjs` and `tsconfig.json`)
- **No `tailwind.config.*`** — Tailwind 4 is config-file-free. All design tokens in `src/styles/global.css` via `@theme inline`.

## Structure

- `src/pages/index.astro` — the only page (single-page app with smooth-scroll anchors)
- `src/layouts/Layout.astro` — wraps all content; imports `global.css` and injects `<Font>`
- `src/components/` — components named in **Spanish** (Cabecera, Inicio, SobreMi, Experiencia, Proyectos, Tecnologias, Contacto, PiePagina)
- `src/styles/global.css` — `@theme inline` with colors, spacing, typography, and `@utility no-scrollbar`
- `src/assets/` — images processed by `astro:assets` (retrato-mio.png, proyecto-tfg.png, proyecto-rosa.png)
- `public/` — favicon.svg, favicon.ico, robots.txt (served as-is)
- `.astro/` — generated types (gitignored)
- `dist/` — build output (gitignored)

## Design System (Mono Archive)

All tokens in `src/styles/global.css` inside `@theme inline`:

- `--color-primary` (#000000), `--color-surface-*` (off-white scale), `--color-secondary` (muted emerald), `--color-outline-*`
- `--spacing-margin-mobile: 20px`, `--spacing-margin-desktop: 64px`, `--spacing-container-max: 1200px`, `--spacing-gutter: 24px`
- `--text-display-lg: 48px`, `--text-headline-lg: 32px`, `--text-body-lg: 18px`, `--text-label-md: 12px`
- All font families map to `--font-jetbrains-mono`
- Custom `@utility no-scrollbar` available
- `[id] { scroll-margin-top: 80px }` for fixed header offset
- `prefers-reduced-motion` respected globally

## Fonts (Astro 6 Fonts API)

Configured via `fontProviders.fontsource()` in `astro.config.mjs` — **not** Google Fonts CDN. Astro downloads and serves locally.

- `<Font cssVariable="--font-jetbrains-mono" preload />` in `Layout.astro` head
- Weights: 400, 500, 700; subsets: latin; fallback: monospace
- Icons are **inline SVGs** (menu, close, download) — Material Symbols removed to save 3.8MB

## Component conventions

- Data arrays typed with `interface` in frontmatter, iterated with `.map()`
- Images use `<Image>` from `astro:assets` with explicit `widths`/`sizes`/`format="webp"`/`quality={75}`
- Hero portrait: `fetchpriority="high"`, `widths={[400, 700]}`, `sizes="(max-width: 768px) 400px, 700px"`
- Project images: `loading="lazy"`, `widths={[400, 800]}`, `sizes="(max-width: 768px) 400px, 800px"`

## Contact form (Netlify)

- `data-netlify="true"` + `netlify-honeypot="bot-field"` for spam protection
- Hidden inputs: `form-name` and `bot-field` (honeypot)
- All inputs need `name` attributes for Netlify capture
- Client-side JS in `Contacto.astro` handles fetch POST + toast notification (success/error)
- Form action POSTs to `/` (Netlify auto-detects by `form-name`)

## Navigation

- One-page: anchors `#sobre-mi`, `#experiencia`, `#proyectos`, `#tecnologias`, `#contacto`
- Fixed header with backdrop blur; mobile hamburger toggle with `max-height` animation
