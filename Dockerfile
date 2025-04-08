# Etapa 1: Build de Angular
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Debug: Verifica que los archivos sí existen
RUN mkdir -p /usr/share/nginx/html

# Copia archivos build a Nginx
COPY --from=builder /app/dist/nextsof /usr/share/nginx/html

# Nuevo: Mostrar qué fue copiado
RUN echo "✅ Archivos copiados a /usr/share/nginx/html:" && ls -la /usr/share/nginx/html

# Copia configuración personalizada de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
