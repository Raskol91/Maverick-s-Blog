import { getPosts } from '../lib/posts';
export async function GET() {
  const posts = await getPosts();
  return new Response(JSON.stringify(posts.map(p => ({ title:p.data.title, description:p.data.description, tags:p.data.tags, body:p.body, url:`/writing/${p.id}/` }))), { headers: { 'Content-Type':'application/json' } });
}
