# Database Configuration Guide

This document explains the database configuration setup for the GoBarber API project.

## 🔧 Configuration Files

### 1. Environment Variables (.env.example)

The `.env.example` file contains the standard database configuration:

```env
# Database Configuration
POSTGRES_USER=admin
POSTGRES_PASSWORD=GoBarber123
POSTGRES_DB=nest_db

# Application Database URL
DATABASE_URL="postgresql://admin:GoBarber123@localhost:5432/nest_db?schema=public"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

### 2. Docker Compose (docker-compose.yml)

The Docker Compose file uses environment variables with fallback defaults:

```yaml
services:
  postgres:
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-admin}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-GoBarber123}
      POSTGRES_DB: ${POSTGRES_DB:-nest_db}

  app:
    environment:
      DATABASE_URL: "postgresql://${POSTGRES_USER:-admin}:${POSTGRES_PASSWORD:-GoBarber123}@postgres:5432/${POSTGRES_DB:-nest_db}?schema=public"
```

### 3. CI/CD Workflows

All GitHub Actions workflows use consistent credentials:

```yaml
services:
  postgres:
    env:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: GoBarber123
      POSTGRES_DB: nest_db

steps:
  - name: Run database migrations
    env:
      DATABASE_URL: "postgresql://admin:GoBarber123@localhost:5432/nest_db?schema=public"
```

## 🚀 Setup Instructions

### For Local Development

1. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Start database with Docker Compose:**
   ```bash
   docker compose up postgres -d
   ```

3. **Run migrations:**
   ```bash
   npx prisma migrate dev
   ```

4. **Start application:**
   ```bash
   npm run start:dev
   ```

### For Docker Development

1. **Start all services:**
   ```bash
   docker compose up --build
   ```

2. **The application will be available at:**
   - API: http://localhost:3333
   - Database: localhost:5432

## 🔍 Database URLs

### Development (Local)
```
postgresql://admin:GoBarber123@localhost:5432/nest_db?schema=public
```

### Docker Compose (Internal Network)
```
postgresql://admin:GoBarber123@postgres:5432/nest_db?schema=public
```

### CI/CD (GitHub Actions)
```
postgresql://admin:GoBarber123@localhost:5432/nest_db?schema=public
```

## 🛠️ Troubleshooting

### Connection Issues

1. **Check if PostgreSQL is running:**
   ```bash
   docker compose ps
   ```

2. **Check database logs:**
   ```bash
   docker compose logs postgres
   ```

3. **Test connection:**
   ```bash
   docker compose exec postgres psql -U admin -d nest_db -c "SELECT 1;"
   ```

### Environment Variable Issues

1. **Verify .env file exists:**
   ```bash
   ls -la .env
   ```

2. **Check environment variables:**
   ```bash
   cat .env
   ```

3. **Regenerate Prisma client:**
   ```bash
   npx prisma generate
   ```

## 🔒 Security Notes

- **Never commit `.env` files** to version control
- **Use strong passwords** in production
- **Rotate JWT secrets** regularly
- **Use environment-specific configurations**

## 📋 Validation

The project includes automated validation of database configuration:

- **GitHub Actions** validate consistency across all files
- **Docker Compose** tests ensure proper configuration
- **CI/CD workflows** verify database connectivity

Run validation locally:
```bash
# Check configuration consistency
npm run validate:config

# Test database connection
npm run test:db
```

## 🎯 Best Practices

1. **Always use `.env.example`** as a template
2. **Keep credentials consistent** across all environments
3. **Use environment variables** for sensitive data
4. **Test database connections** before deployment
5. **Document any configuration changes**

---

For more information, see the main [README.md](../README.md) file.
