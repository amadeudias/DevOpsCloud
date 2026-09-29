# amadeudias.cloud

Blog pessoal de Amadeu Dias, construído com [Astro](https://astro.build) e publicado no Netlify.

## Desenvolvimento

```bash
nvm use          # Node 24, definido em .nvmrc
npm install
npm run dev      # http://localhost:4321
npm run check    # tipos e validação do conteúdo
npm run build    # gera o site em dist/
```

## Publicar um artigo

Crie um arquivo em `src/content/blog/`. O nome do arquivo vira a URL (`meu-artigo.md` → `/blog/meu-artigo/`).

```markdown
---
title: 'Título do artigo'
description: 'Resumo de até 200 caracteres, usado na listagem e no compartilhamento.'
pubDate: 2026-10-01
category: aws        # devops | kubernetes | aws | iac | observabilidade | seguranca | finops
tags: ['terraform', 'eks']
draft: true          # aparece no `npm run dev`, fica fora do site publicado
---

Conteúdo em Markdown.
```

A imagem de compartilhamento (`/og/<slug>.png`) é gerada automaticamente no build.

## Deploy

- Pull requests: o GitHub Actions roda `check` e `build`, e o Netlify publica uma prévia.
- Merge na `main`: o Netlify publica em produção.
