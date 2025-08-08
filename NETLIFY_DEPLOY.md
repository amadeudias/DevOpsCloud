# 🚀 Deploy Netlify - Alternativa Gratuita

## 🌟 Por que Netlify?

- ✅ **Mais simples** que Vercel para sites estáticos
- ✅ **100% gratuito** com limites generosos
- ✅ **SSL automático** e CDN global
- ✅ **Deploy contínuo** do GitHub
- ✅ **Domínio customizado** grátis

## 📦 Arquivos Preparados

### ✅ Configurações:
- `netlify.toml` - Configuração de build e redirects
- `netlify/functions/` - Serverless functions
  - `articles.js` - API de artigos
  - `categories.js` - API de categorias  
  - `author.js` - API do autor

## 🚀 Como fazer Deploy

### 1. Upload para GitHub
```bash
git add .
git commit -m "Setup Netlify deployment"
git push
```

### 2. Deploy no Netlify
1. Acesse [netlify.com](https://netlify.com)
2. **"New site from Git"**
3. Conecte GitHub e selecione repositório
4. Configurações automáticas (netlify.toml detectado)
5. **Deploy site**

### 3. Configurar Domínio
1. **Site settings** > **Domain management**
2. **Add custom domain**
3. Configurar DNS conforme instruções
4. SSL automático em ~5 minutos

## 🔧 Configurações Automáticas

### Build Settings:
```
Build command: npm run build
Publish directory: dist/public
Node version: 18
```

### Functions:
```
Functions directory: netlify/functions
Timeout: 10 seconds
```

## 🌐 URLs de Teste

Após deploy:
- **Frontend**: `yoursite.netlify.app/`
- **API Articles**: `yoursite.netlify.app/api/articles`
- **API Categories**: `yoursite.netlify.app/api/categories`
- **API Author**: `yoursite.netlify.app/api/author`
- **Admin Panel**: `yoursite.netlify.app/admin`

## 💰 Limites Gratuitos

**Netlify Free Plan:**
- **Bandwidth**: 100GB/mês
- **Build minutes**: 300 min/mês
- **Functions**: 125k requests/mês
- **Sites**: Ilimitados
- **SSL**: Automático e grátis

## 🔄 Outras Alternativas Gratuitas

### 2. GitHub Pages
- ✅ Totalmente grátis
- ❌ Apenas sites estáticos (sem APIs)
- ❌ Sem functions serverless

### 3. Railway
- ✅ Deploy de aplicações completas
- ✅ PostgreSQL grátis
- ⚠️ Limite de 5$/mês

### 4. Render
- ✅ Sites estáticos grátis
- ✅ APIs grátis (com hibernação)
- ⚠️ Lentidão na versão grátis

## 🎯 Recomendação

**Para seu blog: Netlify é perfeito!**
- Site estático rápido
- Functions para admin
- Domínio customizado
- Performance excelente
- 100% gratuito

---

**Resultado:** Blog profissional online em 5 minutos!