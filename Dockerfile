# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

# <-- ADD THESE 2 LINES
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-http://localhost:5050/api/v1}  

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# DEBUG (remove later)
RUN echo "VITE_API_URL = $VITE_API_URL" && ls -la dist/

# Stage 2: Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80