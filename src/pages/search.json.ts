import { getPosts } from '../lib/posts';
import { withBase } from '../lib/paths';
export async function GET() {
  const posts = await getPosts();
  return new Response(JSON.stringify(posts.map(p => ({ title:p.data.title, description:p.data.description, tags:p.data.tags, body:p.body, url:withBase(`/writing/${p.id}/`) }))), { headers: { 'Content-Type':'application/json' } });
}
