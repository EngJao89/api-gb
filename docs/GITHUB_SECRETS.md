# GitHub Secrets Configuration

Este documento lista todas as variáveis que você precisa configurar no GitHub para que o pipeline de CI/CD funcione completamente.

## 🔐 Secrets Obrigatórios

### 1. **GITHUB_TOKEN** (Automático)
- **Descrição**: Token automático do GitHub para autenticação
- **Valor**: `${{ secrets.GITHUB_TOKEN }}` (já disponível automaticamente)
- **Uso**: Push de imagens para GitHub Container Registry
- **Status**: ✅ **Não precisa configurar** - já disponível

## 🔧 Secrets Opcionais (Recomendados)

### 2. **SNYK_TOKEN** (Opcional)
- **Descrição**: Token do Snyk para análise de vulnerabilidades
- **Como obter**: 
  1. Acesse [snyk.io](https://snyk.io)
  2. Crie uma conta gratuita
  3. Vá em Settings > API Token
  4. Copie o token
- **Configurar no GitHub**:
  ```
  Settings > Secrets and variables > Actions > New repository secret
  Name: SNYK_TOKEN
  Value: [seu-token-snyk]
  ```
- **Status**: ⚠️ **Opcional** - workflow funciona sem ele

## 🚀 Secrets para Deploy (Produção)

### 3. **PROD_HOST** (Para deploy em servidor)
- **Descrição**: Endereço IP ou hostname do servidor de produção
- **Exemplo**: `192.168.1.100` ou `api.gobarber.com`
- **Configurar no GitHub**:
  ```
  Name: PROD_HOST
  Value: [seu-servidor-producao]
  ```

### 4. **PROD_USER** (Para deploy em servidor)
- **Descrição**: Usuário SSH do servidor de produção
- **Exemplo**: `ubuntu`, `root`, `deploy`
- **Configurar no GitHub**:
  ```
  Name: PROD_USER
  Value: [usuario-ssh]
  ```

### 5. **PROD_SSH_KEY** (Para deploy em servidor)
- **Descrição**: Chave privada SSH para acesso ao servidor
- **Como gerar**:
  ```bash
  ssh-keygen -t rsa -b 4096 -C "github-actions"
  # Salve a chave privada (id_rsa) como secret
  # Adicione a chave pública (id_rsa.pub) no servidor
  ```
- **Configurar no GitHub**:
  ```
  Name: PROD_SSH_KEY
  Value: [conteudo-da-chave-privada]
  ```

## 📱 Secrets para Notificações

### 6. **SLACK_WEBHOOK_URL** (Opcional)
- **Descrição**: Webhook do Slack para notificações de deploy
- **Como obter**:
  1. Crie um app no Slack
  2. Adicione Incoming Webhooks
  3. Copie a URL do webhook
- **Configurar no GitHub**:
  ```
  Name: SLACK_WEBHOOK_URL
  Value: https://hooks.slack.com/services/...
  ```

## 🔒 Secrets para Banco de Dados (Produção)

### 7. **PROD_DATABASE_URL** (Para produção)
- **Descrição**: URL de conexão do banco de produção
- **Exemplo**: `postgresql://user:pass@prod-db:5432/gobarber_prod`
- **Configurar no GitHub**:
  ```
  Name: PROD_DATABASE_URL
  Value: [url-banco-producao]
  ```

### 8. **PROD_JWT_SECRET** (Para produção)
- **Descrição**: Chave secreta JWT para produção
- **Gerar**:
  ```bash
  openssl rand -base64 32
  ```
- **Configurar no GitHub**:
  ```
  Name: PROD_JWT_SECRET
  Value: [chave-jwt-producao]
  ```

## 🛠️ Como Configurar no GitHub

### Passo a Passo:

1. **Acesse seu repositório no GitHub**
2. **Vá em Settings** (aba do repositório)
3. **Clique em "Secrets and variables"**
4. **Selecione "Actions"**
5. **Clique em "New repository secret"**
6. **Digite o nome e valor**
7. **Clique em "Add secret"**

### Exemplo de Configuração Mínima:

```
✅ GITHUB_TOKEN (automático)
⚠️ SNYK_TOKEN (opcional)
```

### Exemplo de Configuração Completa:

```
✅ GITHUB_TOKEN (automático)
✅ SNYK_TOKEN (recomendado)
✅ PROD_HOST (para deploy)
✅ PROD_USER (para deploy)
✅ PROD_SSH_KEY (para deploy)
✅ SLACK_WEBHOOK_URL (opcional)
✅ PROD_DATABASE_URL (produção)
✅ PROD_JWT_SECRET (produção)
```

## 🎯 Status dos Workflows

### Sem Secrets (Funciona):
- ✅ **Testes** - Executa normalmente
- ✅ **Build** - Constrói e publica imagem
- ✅ **Security Scan** - Executa sem Snyk
- ❌ **Deploy** - Falha (precisa de secrets)

### Com Secrets Mínimos:
- ✅ **Testes** - Executa normalmente
- ✅ **Build** - Constrói e publica imagem
- ✅ **Security Scan** - Executa com Snyk
- ❌ **Deploy** - Falha (precisa de secrets de servidor)

### Com Secrets Completos:
- ✅ **Testes** - Executa normalmente
- ✅ **Build** - Constrói e publica imagem
- ✅ **Security Scan** - Executa com Snyk
- ✅ **Deploy** - Deploy automático para produção
- ✅ **Notificações** - Slack notifications

## 🚨 Importante

- **Nunca commite secrets** no código
- **Use secrets** para dados sensíveis
- **Rotacione secrets** regularmente
- **Teste localmente** antes de fazer push
- **Monitore logs** do GitHub Actions

## 📋 Checklist de Configuração

- [ ] GITHUB_TOKEN (automático)
- [ ] SNYK_TOKEN (opcional)
- [ ] PROD_HOST (se tiver servidor)
- [ ] PROD_USER (se tiver servidor)
- [ ] PROD_SSH_KEY (se tiver servidor)
- [ ] SLACK_WEBHOOK_URL (opcional)
- [ ] PROD_DATABASE_URL (produção)
- [ ] PROD_JWT_SECRET (produção)

---

**Para começar, você só precisa do GITHUB_TOKEN (que já está disponível)!** 🎉
