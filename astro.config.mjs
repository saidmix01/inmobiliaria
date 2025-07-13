import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
    port: process.env.PORT || 8080 // 👈 esta línea es clave
  }),
  integrations: [vue()]
});
