// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Static by default, but pages with `export const prerender = false` are SSR
  // This allows article detail pages and the contact API to render server-side
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel(),
});