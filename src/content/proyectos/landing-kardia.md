---
titulo: 'Landing page para un centro de formación'
descripcion:
  'Página web estática y de alto rendimiento para un centro de formación profesional. Alcanza 100 en Lighthouse en todas las categorías.'
herramientas: ['Astro', 'Tailwind CSS', 'Netlify Forms']
demoUrl: 'https://kardiaformacion.es/'
repositorioUrl: 'https://github.com/juanfc03/maysu-web-formacion'
imagen: '../../assets/proyecto-kardia.png'
imagenAlt: 'Landing page de centro de formación profesional'
imagenIzquierda: true
orden: 3
codigo:
  - '<form name="preinscripcion" data-netlify="true">'
  - '  <input type="text" name="nombre" required />'
  - '  <select name="curso">'
  - '    {cursos.map(c => ('
  - '      <option value={c.slug}>{c.titulo}</option>'
  - '    ))}'
  - '  </select>'
  - '</form>'
---

## El proyecto

Kardia Formación necesitaba una web institucional que presentara su catálogo
de cursos, facilitase la preinscripción y reflejara la seriedad de un centro
formativo.

## Estática y rápida

Construida con **Astro** y servida desde **Netlify**, la web genera HTML
estático en el momento del despliegue. Esto se traduce en tiempos de carga
mínimos, costes de infraestructura casi nulos y una superficie de ataque muy
reducida. Alcanza una puntuación de **100 en Lighthouse** en todas las
categorías.

## Accesibilidad

Se siguieron las pautas **WCAG 2.2** desde el inicio: contraste suficiente y
navegación por teclado. La web se validó con lectores de pantalla y
herramientas automáticas antes de cada despliegue.

## Formularios sin servidor

El formulario de preinscripción se integra con **Netlify Forms**, que procesa
los envíos sin necesidad de un backend propio. Se añadió un *honeypot* para
filtrar el spam y notificaciones por correo para que el equipo de admisiones
reciba cada solicitud en tiempo real.
