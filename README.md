# Maverick’s blog

A quiet, Markdown-based blog about data, AI, analytics engineering, leadership, dbt, and Microsoft Fabric. Built with Astro, with a static HTML page for every post.

## Run locally

Use Node.js 22.23.4 or later (Astro 7). This project was verified with Node 24.19.

```sh
npm install
npm run dev
```

Open the local address printed in the terminal. Changes to posts and styles appear automatically. For a production build, run `npm run build`. The portable website is in `dist/`; `npm run preview` serves that build.

## Write a post

1. Copy `templates/new-post.md` into `src/content/posts/`.
2. Name it with a URL-friendly filename, such as `building-trust-in-data.md`.
3. Edit its title, description, date, topics, and body in any Markdown editor, including Obsidian.
4. Set `draft: false` when ready. Set `featured: true` to feature it on the home page. If multiple posts are featured, the newest wins.
5. Build and deploy the site to update the hosted version. Saving a local file does not automatically publish it.

The filename becomes `/writing/building-trust-in-data/`. Drafts and future-dated posts are excluded from pages, search, and RSS. Dates are treated as UTC calendar dates; a future-dated post appears only after a new build. The template stays outside the content folder so it cannot be published accidentally.

The six initial essays are **sample content**, marked `sample: true`. Replace or remove them before launching your personal writing publicly. Update the introductory copy in `src/pages/index.astro` and `src/pages/about.astro` to match your voice.

Refer to the site as a blog. Use commas, colons, parentheses, or separate sentences instead of em dashes in all site copy.

## Markdown features

Headings, lists, quotes, tables, fenced code with syntax highlighting, inline code, images, and normal Markdown links are supported. Article headings automatically create the “In this note” contents list.

```md
[A related note](/writing/documentation-is-part-of-the-product/)
![A description of the image](/images/my-image.jpg)
```

Store images in `public/images/`. For a two-column gallery like the reference, use HTML within Markdown:

```html
<div class="image-grid">
  <img src="/images/first.jpg" alt="Describe the first image" loading="lazy" />
  <img src="/images/second.jpg" alt="Describe the second image" loading="lazy" />
</div>
```

The flow and documentation sample posts show full-width photographs with captions. Their image sources and license are recorded in `public/images/posts/credits.md`.

Use standard Markdown links in Obsidian. Obsidian-specific `[[wikilinks]]`, embeds, and plugins are not interpreted by this site.

## Customize

- Colors, spacing, typography, mobile layout: `src/styles/global.css`
- Navigation, name, footer: `src/layouts/Layout.astro`
- Topic labels and descriptions: `src/lib/posts.ts`
- Site URL and code themes: `astro.config.mjs`
- RSS: generated at `/rss.xml`
- Search: generated at `/search.json`, searched in the visitor’s browser

Add topics to the `topics` list via `topicDescriptions` to include them in navigation. Any topic used in a published post gets its own topic page automatically. Keep topic spelling and capitalization consistent.

The light theme is the default. The moon/sun control stores the preference locally. Search opens with the sidebar button or Ctrl/Cmd K. On phones, use the menu button to open navigation and theme controls. Reduced-motion preferences are respected. Inter is served locally, with its license in `public/fonts/OFL.txt`. There are no third-party font requests, advertising, or analytics scripts.

## Hosting

The project is configured for a Sites deployment. `.openai/hosting.json` contains its identity and declares `dist` as the static output. The blog is also portable to static hosts that support directory-based routes. Set `site` in `astro.config.mjs` to your final domain before publishing elsewhere so canonical links and RSS use the correct origin. Static hosting should serve `404.html` for unknown routes.

## Design references

[Steph Ango](https://stephango.com/) and the supplied Obsidian Minimal theme screenshots informed the reading width, restrained navigation, typography, and theme support. Sample essays are original illustrative copy.
