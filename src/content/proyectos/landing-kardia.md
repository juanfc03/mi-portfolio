---
titulo: 'Landing page para un centro de formación'
descripcion:
  'Página web moderna y de alto rendimiento enfocada en la velocidad de carga, accesibilidad y la gestión de formularios con Netlify Forms.'
herramientas: ['Astro', 'Tailwind CSS', 'Netlify Forms']
demoUrl: 'https://kardiaformacion.es/'
repositorioUrl: 'https://github.com/juanfc03/maysu-web-formacion'
imagen: '../../assets/proyecto-kardia.png'
imagenAlt: 'Landing page de centro de formación profesional'
imagenIzquierda: true
orden: 3
---

## El proyecto

Kardia Formación necesitaba una web institucional que presentara su catálogo
de cursos, facilitase la preinscripción y reflejara la seriedad de un centro
con años de trayectoria. El reto era construir algo rápido, accesible y fácil
de mantener por personas no técnicas.

## Arquitectura estática

Se optó por una arquitectura **estática** generada con **Astro** y servida
desde **Netlify**. Esta combinación ofrece tiempos de carga mínimos, costes
de infraestructura prácticamente nulos y una superficie de ataque muy
reducida. El contenido se almacena en archivos markdown versionados, lo que
permite editar textos sin tocar código.

## Accesibilidad

Se siguieron las pautas **WCAG 2.2** desde el inicio: contraste suficiente,
navegación por teclado, etiquetas ARIA en componentes interactivos y soporte
para `prefers-reduced-motion`. La web se validó con lectores de pantalla y
herramientas automáticas antes de cada despliegue.

## Formularios sin servidor

El formulario de preinscripción se integra con **Netlify Forms**, que
procesa los envíos sin necesidad de un backend propio. Se añadió un
*honeypot* para filtrar el spam y notificaciones por correo para que el
equipo de admisiones reciba cada solicitud en tiempo real.
