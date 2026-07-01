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
}

/**
 * Fuente única de verdad con los datos identificativos del sitio.
 * Consumida por Layout.astro, Contacto.astro, Proyectos.astro y PiePagina.astro.
 * No hardcodear estos valores en componentes ni en el JSON-LD.
 */
export const SITIO: Sitio = {
  nombre: 'Juan Fernández Ceacero',
  rol: 'Ingeniero Informático',
  url: 'https://juanfc03.netlify.app',
  correo: 'juanf.ceacero@gmail.com',
  telefono: '+34622384951',
  telefonoVisible: '622384951',
  enlaceWhatsapp: 'https://wa.me/34622384951?text=%C2%A1Hola%20Juan!',
  enlaceLinkedin: 'https://www.linkedin.com/in/juan-fern%C3%A1ndez-ceacero',
  enlaceGithub: 'https://github.com/juanfc03',
  universidad: 'Universidad de Jaén',
  descripcion:
    'Ingeniero informático full stack especializado en Laravel, Spring Boot, Astro y Tailwind. Disponible para nuevas oportunidades.',
  descripcionCorta:
    'Ingeniero informático recién graduado especializado en desarrollo web full stack.',
} as const;
