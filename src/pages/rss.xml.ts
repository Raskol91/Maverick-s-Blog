import rss from '@astrojs/rss';
import { getPosts } from '../lib/posts';
import { withBase } from '../lib/paths';
export async function GET(context: { site: URL }) {
  return rss({ title:'Maverick’s blog', description:'Notes on data, AI, analytics engineering, and the people behind it.', site:new URL(withBase('/'), context.site), items:(await getPosts()).map(post => ({ title:post.data.title, pubDate:post.data.date, description:post.data.description, link:withBase(`/writing/${post.id}/`) })), customData:'<language>en</language>' });
}
