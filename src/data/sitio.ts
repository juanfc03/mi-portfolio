/**
 * Tipado estricto de la fuente única de verdad del sitio.
 * Todas las propiedades son inmutables (`readonly`) para evitar
 * reasignaciones accidentales desde los consumidores.
 */
export interface Sitio {
  readonly nombre: string;
  readonly rol: string;
  readonly url: string;
  readonly correo: string;
  readonly telefono: string;
  readonly telefonoVisible: string;
  readonly enlaceWhatsapp: string;
  readonly enlaceLinkedin: string;
  readonly enlaceGithub: string;
  readonly universidad: string;
  readonly descripcion: string;
  readonly descripcionCorta: string;
  readonly knowsAbout: readonly string[];
}

/**
 * Fuente única de verdad con los datos identificativos del sitio.
 * Consumida por Layout.astro, Contacto.astro, Proyectos.astro y PiePagina.astro.
 * No hardcodear estos valores en componentes ni en el JSON-LD.
 */
export const SITIO = {
  nombre: 'Juan Fernández Ceacero',
  rol: 'Ingeniero informático',
  url: 'https://juanfc03.netlify.app',
  correo: 'juanf.ceacero@gmail.com',
  telefono: '+34622384951',
  telefonoVisible: '622384951',
  enlaceWhatsapp: 'https://wa.me/34622384951?text=%C2%A1Hola%20Juan!',
  enlaceLinkedin: 'https://www.linkedin.com/in/juan-fern%C3%A1ndez-ceacero',
  enlaceGithub: 'https://github.com/juanfc03',
  universidad: 'Universidad de Jaén',
  descripcion:
    'Ingeniero informático especializado en la ingeniería del software con experiencia en desarrollo web e integración de IA en el ciclo de desarrollo. Disponible para nuevas oportunidades, incluyendo consultoría tecnológica.',
  descripcionCorta:
    'Ingeniero informático recién graduado especializado en la ingeniería del software.',
  knowsAbout: [
    'PHP',
    'Laravel',
    'JavaScript',
    'TypeScript',
    'Java',
    'Spring Boot',
    'Astro',
    'Tailwind CSS',
    'PostgreSQL',
    'MySQL',
  ],
} as const satisfies Sitio;
