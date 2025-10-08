# Etapa 1 - Build
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2 - Execução
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 3333
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
