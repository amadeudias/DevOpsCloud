import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function tempoDeLeitura(post: Post): number {
	const palavras = (post.body ?? '').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(palavras / 200));
}

export function formatarData(data: Date): string {
	return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
