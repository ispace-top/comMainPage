# ── Build Stage ─────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Install build tools for better-sqlite3 native module
RUN apk add --no-cache build-base python3

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

# Copy standalone output (Next.js auto-traces all dependencies incl. native modules)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Ensure data directory for SQLite
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
