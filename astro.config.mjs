// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Absolute URLs need a base. Without it Astro cannot build a canonical link,
  // and both thomasjoyeux.dev and the *.pages.dev deployment serve the same
  // pages with nothing telling a crawler which one counts.
  site: 'https://thomasjoyeux.dev',
  integrations: [mdx()]
});