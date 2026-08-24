import type { CategoriaTecnologia } from '@/types/tecnologia';

export const categorias: readonly CategoriaTecnologia[] = [
  {
    nombre: 'Lenguajes',
    tecnologias: ['PHP', 'Java', 'Python', 'JavaScript / TypeScript', 'C++'],
  },
  {
    nombre: 'Backend',
    tecnologias: ['Laravel', 'Livewire', 'Spring Boot', 'PostgreSQL', 'MySQL'],
  },
  {
    nombre: 'Frontend',
    tecnologias: ['Astro', 'Tailwind CSS', 'Alpine.js'],
  },
  {
    nombre: 'Inteligencia Artificial',
    tecnologias: ['Agentes de IA', 'RAG', 'MCP', 'LLMs'],
  },
  {
    nombre: 'Herramientas',
    tecnologias: [
      'Git',
      'Docker',
      'Postman',
      'AWS (en aprendizaje)',
      'Azure (en aprendizaje)',
    ],
  },
  {
    nombre: 'Metodología',
    tecnologias: ['Scrum', 'Kanban'],
  },
] as const satisfies readonly CategoriaTecnologia[];
