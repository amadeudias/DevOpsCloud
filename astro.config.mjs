// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://amadeudias.cloud',
	trailingSlash: 'ignore',
	integrations: [
		// Precisa vir antes do mdx para estilizar blocos de código em .mdx
		expressiveCode({
			themes: ['github-dark-default'],
			styleOverrides: {
				borderRadius: '0.75rem',
				codeFontFamily: "'JetBrains Mono Variable', ui-monospace, monospace",
				uiFontFamily: "'Inter Variable', ui-sans-serif, system-ui, sans-serif",
			},
		}),
		mdx(),
		sitemap({ filter: (page) => !page.includes('/og/') }),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
