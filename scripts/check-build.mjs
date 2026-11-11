import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const base = (process.env.BASE_PATH ?? '/Maverick-s-Blog').replace(/\/$/, '');
const site = process.env.SITE_URL || 'https://raskol91.github.io';
const files = readdirSync('dist', { recursive: true }).filter(p => p.endsWith('.html'));
let checked = 0;
for (const file of files) {
  const html = readFileSync(join('dist', file), 'utf8');
  for (const [, value] of html.matchAll(/\b(?:href|src)="([^"\s]+)"/g)) {
    if (/^[a-z][a-z\d+.-]*:/i.test(value) || value.startsWith('//')) continue;
    const pagePath = relative('dist', join('dist', file)).replaceAll('\\', '/');
    const url = new URL(value.replaceAll('&amp;', '&'), `${site}${base}/${pagePath}`);
    assert(url.pathname.startsWith(`${base}/`), `${file}: path outside the blog: ${value}`);
    let target = join('dist', decodeURIComponent(url.pathname.slice(base.length)));
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
    assert(existsSync(target), `${file}: missing target: ${value}`);
    if (url.hash && target.endsWith('.html')) {
      const ids = [...readFileSync(target, 'utf8').matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
      assert(ids.includes(decodeURIComponent(url.hash.slice(1))), `${file}: missing anchor: ${value}`);
    }
    checked++;
  }
}
const posts = JSON.parse(readFileSync('dist/search.json', 'utf8'));
const rss = readFileSync('dist/rss.xml', 'utf8');
for (const post of posts) {
  assert(post.url.startsWith(`${base}/writing/`), `Search URL outside the blog: ${post.url}`);
  assert(existsSync(join('dist', post.url.slice(base.length), 'index.html')), `Missing post: ${post.url}`);
  assert(rss.includes(`${site}${post.url}`), `RSS missing post URL: ${post.url}`);
}
console.log(`Verified ${files.length} HTML pages, ${checked} links and assets, and ${posts.length} search/RSS entries.`);
