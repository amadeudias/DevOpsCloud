import { readFile } from 'node:fs/promises';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { AUTOR, SITE } from '../../consts';
import { CATEGORIAS } from '../../lib/categorias';
import { getPosts } from '../../lib/posts';

interface Props {
	titulo: string;
	rotulo: string;
	cor: string;
}

export const getStaticPaths = (async () => {
	const posts = await getPosts();
	return [
		{
			params: { slug: 'site' },
			props: { titulo: 'Projetos reais e aprendizados sobre nuvem, DevOps e infraestrutura.', rotulo: AUTOR.cargo, cor: '#3b82f6' },
		},
		...posts.map((post) => ({
			params: { slug: post.id },
			props: {
				titulo: post.data.title,
				rotulo: CATEGORIAS[post.data.category].nome,
				cor: CATEGORIAS[post.data.category].cor,
			},
		})),
	];
}) satisfies GetStaticPaths;

const fonte = (peso: 400 | 700) =>
	readFile(new URL(`../../../node_modules/@fontsource/inter/files/inter-latin-${peso}-normal.woff`, import.meta.url));

// Foto de perfil embutida como data URI, já reduzida ao tamanho exibido
// Caminho relativo à raiz do projeto: o build roda a partir dela
const foto = sharp('src/assets/foto-perfil.jpeg')
	.resize(128, 128)
	.jpeg()
	.toBuffer()
	.then((b) => `data:image/jpeg;base64,${b.toString('base64')}`);

// satori recebe a árvore no formato de elementos React, sem precisar de JSX
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute<Props> = async ({ props }) => {
	const { titulo, rotulo, cor } = props;
	const [regular, negrito, fotoPerfil] = await Promise.all([fonte(400), fonte(700), foto]);

	const arvore = h(
		'div',
		{
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			padding: '72px 80px',
			backgroundColor: '#0a101d',
			backgroundImage: `radial-gradient(circle at 85% 0%, ${cor}40 0%, transparent 55%), radial-gradient(circle at 0% 100%, #1e40af55 0%, transparent 50%)`,
			color: '#e6edf7',
			fontFamily: 'Inter',
		},
		[
			h('div', { display: 'flex', alignItems: 'center', gap: '18px' }, [
				{
					type: 'img',
					props: { src: fotoPerfil, width: 64, height: 64, style: { borderRadius: '999px', border: '3px solid #0ea5e9' } },
				},
				h('div', { fontSize: '28px', color: '#94a3b8' }, new URL(SITE.url).host),
			]),
			h('div', { display: 'flex', flexDirection: 'column', gap: '28px' }, [
				h('div', { display: 'flex' }, [
					h(
						'div',
						{
							display: 'flex',
							alignItems: 'center',
							gap: '12px',
							padding: '8px 20px',
							borderRadius: '999px',
							border: '2px solid #1d2940',
							fontSize: '24px',
							color: '#cbd5e1',
						},
						[h('div', { width: '12px', height: '12px', borderRadius: '999px', backgroundColor: cor }), rotulo],
					),
				]),
				h(
					'div',
					{
						fontSize: titulo.length > 70 ? '54px' : '64px',
						fontWeight: 700,
						lineHeight: 1.12,
						letterSpacing: '-0.02em',
					},
					titulo,
				),
			]),
			h('div', { display: 'flex', fontSize: '26px', color: '#94a3b8' }, `${AUTOR.nome} · ${AUTOR.cargo}`),
		],
	);

	const svg = await satori(arvore as Parameters<typeof satori>[0], {
		width: 1200,
		height: 630,
		fonts: [
			{ name: 'Inter', data: regular, weight: 400, style: 'normal' },
			{ name: 'Inter', data: negrito, weight: 700, style: 'normal' },
		],
	});
	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
