import { getCollection, type CollectionEntry } from 'astro:content';

export const topicDescriptions: Record<string, string> = {
  'Data': 'Making information useful, trustworthy, and understandable.',
  'AI': 'Working thoughtfully with a new set of tools.',
  'Analytics engineering': 'The craft of turning raw data into shared understanding.',
  'Leadership': 'The people, decisions, and habits behind good data work.',
  'dbt': 'Small, practical notes on models, tests, and documentation.',
  'Microsoft Fabric': 'Thinking clearly about an end-to-end data platform.',
};
export const topics = Object.keys(topicDescriptions);
export const topicSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');
export const getPosts = async () => (await getCollection('posts', ({ data }) => !data.draft && data.date <= new Date())).sort((a,b) => b.data.date.valueOf() - a.data.date.valueOf());
export const readingTime = (post: CollectionEntry<'posts'>) => Math.max(1, Math.ceil((post.body || '').split(/\s+/).length / 220));
export const dateLabel = (date: Date) => new Intl.DateTimeFormat('en', { month:'long', day:'numeric', year:'numeric', timeZone:'UTC' }).format(date);
