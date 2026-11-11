const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle')!;
function updateThemeLabel() {
  themeToggle.setAttribute('aria-label', `Switch to ${document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'} theme`);
}
updateThemeLabel();
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch { /* The selected theme still works when storage is unavailable. */ }
  updateThemeLabel();
});

const menu = document.querySelector<HTMLButtonElement>('#menu-toggle')!;
const scrim = document.querySelector<HTMLButtonElement>('#nav-scrim')!;
const sidebar = document.querySelector<HTMLElement>('#sidebar')!;
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  sidebar.classList.remove('is-open');
  scrim.hidden = true;
  document.body.classList.remove('menu-open');
}
menu.addEventListener('click', () => {
  if (menu.getAttribute('aria-expanded') === 'true') return closeMenu();
  menu.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-label', 'Close navigation');
  sidebar.classList.add('is-open');
  scrim.hidden = false;
  document.body.classList.add('menu-open');
});
scrim.addEventListener('click', closeMenu);
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

type SearchPost = { title:string; description:string; tags:string[]; body:string; url:string };
let posts: SearchPost[] | undefined;
let loading: Promise<void> | undefined;
const dialog = document.querySelector<HTMLDialogElement>('#search-dialog')!;
const input = document.querySelector<HTMLInputElement>('#search-input')!;
const results = document.querySelector<HTMLUListElement>('#search-results')!;
const status = document.querySelector<HTMLElement>('#search-status')!;
function search() {
  if (!posts) return;
  const terms = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = posts.filter(post => terms.every(term => `${post.title} ${post.description} ${post.tags.join(' ')} ${post.body}`.toLocaleLowerCase().includes(term))).slice(0,20);
  results.replaceChildren();
  status.textContent = terms.length ? `${matches.length}${matches.length === 20 ? '+' : ''} ${matches.length === 1 ? 'note' : 'notes'} found${matches.length ? '' : '. Try a different word or topic.'}` : 'Recent notes';
  for (const post of matches) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = post.url;
    const title = document.createElement('strong');
    title.textContent = post.title;
    const description = document.createElement('span');
    description.textContent = post.tags.join(' · ');
    link.append(title,description);
    li.append(link);
    results.append(li);
  }
}
async function openSearch() {
  if (dialog.open) return;
  closeMenu();
  dialog.showModal();
  input.focus();
  if (posts) return search();
  status.textContent = 'Loading notes…';
  loading ??= fetch(`${import.meta.env.BASE_URL}search.json`).then(response => {
    if (!response.ok) throw new Error('Search unavailable');
    return response.json();
  }).then(data => { posts = data; }).finally(() => { loading = undefined; });
  try { await loading; search(); } catch { status.textContent = 'Search couldn’t load. Close and reopen to try again, or browse All writing.'; }
}
document.querySelectorAll('[data-search-open]').forEach(button => button.addEventListener('click', openSearch));
input.addEventListener('input', search);
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  if (event.key === 'Tab' && menu.getAttribute('aria-expanded') === 'true') {
    const controls = [menu, ...sidebar.querySelectorAll<HTMLElement>('a,button')];
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
