import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://maverick-field-notes.maverick28.chatgpt.site',
  trailingSlash: 'always',
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
  devToolbar: { enabled: false },
});
