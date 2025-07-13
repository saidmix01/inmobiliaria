import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import netlify from '@astrojs/netlify/functions'

export default defineConfig({
  output: 'server', // Astro SSR
  adapter: netlify(),
  integrations: [vue()]
})
