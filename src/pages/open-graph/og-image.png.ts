import { generateOpenGraphImage } from 'astro-og-canvas';
import type { APIRoute } from 'astro';
import { SITIO } from '@/data/sitio';

const descripcion = `${SITIO.rol}\n${SITIO.universidad}\n\n${SITIO.url.replace('https://', '')}`;

export const GET: APIRoute = async () =>
  new Response(
    await generateOpenGraphImage({
      title: SITIO.nombre,
      description: descripcion,
      bgGradient: [[251, 249, 249]],
      padding: 100,
      border: {
        color: [27, 28, 28],
        width: 24,
        side: 'block-start',
      },
      font: {
        title: {
          color: [27, 28, 28],
          size: 100,
          weight: 'Bold',
          lineHeight: 1.05,
          families: ['JetBrains Mono'],
        },
        description: {
          color: [68, 71, 72],
          size: 34,
          weight: 'Normal',
          lineHeight: 1.5,
          families: ['JetBrains Mono'],
        },
      },
      fonts: [
        'https://api.fontsource.org/v1/fonts/jetbrains-mono/latin-400-normal.ttf',
        'https://api.fontsource.org/v1/fonts/jetbrains-mono/latin-500-normal.ttf',
        'https://api.fontsource.org/v1/fonts/jetbrains-mono/latin-700-normal.ttf',
      ],
    }),
  );
