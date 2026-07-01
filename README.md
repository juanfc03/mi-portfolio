# Portfolio Editorial — Juan Fernández Ceacero

Portfolio personal de Ingeniería Informática con diseño editorial minimalista (sistema Mono Archive, JetBrains Mono exclusivo, esquinas a 90°, sin sombras).

## Stack

- **Astro 7** — Framework estático
- **Tailwind CSS 4** — Estilos via `@tailwindcss/vite` (sin `tailwind.config.*`; tokens en `@theme inline`)
- **TypeScript** — Tipado estricto (`astro/tsconfigs/strict`)
- **Fonts API** — JetBrains Mono local vía `fontProviders.fontsource()` (sin CDN, sin icon font)

## Comandos

| Comando           | Acción                                          |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`      |
| `npm run build`   | Build de producción en `./dist/`                |
| `npm run preview` | Previsualizar build local                       |
| `npm run check`   | Verificación de tipos con Astro (`astro check`) |

## Estructura

```
src/
├── components/     # 8 componentes Astro (nombres en español)
│   ├── Cabecera.astro        # Nav + menú móvil (header sticky)
│   ├── Inicio.astro          # Hero con retrato (LCP)
│   ├── SobreMi.astro         # Bio + descarga de CV
│   ├── Experiencia.astro     # Artículos de experiencia (<article>)
│   ├── Proyectos.astro       # Artículos de proyecto con <figure>
│   ├── Tecnologias.astro     # Stack agrupado en <article> por categoría
│   ├── Contacto.astro        # <address> + formulario Netlify Forms
│   └── PiePagina.astro       # Copyright + redes sociales
├── data/
│   └── sitio.ts        # Única fuente de verdad (nombre, rol, correo, redes, etc.)
├── layouts/
│   └── Layout.astro   # <head>, meta, JSON-LD Person, manifest deferral
├── pages/
│   └── index.astro    # Skip link + secciones
├── styles/
│   └── global.css     # Tokens @theme + resets + :focus-visible
└── assets/            # Imágenes fuente (PNG, importadas vía astro:assets)
public/
├── favicon.svg / favicon.ico / favicon-96x96.png
├── apple-touch-icon.png
├── og-image.png        # 1200×630 social card
├── site.webmanifest    # PWA
├── robots.txt
└── CV_Juan_Fernandez_Ceacero.pdf
```

## Despliegue

El sitio se despliega en **Netlify** (`https://juanfc03.netlify.app`). El formulario de contacto usa **Netlify Forms** con honeypot — solo captura submissions cuando se publica allí. PWA manifest se inyecta en runtime vía `requestIdleCallback` para sacarlo del critical path.
