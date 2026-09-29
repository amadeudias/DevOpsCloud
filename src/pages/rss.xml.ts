import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { CATEGORIAS } from '../lib/categorias';
import { getPosts } from '../lib/posts';

export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site!,
		customData: '<language>pt-br</language>',
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: [CATEGORIAS[post.data.category].nome, ...post.data.tags],
			link: `/blog/${post.id}/`,
		})),
	});
}
