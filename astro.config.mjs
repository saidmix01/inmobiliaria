// astro.config.mjs
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel/static'; // 👈 Esto es lo importante

export default defineConfig({
  integrations: [vue()],
  output: 'static', // 👈 obligatorio para Vercel Static o Azure
  adapter: vercel(), // 👈 adaptador estático
});
