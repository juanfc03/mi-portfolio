---
titulo: 'Landing page para una psicóloga'
descripcion:
  'Desarrollo de una página web profesional para una psicóloga, con diseño responsive, secciones de servicios, testimonios y sistema de contacto. Optimizada para SEO y rendimiento.'
herramientas: ['Astro', 'Tailwind CSS', 'Netlify Forms', 'RGPD']
demoUrl: 'https://rosamruizpsicologa.es/'
repositorioUrl: 'https://github.com/juanfc03/rosamr-web-psicologia'
imagen: '../../assets/proyecto-rosa.png'
imagenAlt: 'Página web de psicóloga profesional'
imagenIzquierda: false
orden: 2
---

## El encargo

Rosa, psicóloga clínica, necesitaba una presencia online que transmitiera
cercanía sin renunciar al rigor profesional. El briefing pedía un sitio
minimalista, sin estridencias, con una paleta sobria y tipografía legible. La
prioridad era que la visitante pudiera conocer los servicios, leer
testimonios reales y solicitar cita en menos de tres clics.

## Estructura

La página se compone de secciones independientes: hero con propuesta de valor,
presentación de la profesional, servicios detallados, tarifas, FAQ y un
formulario de contacto. Cada bloque se diseñó para leerse de forma autónoma,
lo que permite a la visitante detenerse en el punto que más le interese sin
perder el hilo narrativo.

## Rendimiento y SEO

La web se construyó con **Astro** para generar HTML estático y minimizar el
JavaScript enviado al cliente. Se trabajó el marcado semántico, los
metadatos Open Graph y la jerarquía de encabezados para mejorar el
posicionamiento en buscadores locales. Las imágenes se sirven en formatos
modernos con `srcset` para adaptarse a cada dispositivo.

## Despliegue

El sitio se publica en **Netlify** con despliegues automáticos desde la rama
principal. El formulario de contacto utiliza **Netlify Forms** con *honeypot*
anti-spam, lo que evita mantener un backend solo para esa funcionalidad.
