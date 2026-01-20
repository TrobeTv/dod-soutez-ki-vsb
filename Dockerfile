# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Definice argumentů pro build (musí začínat VITE_)
ARG VITE_TURNSTILE_SITEKEY

# Převod argumentů na environmentální proměnné pro proces buildu
ENV VITE_TURNSTILE_SITEKEY=$VITE_TURNSTILE_SITEKEY

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