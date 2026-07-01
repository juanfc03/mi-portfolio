import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      descripcion: z.string(),
      herramientas: z.array(z.string()),
      demoUrl: z.url(),
      repositorioUrl: z.url(),
      imagen: image(),
      imagenAlt: z.string(),
      imagenIzquierda: z.boolean(),
      orden: z.number(),
      codigo: z.array(z.string()).optional(),
    }),
});

export const collections = { proyectos };
