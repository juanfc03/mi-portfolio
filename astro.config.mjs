// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://juanfc03.netlify.app',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  fonts: [
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.fontsource(),
      weights: [400, 500, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
  integrations: [
    sitemap(),
    {
      name: 'increase-max-listeners',
      hooks: {
        'astro:server:setup': ({ server }) => {
          server.httpServer?.setMaxListeners(20);
        },
      },
    },
  ],
});
