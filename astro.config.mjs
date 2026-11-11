import { defineConfig } from 'astro/config';

const base = (process.env.BASE_PATH ?? '/Maverick-s-Blog').replace(/\/$/, '');

export default defineConfig({
  site: process.env.SITE_URL || 'https://raskol91.github.io',
  base: base || '/',
  trailingSlash: 'always',
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
  devToolbar: { enabled: false },
});
