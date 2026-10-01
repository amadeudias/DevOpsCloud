---
title: 'Um novo começo: reconstruindo o blog como um projeto de infraestrutura'
description: 'Por que troquei um app React gerado automaticamente por um site estático em Astro, com pipeline de CI e deploy automático no Netlify.'
pubDate: 2026-09-29
category: devops
tags: ['astro', 'netlify', 'github-actions', 'ci-cd']
---

A primeira versão deste blog nasceu rápido: um app React com backend Express, gerado com ajuda de um assistente no Replit. Cumpriu o papel de colocar algo no ar, mas acumulou o que todo projeto feito às pressas acumula: três configurações de deploy diferentes (Replit, Vercel e Netlify), artigos fixos no código em três lugares e um painel de administração que, no ambiente serverless, não salvava nada.

Decidi reconstruir do zero e tratar o blog como trato qualquer sistema em produção.

## O que mudou

- **Site estático com Astro.** Cada página é gerada no build como HTML pronto. O resultado é carregamento rápido, SEO correto e uma imagem de compartilhamento própria para cada artigo.
- **Artigos em Markdown, versionados no Git.** Publicar é fazer um commit. Revisão, histórico e rollback vêm de graça.
- **Sem backend.** Menos superfície de ataque, nada para atualizar e custo zero de hospedagem.
- **Pipeline de CI.** Todo pull request passa por verificação de tipos, validação do conteúdo e build antes de chegar à `main`. O Netlify gera uma prévia de cada PR e publica automaticamente o que entra na `main`.

```yaml
# .github/workflows/ci.yml (trecho)
- run: npm ci
- name: Verificar tipos e conteúdo
  run: npm run check
- name: Build
  run: npm run build
```

## O que vem por aí

Com a base pronta, o foco agora é o conteúdo: projetos reais e aprendizados sobre AWS, Terraform, Kubernetes, CI/CD e observabilidade.
