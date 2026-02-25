# Etapa 1 - Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci
COPY . .
# Prisma 7: generate client before build (DATABASE_URL only needed at runtime for migrate)
ENV DATABASE_URL="postgresql://localhost:5432/build"
RUN npx prisma generate
RUN npm run build

# Etapa 2 - Execução
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
EXPOSE 3333
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
