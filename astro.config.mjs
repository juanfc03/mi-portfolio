// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      provider: fontProviders.fontsource(),
      weights: [400, 500, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
    {
      name: "Material Symbols Outlined",
      cssVariable: "--font-material-symbols",
      provider: fontProviders.googleicons(),
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
