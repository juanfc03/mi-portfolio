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
      'Desarrollo y mantenimiento de aplicaciones web a medida con PHP y Laravel, principalmente software interno de gestión y facturación para clientes. Participé en todo el ciclo de vida del software, desde el diseño de funcionalidades hasta las pruebas y la subida a producción. También me encargué de actualizar proyectos existentes a versiones recientes del framework, actualizando dependencias y adaptando el código para mejorar su mantenibilidad y rendimiento, con un flujo de trabajo basado en Git.',
  },
] as const satisfies readonly Experiencia[];
