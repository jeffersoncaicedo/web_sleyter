# Etapa 1: Build de Angular
FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Validación: mostrar estructura de /app/dist
RUN echo "📁 Contenido de /app/dist:" 
RUN echo ls -l /app/dist
RUN echo "📁 Contenido de /app/dist/nextsof:" 
RUN echo ls -l /app/dist/nextsof

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Crear carpeta destino
RUN rm -rf /usr/share/nginx/html/*

# Copiar build de Angular
COPY --from=build /app/dist/nextsof /usr/share/nginx/html

# Verificación
RUN echo "✅ Contenido copiado al contenedor:" 
RUN echo ls -l /usr/share/nginx/html

# Config Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
