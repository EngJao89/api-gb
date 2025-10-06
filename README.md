# API GoBarber

API para sistema de agendamento de barbearias desenvolvida com NestJS, PostgreSQL e Docker.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **PostgreSQL** - Banco de dados
- **Prisma** - ORM
- **Docker** - Containerização
- **JWT** - Autenticação
- **GitHub Actions** - CI/CD

## 📋 Pré-requisitos

- Node.js 22+
- Docker
- Docker Compose

## 🛠️ Instalação

### Desenvolvimento Local

```bash
# Clone o repositório
git clone <repository-url>
cd api-gb

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrações
npx prisma migrate dev

# Inicie a aplicação
npm run start:dev
```

### Docker

```bash
# Suba os serviços
docker compose up --build

# A aplicação estará disponível em http://localhost:3333
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

## 📚 API Endpoints

### Autenticação
- `POST /auth-user/login` - Login de usuário
- `POST /auth-user/register` - Registro de usuário
- `POST /auth-barber/login` - Login de barbeiro
- `POST /auth-barber/register` - Registro de barbeiro

### Usuários
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `GET /users/:id` - Buscar usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Barbeiros
- `GET /barbers` - Listar barbeiros
- `POST /barbers` - Criar barbeiro
- `GET /barbers/:id` - Buscar barbeiro
- `PUT /barbers/:id` - Atualizar barbeiro
- `DELETE /barbers/:id` - Deletar barbeiro

### Agendamentos
- `GET /scheduling` - Listar agendamentos
- `POST /scheduling` - Criar agendamento
- `GET /scheduling/:id` - Buscar agendamento
- `PUT /scheduling/:id` - Atualizar agendamento
- `DELETE /scheduling/:id` - Deletar agendamento

### Disponibilidade
- `GET /barber-availability` - Listar disponibilidades
- `POST /barber-availability` - Criar disponibilidade
- `GET /barber-availability/:id` - Buscar disponibilidade
- `PUT /barber-availability/:id` - Atualizar disponibilidade
- `DELETE /barber-availability/:id` - Deletar disponibilidade

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 🐳 Docker

### Desenvolvimento
```bash
# Subir apenas o banco
docker compose up postgres -d

# Subir aplicação completa
docker compose up --build
```

### Produção
```bash
# Build da imagem
docker build -t api-gb .

# Executar container
docker run -p 3333:3333 api-gb
```

## 🚀 CI/CD

O projeto inclui pipelines de CI/CD com GitHub Actions:

- **Testes Automáticos** - Executa testes em cada PR
- **Build Docker** - Constrói e publica imagens
- **Security Scan** - Verifica vulnerabilidades
- **Deploy Automático** - Deploy para staging/produção

### Workflows

- `ci-cd.yml` - Pipeline principal
- `docker-compose-test.yml` - Testes com Docker
- `security.yml` - Verificações de segurança
- `deploy.yml` - Deploy automático

## 📊 Monitoramento

- **Health Check**: `GET /` - Status da aplicação
- **Logs**: Docker logs disponíveis
- **Métricas**: Prisma query logs

## 🔒 Segurança

- Autenticação JWT
- Validação de dados com class-validator
- Criptografia de senhas com bcrypt
- Headers de segurança
- Rate limiting (configurável)

## 📝 Scripts Disponíveis

```bash
npm run build          # Build da aplicação
npm run start          # Iniciar aplicação
npm run start:dev      # Iniciar em modo desenvolvimento
npm run start:debug    # Iniciar em modo debug
npm run start:prod     # Iniciar em modo produção
npm run lint           # Executar linter
npm run format         # Formatar código
npm run test           # Executar testes
npm run test:watch     # Executar testes em modo watch
npm run test:cov       # Executar testes com cobertura
npm run test:e2e       # Executar testes e2e
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato.

---

Desenvolvido com ❤️ usando NestJS