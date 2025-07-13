import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel/static'; // << ESTA ES LA CLAVE

export default defineConfig({
  integrations: [vue()],
  adapter: vercel(),
  output: 'static'
});
