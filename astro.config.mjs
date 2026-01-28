import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import edgeoneAdapter from "@edgeone/astro";
import tailwind from "@astrojs/tailwind";


// https://astro.build/config
export default defineConfig({
  adapter: edgeoneAdapter(),
  integrations: [react(), tailwind()]
});