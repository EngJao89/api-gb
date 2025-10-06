# Deploy no Render - Guia Completo

Este guia mostra como fazer deploy da API GoBarber no Render.

## 🚀 Configuração no Render

### 1. **Criar Serviço Web no Render**

1. **Acesse**: [render.com](https://render.com)
2. **Login** com GitHub
3. **New** → **Web Service**
4. **Connect Repository** → Selecione seu repositório
5. **Configure o serviço**:

```
Name: api-gobarber
Environment: Node
Build Command: npm ci && npx prisma generate && npx prisma migrate deploy
Start Command: npm run start:prod
```

### 2. **Configurar Variáveis de Ambiente no Render**

No painel do Render, vá em **Environment** e adicione:

#### **Variáveis Obrigatórias:**
```
DATABASE_URL = postgresql://[user]:[password]@[host]:[port]/[database]?schema=public
JWT_SECRET = [sua-chave-jwt-super-secreta]
JWT_EXPIRES_IN = 7d
```

#### **Variáveis Opcionais:**
```
NODE_ENV = production
PORT = 10000
```

### 3. **Configurar Banco PostgreSQL no Render**

1. **New** → **PostgreSQL**
2. **Configure**:
   ```
   Name: gobarber-db
   Database: gobarber_prod
   User: gobarber_user
   ```
3. **Copie a DATABASE_URL** gerada
4. **Cole no serviço web** como variável de ambiente

## 🔧 Configuração do GitHub Actions para Render

### 1. **Secrets no GitHub (Opcional)**

Se quiser deploy automático, configure:

```
Nome: RENDER_API_KEY
Valor: [sua-api-key-do-render]
```

**Como obter a API Key:**
1. Render → Account Settings → API Keys
2. Generate New Key
3. Copie a chave

### 2. **Workflow de Deploy para Render**

Crie `.github/workflows/render-deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    name: Deploy to Render
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Deploy to Render
      uses: johnbeynon/render-deploy-action@v0.0.8
      with:
        service-id: ${{ secrets.RENDER_SERVICE_ID }}
        api-key: ${{ secrets.RENDER_API_KEY }}
```

## 📋 Checklist de Deploy

### **No Render:**
- [ ] Criar Web Service
- [ ] Configurar Build Command: `npm ci && npx prisma generate && npx prisma migrate deploy`
- [ ] Configurar Start Command: `npm run start:prod`
- [ ] Adicionar variável `DATABASE_URL`
- [ ] Adicionar variável `JWT_SECRET`
- [ ] Adicionar variável `JWT_EXPIRES_IN`
- [ ] Criar banco PostgreSQL
- [ ] Conectar banco ao serviço

### **No GitHub (Opcional):**
- [ ] Adicionar `RENDER_API_KEY` nos secrets
- [ ] Adicionar `RENDER_SERVICE_ID` nos secrets
- [ ] Configurar workflow de deploy automático

## 🛠️ Comandos de Build/Start

### **Build Command:**
```bash
npm ci && npx prisma generate && npx prisma migrate deploy
```

### **Start Command:**
```bash
npm run start:prod
```

## 🔍 Troubleshooting

### **Erro: Prisma Client not generated**
- **Solução**: Adicione `npx prisma generate` no Build Command

### **Erro: Database connection failed**
- **Solução**: Verifique se `DATABASE_URL` está correta
- **Solução**: Verifique se o banco PostgreSQL está rodando

### **Erro: JWT secret not found**
- **Solução**: Adicione `JWT_SECRET` nas variáveis de ambiente

### **Erro: Port already in use**
- **Solução**: O Render usa porta automática, não configure `PORT`

## 📊 Monitoramento

### **Logs no Render:**
1. Acesse seu serviço
2. Aba **Logs**
3. Monitore em tempo real

### **Health Check:**
- **URL**: `https://seu-app.onrender.com/`
- **Resposta esperada**: `Hello World!`

## 🚀 Deploy Manual vs Automático

### **Deploy Manual (Recomendado para começar):**
1. Push para GitHub
2. Render detecta mudanças
3. Deploy automático

### **Deploy via GitHub Actions:**
1. Configure secrets no GitHub
2. Push para main
3. GitHub Actions faz deploy

## 💰 Custos

### **Render Free Tier:**
- ✅ Web Service: Gratuito (com limitações)
- ✅ PostgreSQL: Gratuito (com limitações)
- ⚠️ **Limitação**: Serviço "dorme" após 15min de inatividade

### **Render Paid:**
- 💰 Web Service: $7/mês
- 💰 PostgreSQL: $7/mês
- ✅ **Sem limitações**

## 🎯 Próximos Passos

1. **Configure o serviço no Render**
2. **Adicione as variáveis de ambiente**
3. **Teste o deploy**
4. **Configure domínio personalizado** (opcional)
5. **Configure SSL** (automático no Render)

---

**Seu app estará disponível em: `https://seu-app.onrender.com`** 🚀
