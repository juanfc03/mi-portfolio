# Portfolio Editorial — Juan Fernández Ceacero

Portfolio personal de Ingeniería Informática con diseño editorial minimalista.

## Stack

- **Astro 6** — Framework estático
- **Tailwind CSS 4** — Estilos via `@tailwindcss/vite`
- **TypeScript** — Tipado estricto
- **Fonts API** — JetBrains Mono + Material Symbols (servidos localmente)

## Comandos

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Previsualizar build local |
| `npm run check` | Verificación de tipos con Astro |

## Estructura

```
src/
├── components/     # Componentes Astro (español)
│   ├── Cabecera.astro
│   ├── Inicio.astro
│   ├── SobreMi.astro
│   ├── Experiencia.astro
│   ├── Proyectos.astro
│   ├── Tecnologias.astro
│   ├── Contacto.astro
│   └── PiePagina.astro
├── layouts/        # Layout principal
├── pages/          # Routing (index.astro)
├── styles/         # global.css con tokens de diseño
└── assets/         # Imágenes optimizadas
```

## Despliegue

El formulario de contacto usa **Netlify Forms** con honeypantispam. Desplegar en Netlify para que funcione.
