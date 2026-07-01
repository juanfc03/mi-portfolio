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
├── components/           # Componentes Astro (nombres en español, lógica extraída a scripts/)
│   ├── Cabecera.astro        # Nav sticky con menú móvil, DRY con SECCIONES_NAV.map()
│   ├── Inicio.astro          # Hero con retrato (LCP)
│   ├── SobreMi.astro         # Bio + descarga de CV
│   ├── Experiencia.astro     # Artículos de experiencia (importa de data/experiencia.ts)
│   ├── Proyectos.astro       # Listado de proyectos de la content collection
│   ├── TarjetaProyecto.astro # Tarjeta con transition:name compartido con detalle
│   ├── ProyectoDetalle.astro # Detalle con reveal animations + "Volver" SPA-aware
│   ├── Tecnologias.astro     # Stack agrupado por categoría (importa de data/tecnologias.ts)
│   ├── Contacto.astro        # <address> + formulario Netlify Forms + toast
│   └── PiePagina.astro       # Copyright + redes sociales (transition:persist)
├── content/
│   └── proyectos/       # Content collection (markdown) validada con Zod en content.config.ts
├── data/                # Datos estáticos tipados, sin lógica
│   ├── sitio.ts             # Fuente única de verdad (SITIO, interfaz Sitio)
│   ├── experiencia.ts       # Array de experiencias laborales (as const satisfies)
│   └── tecnologias.ts       # Categorías de tecnologías (as const satisfies)
├── layouts/
│   └── Layout.astro     # <head>, meta/OG/Twitter, JSON-LD, <ClientRouter />, manifest PWA
├── pages/
│   ├── index.astro          # Home con secciones + reveal-on-scroll
│   └── proyectos/
│       └── [slug].astro     # Detalle dinámico por proyecto (getStaticPaths)
├── scripts/             # Lógica de cliente extraída de <script> inline
│   ├── menu-movil.ts        # Alternancia del menú hamburguesa (←Cabecera)
│   ├── formulario-contacto.ts  # Envío Netlify Forms + toast (←Contacto)
│   ├── volver-detalle.ts    # Botón "Volver" SPA-aware con sessionStorage (←ProyectoDetalle)
│   ├── restauracion-scroll.ts  # Intercepta astro:before-swap (←ProyectoDetalle)
│   ├── manifest-pwa.ts      # Inyección diferida del manifest (←Layout)
│   ├── rastreo-rutas.ts     # Guarda ruta anterior en sessionStorage (←Layout)
│   └── revelar-scroll.ts    # IntersectionObserver reveal-on-scroll (←index)
├── types/               # Interfaces y tipos compartidos (solo type exports)
│   ├── experiencia.ts       # Interfaz Experiencia
│   ├── tecnologia.ts        # Interfaz CategoriaTecnologia
│   ├── eventos-astro.ts     # Tipos para eventos de Astro View Transitions
│   └── formulario.ts        # Tipo NotificacionTipo ('exito' | 'error')
├── utils/               # Funciones puras reutilizables
│   └── formato-fecha.ts     # Formateo ISO → español (ene 2025)
├── styles/
│   ├── global.css           # Tokens @theme inline + resets + reveal + reduced-motion
│   └── proyecto-detalle.css # Animaciones detalle-reveal y prosa markdown (←ProyectoDetalle)
└── assets/              # Imágenes fuente (PNG, importadas vía astro:assets)
public/
├── favicon.svg / favicon.ico / favicon-96x96.png
├── apple-touch-icon.png
├── og-image.png          # 1200×630 social card
├── site.webmanifest      # PWA
├── robots.txt
└── CV_Juan_Fernandez_Ceacero.pdf
```

## Despliegue

El sitio se despliega en **Netlify** (`https://juanfc03.netlify.app`). El formulario de contacto usa **Netlify Forms** con honeypot — solo captura submissions cuando se publica allí. PWA manifest se inyecta en runtime vía `requestIdleCallback` para sacarlo del critical path.
