# 📤 Upload para Git e Deploy no Vercel

## 🔄 Passo 1: Criar Repositório no GitHub

### Via GitHub Web:
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `amadeu-blog` (ou outro nome)
4. Marque "Public" ou "Private"
5. **NÃO** marque "Initialize with README"
6. Clique "Create repository"

## 📦 Passo 2: Upload via Replit (Mais Fácil)

### Método Replit Git:
1. **No Replit**, vá na aba "Version Control" (ícone Git)
2. Clique "Connect to GitHub"
3. Autorize a conexão
4. Crie novo repositório ou conecte ao existente
5. Faça commit das mudanças
6. Push automático para GitHub

## 💻 Passo 3: Upload Manual (Alternativo)

### Se preferir linha de comando:
```bash
# Inicializar git (se não existir)
git init

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Blog DevOps pronto para deploy"

# Conectar ao GitHub
git remote add origin https://github.com/SEU_USER/amadeu-blog.git

# Fazer upload
git push -u origin main
```

## 🚀 Passo 4: Deploy no Vercel

### Conectar GitHub ao Vercel:
1. Vá para [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique "New Project"
4. Selecione seu repositório `amadeu-blog`
5. Configure:
   ```
   Framework Preset: Other
   Build Command: npm run build  
   Output Directory: dist/public
   Install Command: npm install
   ```
6. Clique "Deploy"

### Deploy automático em ~2 minutos!

## 🌐 Passo 5: Domínio Customizado

### Adicionar seu domínio:
1. No dashboard Vercel do seu projeto
2. Aba "Settings" > "Domains"
3. Adicionar seu domínio (ex: `amadeucloud.com`)
4. Configurar DNS apontando para Vercel:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @  
   Value: 76.76.19.61
   ```
5. SSL automático em ~10 minutos

## 📁 Arquivos que serão enviados:

### ✅ Frontend:
- `client/` - Aplicação React
- `dist/public/` - Build otimizado

### ✅ Backend APIs:
- `api/articles.ts` - CRUD de artigos
- `api/categories.ts` - Categorias
- `api/author.ts` - Dados do autor

### ✅ Configurações:
- `vercel.json` - Configuração deploy
- `.gitignore` - Arquivos ignorados
- `package.json` - Dependências

## 🛡️ Pós Deploy:

### Testar Funcionalidades:
- ✅ Site principal funcionando
- ✅ Admin acessível em `/admin`
- ✅ CRUD de artigos funcionando
- ✅ Performance otimizada

### URL Final:
- **Temporário**: `seu-projeto.vercel.app`
- **Customizado**: `seudominio.com`

## 🔧 Troubleshooting:

### Build falha:
- Verificar Node.js >= 16
- Verificar dependências no package.json

### API não funciona:
- Verificar estrutura `/api/`
- Verificar importações relativas

### Domínio não conecta:
- Aguardar propagação DNS (até 24h)
- Verificar configurações DNS

---

**Resultado:** Blog profissional online com domínio próprio em ~30 minutos!