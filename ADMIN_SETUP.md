# 🔐 Configuração do Admin - Sistema de Autenticação

## Como Configurar a Senha do Admin

### Em Desenvolvimento
- **Login automático**: Apenas acesse `/admin` - login será feito automaticamente
- **Credenciais padrão**: admin@example.com / dev123

### Em Produção
Configure as variáveis de ambiente para criar sua conta admin:

```bash
# Suas credenciais de admin
ADMIN_EMAIL=seu-email@exemplo.com
ADMIN_PASSWORD=sua-senha-forte-aqui  
ADMIN_NAME=Seu Nome

# Chave secreta para sessões (obrigatório em produção)
SESSION_SECRET=uma-chave-muito-forte-e-aleatoria-aqui

# Definir ambiente como produção
NODE_ENV=production
```

## 🚀 Como Funciona

### Desenvolvimento (`NODE_ENV=development`)
- Login automático quando acessar `/admin`
- Sem necessidade de senha
- Perfeito para desenvolvimento e testes

### Produção (`NODE_ENV=production`) 
- Tela de login com email e senha
- Credenciais definidas por variáveis de ambiente
- Sessão segura com expiração de 24 horas
- **Não precisa de banco de dados!**

## 🔒 Segurança

### Características de Segurança:
- ✅ Senha criptografada em memória
- ✅ Sessões seguras com expiração
- ✅ Proteção contra ataques de força bruta
- ✅ Logout automático após inatividade
- ✅ Todas as rotas administrativas protegidas

### Não Precisa de Banco:
- ✅ Credenciais armazenadas em variáveis de ambiente
- ✅ Sessões em memória (ou Redis se configurado)
- ✅ Sistema simples e seguro
- ✅ Perfeito para blogs pessoais

## 📝 Passos para Deploy

1. **Configure as variáveis de ambiente:**
   ```bash
   ADMIN_EMAIL=amadeu@exemplo.com
   ADMIN_PASSWORD=MinhaSenh@Forte123!
   ADMIN_NAME=Amadeu Dias
   SESSION_SECRET=chave-super-secreta-aleatoria-aqui
   NODE_ENV=production
   ```

2. **Deploy da aplicação**

3. **Acesse `/admin` e faça login com suas credenciais**

4. **Gerencie seu blog com segurança total!**

## 🛡️ Dicas de Segurança

- Use senhas fortes (mínimo 12 caracteres)
- Inclua letras, números e símbolos
- Mantenha as variáveis de ambiente seguras
- Nunca commite credenciais no código
- Considere usar HTTPS em produção

## 🔧 Troubleshooting

**Problema**: Não consigo fazer login
**Solução**: Verifique se as variáveis ADMIN_EMAIL e ADMIN_PASSWORD estão corretas

**Problema**: Sessão expira muito rápido  
**Solução**: Sessions duram 24h por padrão, você pode ajustar no código

**Problema**: Esqueci a senha
**Solução**: Atualize a variável ADMIN_PASSWORD e reinicie a aplicação