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
      'Colaboración en el desarrollo y mantenimiento de páginas web utilizando PHP y Laravel. Participación en el ciclo completo de desarrollo, incluyendo diseño de funcionalidades, implementación y pruebas. Migración de proyectos antiguos a las últimas versiones de Laravel.',
  },
] as const satisfies readonly Experiencia[];
