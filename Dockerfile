# ── Build Stage ─────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Install build dependencies for better-sqlite3 native module
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Production Stage ────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Install runtime deps for better-sqlite3
RUN apk add --no-cache python3 make g++

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Ensure data directory for SQLite
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Copy node_modules with better-sqlite3 native build
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma 2>/dev/null || true
COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
