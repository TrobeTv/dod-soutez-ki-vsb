# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

ARG VITE_CLOUDFLARE_SITE_KEY
ENV VITE_CLOUDFLARE_SITE_KEY=$VITE_CLOUDFLARE_SITE_KEY

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Odstranění výchozích souborů
RUN rm -rf /usr/share/nginx/html/*

# Kopírování buildu z builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Kopírování vaší vlastní konfigurace Nginxu
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Změna portu na 5173
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]