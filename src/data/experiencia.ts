import type { Experiencia } from '@/types/experiencia';

export const experiencias: readonly Experiencia[] = [
  {
    empresa: 'Innovation Studio',
    puesto: 'Desarrollador de aplicaciones web',
    fechaInicio: '2025-10',
    fechaFin: '2025-12',
    duracion: '3 meses',
    ubicacion: 'Jaén, Andalucía, España · Híbrido',
    descripcion:
      'Colaboración en el desarrollo y mantenimiento de aplicaciones web (PHP/Laravel), participando en todo el ciclo de vida del software, desde el diseño hasta las pruebas y subida a producción. Responsable de la migración y actualización de proyectos heredados a las últimas versiones del framework, siendo capaz de actualizar dependencias y adaptar el código para mejorar la mantenibilidad y el rendimiento respecto a versiones anteriores. Implementación de nuevas funcionalidades con flujo de trabajo basado en Git.',
  },
] as const satisfies readonly Experiencia[];
