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
- `src/pages/proyectos/[slug].astro` — detalle dinámico por proyecto (con `getStaticPaths()`). La URL `/proyectos/` redirige a `/` mediante `Astro.redirect('/')` + `public/_redirects` (301 en Netlify).
- `src/layouts/Layout.astro` — `<head>`, meta/OG/Twitter/JSON-LD Person schema, `<ClientRouter />` (Astro View Transitions), `<Cabecera transition:persist />`, `<PiePagina transition:persist />`, default `title`/`description` props. Los scripts inline de manifest PWA y rastreo de rutas están extraídos a `src/scripts/manifest-pwa.ts` y `src/scripts/rastreo-rutas.ts`.
- `src/components/` — Astro components named in **Spanish** (Cabecera, Inicio, SobreMi, Experiencia, Proyectos, TarjetaProyecto, ProyectoDetalle, Tecnologias, Contacto, PiePagina). Keep naming in Spanish to match the rest.
- `src/scripts/` — **Lógica de cliente 100% TypeScript**, extraída de los bloques `<script>` inline de los `.astro`. Cada fichero exporta una función `inicializar*` que los componentes importan y registran con `astro:page-load` / `astro:after-swap`. Todos usan `querySelector<T>()` con tipos genéricos nativos (nunca `as` assertions con `getElementById`). Los eventos de Astro (`astro:before-swap`, `astro:before-preparation`) están tipados en `src/types/eventos-astro.ts`.
- `src/types/` — Interfaces y tipos reutilizables. Solo **type exports** (sin lógica, sin valores). Usar `readonly` en propiedades de interfaces de datos.
- `src/data/` — Arrays y objetos de datos estáticos. Exportan con `as const satisfies` para preservar literales y forzar validación de tipo sin widening. Sin lógica, sin imports de librerías externas.
- `src/utils/` — Funciones puras compartidas (formateo de fechas, etc.). Tipos de retorno explícitos, JSDoc obligatorio.
- `src/content.config.ts` — define la **content collection** `proyectos` validada con Zod (`z.object` + `image()` de Astro Schema). Loader `glob` desde `src/content/proyectos/`.
- `src/content/proyectos/*.md` — entradas markdown de cada proyecto (frontmatter + body con descripción larga).
- `src/styles/global.css` — `@theme inline` (Mono Archive tokens actually used by the components), `address { font-style: normal }` reset, `section[id], main[id] { scroll-margin-top: 80px }` for fixed-header offset, `.js-reveal`/`.is-visible` reveal classes, `prefers-reduced-motion` reset con override explícito de `::view-transition-*`, `:focus-visible` outline (2px solid `--color-primary`).
- `src/styles/proyecto-detalle.css` — Estilos específicos de la página de detalle: animación `detalle-reveal`, `@keyframes detalle-reveal`, y estilos de prosa para el markdown renderizado (`.detalle-contenido`). Sin `:global()` ya que es CSS plano importado.
- `src/assets/` — `retrato-mio.png`, `proyecto-tfg.png`, `proyecto-rosa.png`, `proyecto-kardia.png`. Use `<Image>` from `astro:assets`; never reference these from `/public/`.
- `src/data/sitio.ts` — **fuente única de verdad** con los datos identificativos del sitio (incluye `knowsAbout` para JSON-LD). Tipado estricto con `interface Sitio` (propiedades `readonly`). Exporta con `as const satisfies Sitio`. Se importa en `Layout.astro`, `PiePagina.astro`, `Contacto.astro` y `Proyectos.astro`. No hardcodear estos valores en componentes ni en el JSON-LD.
- `public/` — `favicon.svg`, `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `og-image.png` (1200×630 social card), `site.webmanifest`, `robots.txt`, `CV_Juan_Fernandez_Ceacero.pdf`. Served as-is. (`web-app-manifest-*.png` are auto-generated by Astro for PWA icons.)
- `.astro/`, `dist/` — generated, gitignored.

## Design system (Mono Archive)

Authoritative source: `DESIGN.md` + `src/styles/global.css`. Style is **sharp (0px radius), monochromatic + muted emerald secondary, no shadows**. Use the registered tokens (`text-headline-lg`, `bg-surface`, `border-outline-variant`, `text-on-surface-variant`, etc.) instead of ad-hoc hex/classes. Every UI element must be sharp-cornered (DESIGN.md "Shapes"). Hover = invert fill or opacity change, never shadow.

Typography is **JetBrains Mono only** — all `--font-*` tokens map to `--font-jetbrains-mono`. Hierarchy comes from size/weight, not font swaps.

## Component conventions

- Data arrays in frontmatter typed with `interface` (e.g. `Proyecto` en `Proyectos.astro:7`), iterated with `.map()`. Los proyectos vienen de la **content collection** (`await getCollection('proyectos')` ordenado por `data.orden`). Datos reutilizables se extraen a `src/data/` con `as const satisfies`.
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

- Activado en `Layout.astro` con `<ClientRouter />` dentro de `<head>` (después de `<Font>`).
- `Cabecera` y `PiePagina` tienen `transition:persist` para que no se re-rendericen al navegar (mantiene estado del menú móvil y de los hovers de redes sociales).
- Cada imagen de proyecto lleva `transition:name={`proyecto-${id}`}` para animar como shared element entre el listado (`TarjetaProyecto`) y el detalle (`ProyectoDetalle`).
- `<a data-astro-history="auto">` es el default → click en "Volver" crea nueva entrada y la posición de scroll se restaura automáticamente con el botón back del navegador.
- Scripts con listeners usan `astro:page-load` + `astro:after-swap` para re-bindear al nuevo DOM.
- `prefers-reduced-motion: reduce` desactiva `::view-transition-old/new/group(*)` con override explícito.

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
