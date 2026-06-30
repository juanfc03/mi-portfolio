# AGENTS.md

## Stack

- Astro 7 + Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- TypeScript strict (`astro/tsconfigs/strict`)
- Node >= 22.12.0 (`engines` enforced)

Note: `package.json` pins `astro: ^7.0.4` and `typescript: ^6.0.3` — README still says "Astro 6", trust the manifest.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run check` | Astro type checking (`astro check`) |

No test framework. No CI. `.prettierrc` exists (`singleQuote`, `arrowParens: "avoid"`) but no `format`/`lint` script — run Prettier via editor or CLI manually. `super-commit` is an OpenCode command (see below), not a npm script.

## Config quirks (`astro.config.mjs`)

- `trailingSlash: 'always'` — every URL ends with `/`.
- `build.inlineStylesheets: 'always'` — all CSS inlined.
- `@astrojs/sitemap` enabled; `site: 'https://juanfc03.netlify.app'`.
- Path alias `@/` → `src/`, mirrored in `tsconfig.json` (`paths`).
- **No `tailwind.config.*`** — Tailwind 4 is config-free. All tokens live in `src/styles/global.css` inside `@theme inline`.
- Fonts via Astro 6/7 Fonts API (`fontProviders.fontsource()`), not a CDN. `JetBrains Mono` weights 400/500/700, served locally. `<Font cssVariable="--font-jetbrains-mono" preload />` is injected from `Layout.astro`.

## Structure

- `src/pages/index.astro` — only route. One-page app, smooth-scroll anchors.
- `src/layouts/Layout.astro` — `<head>`, meta/OG/Twitter/JSON-LD Person schema, default `title`/`description` props.
- `src/components/` — Astro components named in **Spanish** (Cabecera, Inicio, SobreMi, Experiencia, Proyectos, Tecnologias, Contacto, PiePagina). Keep naming in Spanish to match the rest.
- `src/styles/global.css` — `@theme inline` (Mono Archive tokens), `@utility no-scrollbar`, `[id] { scroll-margin-top: 80px }` for fixed-header offset, `prefers-reduced-motion` reset.
- `src/assets/` — `retrato-mio.png`, `proyecto-tfg.png`, `proyecto-rosa.png`, `proyecto-kardia.png`. Use `<Image>` from `astro:assets`; never reference these from `/public/`.
- `public/` — `favicon.svg`, `favicon.ico`, `robots.txt`, `CV_Juan_Fernandez_Ceacero.pdf`. Served as-is.
- `.astro/`, `dist/` — generated, gitignored.

## Design system (Mono Archive)

Authoritative source: `DESIGN.md` + `src/styles/global.css`. Style is **sharp (0px radius), monochromatic + muted emerald secondary, no shadows**. Use the registered tokens (`text-headline-lg`, `bg-surface`, `border-outline-variant`, `text-on-surface-variant`, etc.) instead of ad-hoc hex/classes. Every UI element must be sharp-cornered (DESIGN.md "Shapes"). Hover = invert fill or opacity change, never shadow.

Typography is **JetBrains Mono only** — all `--font-*` tokens map to `--font-jetbrains-mono`. Hierarchy comes from size/weight, not font swaps.

## Component conventions

- Data arrays in frontmatter typed with `interface` (e.g. `Proyecto` in `Proyectos.astro:7`), iterated with `.map()`.
- Images: `<Image>` with `format="webp"` + `quality={75}`. Hero portrait uses `fetchpriority="high"`, `widths={[400, 700]}`, `sizes="(max-width: 768px) 400px, 700px"`. Project images use `loading="lazy"`, `widths={[400, 800]}`, `sizes="(max-width: 768px) 400px, 800px"`.
- Icons are **inline SVGs** (menu/close/toast). No icon font, no icon library — Material Symbols was removed (saved 3.8 MB).
- Inline `<script>` blocks in components are fine for small client-side behaviour (mobile menu, contact form). Keep them co-located, no separate `.ts` files.

## Contact form (`Contacto.astro`)

- Netlify Forms: `data-netlify="true"`, `netlify-honeypot="bot-field"`. Hidden inputs: `form-name="contacto"` and the `bot-field` honeypot.
- `form name="contacto"` — every field needs a `name` attribute for Netlify capture.
- Client-side fetch POSTs to `/` with `Content-Type: application/x-www-form-urlencoded`; shows a 4s toast (`#toast`) on success/error. Don't change the form action or method or Netlify will stop capturing.

## Navigation / a11y

- One-page anchors: `#sobre-mi`, `#experiencia`, `#proyectos`, `#tecnologias`, `#contacto`. `Cabecera` and the mobile menu link to these.
- `index.astro` has a `Skip to main content` link (sr-only → focused).
- Header is fixed with `bg-surface/90 backdrop-blur-sm`; sections set `scroll-margin-top: 80px` (via `global.css`).

## Known gaps

- `Layout.astro` references `${Astro.site}og-image.png` for OG/Twitter cards, but `public/og-image.png` does not exist — social shares currently 404. Add it before relying on social previews.

## Repo-local OpenCode

- `.opencode/commands/super-commit.md` — `super-commit` command: groups changes and writes Conventional Commits in **Spanish**, imperative mood, max 72 chars. Types: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `perf`, `chore`, `ci`, `build`, `revert`. Always `git add <file>` (never `-A` or `.`). Skip secrets (`.env`, `*.key`, `*.secret`).
- Skills under `.opencode/skills/` (accessibility, best-practices, core-web-vitals, frontend-design, performance, seo, tailwind-css-patterns, typescript-advanced-types, web-quality-audit) — load via the `skill` tool when relevant.
