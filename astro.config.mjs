// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { EventEmitter } from 'events';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

EventEmitter.defaultMaxListeners = 20;

// https://astro.build/config
export default defineConfig({
  site: 'https://juanfc03.netlify.app',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
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
  ],
});
