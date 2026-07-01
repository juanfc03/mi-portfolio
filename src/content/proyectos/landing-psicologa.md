---
titulo: 'Landing page para una psicóloga general sanitaria'
descripcion:
  'Página web profesional para una psicóloga general sanitaria, con diseño responsive, secciones de servicios, testimonios y contacto. Cumplimiento estricto de RGPD y normativa de cookies.'
herramientas: ['Astro', 'Tailwind CSS', 'Netlify Forms', 'RGPD']
demoUrl: 'https://rosamruizpsicologa.es/'
repositorioUrl: 'https://github.com/juanfc03/rosamr-web-psicologia'
imagen: '../../assets/proyecto-rosa.png'
imagenAlt: 'Página web de psicóloga profesional'
imagenIzquierda: false
orden: 2
codigo:
  - '<!-- Banner de cookies RGPD -->'
  - '<div class="cookie-banner" role="dialog">'
  - '  <p>Usamos cookies para mejorar tu experiencia.</p>'
  - '  <button data-action="accept">Aceptar</button>'
  - '  <a href="/politica-de-cookies">Configurar</a>'
  - '</div>'
---


## El encargo

Rosa, psicóloga general sanitaria, necesitaba una presencia online que
transmitiera cercanía sin renunciar al rigor profesional. El proyecto requería
un sitio minimalista, sin estridencias, con una paleta sobria y tipografía
legible. La prioridad era que la visitante pudiera conocer los servicios, leer
testimonios reales y solicitar cita en menos de tres clics.

## Estructura

La página se compone de secciones independientes: hero con propuesta de valor,
presentación de la profesional, servicios detallados, tarifas, preguntas
frecuentes y un formulario de contacto. Cada bloque se diseñó para leerse de
forma autónoma, lo que permite a la visitante detenerse en el punto que más le
interese sin perder el hilo narrativo.

## RGPD y cumplimiento normativo

Se hizo especial hincapié en el cumplimiento del **RGPD** y la normativa de
cookies vigente en España. La web incluye un banner de consentimiento explícito
con opciones de aceptación y configuración granular, política de privacidad
redactada a medida según la actividad profesional sanitaria, y aviso legal
adaptado al sector. Todos los formularios incluyen checkboxes de consentimiento
explícito y los datos se tratan con las garantías que exige la ley para
profesionales del ámbito de la salud.

## Rendimiento y SEO

La web se construyó con **Astro** para generar HTML estático y minimizar el
JavaScript enviado al cliente. Alcanza una puntuación de **100 en Lighthouse**
en rendimiento, accesibilidad, buenas prácticas y SEO. Se trabajó el marcado
semántico, los metadatos Open Graph y la jerarquía de encabezados para mejorar
el posicionamiento en buscadores locales.

## Despliegue

El sitio se publica en **Netlify** con despliegues automáticos desde la rama
principal. El formulario de contacto utiliza **Netlify Forms** con *honeypot*
anti-spam, lo que evita mantener un backend solo para esa funcionalidad.
