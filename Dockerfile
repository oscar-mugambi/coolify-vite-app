# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm


ARG VITE_API_URL

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

RUN if [ -z "$VITE_API_URL" ]; then \
    echo "FATAL: VITE_API_URL is not set. Failing build." && exit 1; \
    else \
    echo "Build-time VITE_API_URL found: $VITE_API_URL"; \
    fi

RUN pnpm run build


# Stage 2: Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80