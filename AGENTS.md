# AGENTS.md

## Stack

- Astro 7 + Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- TypeScript strict (`astro/tsconfigs/strict`)
- Node >= 22.12.0 (`engines` enforced)

Note: `package.json` pins `astro: ^7.0.4` and `typescript: ^6.0.3`.

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

- `src/pages/index.astro` — home, one-page app, smooth-scroll anchors. Reveal-on-scroll logic lives in `src/scripts/revelar-scroll.ts`.
- `src/pages/proyectos/[slug].astro` — dynamic project detail page (with `getStaticPaths()`). The URL `/proyectos/` redirects to `/` via `Astro.redirect('/')` + `public/_redirects` (301 on Netlify).
- `src/layouts/Layout.astro` — `<head>`, meta/OG/Twitter/JSON-LD Person schema, `<ClientRouter />` (Astro View Transitions), `<Cabecera transition:persist />`, `<PiePagina transition:persist />`, default `title`/`description` props. The inline scripts for the PWA manifest and route tracking are extracted to `src/scripts/manifest-pwa.ts` and `src/scripts/rastreo-rutas.ts`.
- `src/components/` — Astro components named in **Spanish** (Cabecera, Inicio, SobreMi, Experiencia, Proyectos, TarjetaProyecto, ProyectoDetalle, Tecnologias, Contacto, PiePagina). Keep naming in Spanish to match the rest.
- `src/scripts/` — **100% TypeScript client-side logic**, extracted from inline `<script>` blocks in `.astro` files. Each file exports an `inicializar*` function that components import and register with `astro:page-load` / `astro:after-swap`. All use `querySelector<T>()` with native generic types (never `as` assertions with `getElementById`). Astro events (`astro:before-swap`, `astro:before-preparation`) are typed in `src/types/eventos-astro.ts`.
- `src/types/` — Reusable interfaces and types. **Type exports only** (no logic, no values). Use `readonly` on properties of data interfaces.
- `src/data/` — Static data arrays and objects. Exported with `as const satisfies` to preserve literals and enforce type validation without widening. No logic, no external library imports.
- `src/utils/` — Shared pure functions (date formatting, etc.). Explicit return types, JSDoc required.
- `src/content.config.ts` — defines the **content collection** `proyectos` validated with Zod (`z.object` + `image()` from Astro Schema). `glob` loader from `src/content/proyectos/`.
- `src/content/proyectos/*.md` — markdown entries for each project (frontmatter + body with long description).
- `src/styles/global.css` — `@theme inline` (Mono Archive tokens actually used by the components), `address { font-style: normal }` reset, `section[id], main[id] { scroll-margin-top: 80px }` for fixed-header offset, `.js-reveal`/`.is-visible` reveal classes, `prefers-reduced-motion` reset with explicit override of `::view-transition-*`, `:focus-visible` outline (2px solid `--color-primary`).
- `src/styles/proyecto-detalle.css` — Styles specific to the detail page: `detalle-reveal` animation, `@keyframes detalle-reveal`, and prose styles for the rendered markdown (`.detalle-contenido`). No `:global()` since this is plain imported CSS.
- `src/assets/` — `retrato-mio.png`, `proyecto-tfg.png`, `proyecto-rosa.png`, `proyecto-kardia.png`. Use `<Image>` from `astro:assets`; never reference these from `/public/`.
- `src/data/sitio.ts` — **single source of truth** for the site's identifying data (includes `knowsAbout` for JSON-LD). Strictly typed with `interface Sitio` (properties `readonly`). Exported with `as const satisfies Sitio`. Imported in `Layout.astro`, `PiePagina.astro`, `Contacto.astro` and `Proyectos.astro`. Do not hardcode these values in components or in the JSON-LD.
- `public/` — `favicon.svg`, `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`, `site.webmanifest`, `robots.txt`, `CV_Juan_Fernandez_Ceacero.pdf`. Served as-is. (Astro does NOT autogenerate the `web-app-manifest-*.png` files: they are committed assets for the PWA icons.)
- `src/pages/open-graph/og-image.png.ts` — **OG image endpoint** generated with `astro-og-canvas`. Because the file ends in `.png.ts`, Astro does NOT add a trailing slash even though `trailingSlash: 'always'` is configured. Serves `/open-graph/og-image.png` (1200×630) at build time. Fonts are pulled directly from the `api.fontsource.org` URLs (matching the weights in the Astro Fonts API config) — no local TTF files needed. Mono Archive design: 24px black top bar, name in JetBrains Mono Bold 100px, role + university + URL in mono. Add to `<meta property="og:image">` and JSON-LD with the full URL (no trailing slash).
- `.astro/`, `dist/` — generated, gitignored.

## Design system (Mono Archive)

Authoritative source: `DESIGN.md` + `src/styles/global.css`. Style is **sharp (0px radius), monochromatic + muted emerald secondary, no shadows**. Use the registered tokens (`text-headline-lg`, `bg-surface`, `border-outline-variant`, `text-on-surface-variant`, etc.) instead of ad-hoc hex/classes. Every UI element must be sharp-cornered (DESIGN.md "Shapes"). Hover = invert fill or opacity change, never shadow.

Typography is **JetBrains Mono only** — all `--font-*` tokens map to `--font-jetbrains-mono`. Hierarchy comes from size/weight, not font swaps.

## Component conventions

- Data arrays in frontmatter typed with `interface` (e.g. `Proyecto` in `Proyectos.astro:7`), iterated with `.map()`. Projects come from the **content collection** (`await getCollection('proyectos')` ordered by `data.orden`). Reusable data is extracted to `src/data/` with `as const satisfies`.
- Images: `<Image>` with `format="webp"` + `quality={75}`. Hero portrait uses `fetchpriority="high"`, `decoding="async"`, `widths={[320, 448, 640, 832, retrato.width]}`, `sizes="(max-width: 480px) 320px, (max-width: 768px) 448px, (max-width: 1024px) 640px, (max-width: 1280px) 832px, 1024px"`. Project images use `loading="lazy"`, `decoding="async"`, `widths={[400, 640, 832, 1088, imagen.width]}`, `sizes="(max-width: 480px) 400px, (max-width: 768px) 640px, (max-width: 1024px) 832px, (max-width: 1280px) 1088px, 1088px"`. **No LCP `<link rel="preload">`** — the `fetchpriority="high"` on the tag itself is enough for this site.
- Icons are **inline SVGs** (menu/close/toast/download arrow/arrow-left). No icon font, no icon library — Material Symbols was removed (saved 3.8 MB). Decorative SVGs must have `aria-hidden="true"`.
- **Scripts are in `src/scripts/*.ts`** — no complex logic inside `<script>` blocks in `.astro` files. Each component imports a `<script>` block of 2-4 lines that imports and calls `inicializar*()`. Listeners use `astro:page-load` + `astro:after-swap` so they bind to the new DOM after each `<ClientRouter />` swap. Uses `data-inicializado` guard to avoid duplicates.
- **HTML semantics:** prefer `<header>` (per section), `<article>` (self-contained content like projects/experience/categories), `<figure>` (images), `<address>` (contact info, with `not-italic`), `<time datetime="YYYY-MM">` (periods), `<ul>/<li>` (nav menus and tool/tech lists). Layout wrappers stay as `<div>`. Do not replace these with `<div>`s.

## TypeScript patterns

- **`querySelector<T>()`** for DOM lookups (never `getElementById` + `as` assertion). The generic parameter narrows the type natively.
- **`as const satisfies`** for all data exports in `src/data/`. Preserves literal types while enforcing the interface contract.
- **`readonly`** on all properties of data interfaces (`Sitio`, `Experiencia`, `CategoriaTecnologia`, etc.) and on array exports.
- **Type exports only** in `src/types/`. No runtime values, no logic.
- **Explicit return types** (`: void`, `: string`) on all exported functions.
- **JSDoc** on every exported function and public module. Describe *what*, not *how*.
- **Astro event types** (`BeforeSwapEvento`, `BeforePreparationEvento`) defined in `src/types/eventos-astro.ts`. Never use `any` for Astro SPA events.
- **`Content` prop** in `ProyectoDetalle.astro` typed as `AstroComponentFactory` from `astro/runtime/server/index.js` — never `any`.

## View Transitions (Astro 7 `<ClientRouter />`)

- Enabled in `Layout.astro` with `<ClientRouter />` inside `<head>` (after `<Font>`).
- `Cabecera` and `PiePagina` have `transition:persist` so they don't re-render on navigation (preserves the mobile menu state and social link hovers).
- Each project image carries `transition:name={`proyecto-${id}`}` to animate as a shared element between the listing (`TarjetaProyecto`) and the detail (`ProyectoDetalle`).
- `<a data-astro-history="auto">` is the default → click on "Volver" creates a new entry and the scroll position is automatically restored with the browser's back button.
- Scripts with listeners use `astro:page-load` + `astro:after-swap` to re-bind to the new DOM.
- `prefers-reduced-motion: reduce` disables `::view-transition-old/new/group(*)` with an explicit override.

## Contact form (`Contacto.astro`)

- Netlify Forms: `data-netlify="true"`, `netlify-honeypot="bot-field"`. Hidden inputs: `form-name="contacto"` and the `bot-field` honeypot.
- `form name="contacto"` — every field needs a `name` attribute for Netlify capture.
- Client-side fetch POSTs to `/` with `Content-Type: application/x-www-form-urlencoded`; shows a 4s toast (`#toast`) on success/error. Don't change the form action or method or Netlify will stop capturing.

## Navigation / a11y

- One-page anchors: `#sobre-mi`, `#experiencia`, `#proyectos`, `#tecnologias`, `#contacto`. `Cabecera` and the mobile menu link to these.
- `index.astro` has a `Skip to main content` link (sr-only → focused).
- Header is fixed with `bg-surface/90 backdrop-blur-sm`; sections set `scroll-margin-top: 80px` (via `global.css`).

## Known gaps

- `_headers` / `security.txt` not configured (project is deployed on Netlify with default headers; tighten if you need CSP/HSTS).
- No automated test suite, no CI, no `format`/`lint` npm script (Prettier is editor-only).

## Repo-local OpenCode

- `.opencode/commands/super-commit.md` — `super-commit` command: groups changes and writes Conventional Commits in **Spanish**, imperative mood, max 72 chars. Types: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `perf`, `chore`, `ci`, `build`, `revert`. Always `git add <file>` (never `-A` or `.`). Skip secrets (`.env`, `*.key`, `*.secret`).
- Skills under `.opencode/skills/` (accessibility, best-practices, core-web-vitals, frontend-design, performance, seo, tailwind-css-patterns, typescript-advanced-types, web-quality-audit) — load with the `skill` tool when relevant.

## Deploy

- Target: **Netlify** (`site: https://juanfc03.netlify.app` in `astro.config.mjs`). Contact form only works when deployed there.
