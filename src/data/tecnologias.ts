import type { CategoriaTecnologia } from '@/types/tecnologia';

export const categorias: readonly CategoriaTecnologia[] = [
  {
    nombre: 'Lenguajes',
    tecnologias: ['PHP', 'Java', 'JavaScript / TypeScript'],
  },
  {
    nombre: 'Backend',
    tecnologias: ['Laravel', 'Livewire', 'Spring Boot', 'PostgreSQL', 'MySQL'],
  },
  {
    nombre: 'Frontend',
    tecnologias: ['Astro', 'Tailwind CSS', 'Livewire'],
  },
  {
    nombre: 'Herramientas',
    tecnologias: ['Git', 'Agentes de IA'],
  },
] as const satisfies readonly CategoriaTecnologia[];
