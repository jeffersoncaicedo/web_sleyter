FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/nextsof/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]