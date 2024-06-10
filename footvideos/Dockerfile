# Usa la imagen base de Nginx con Alpine
FROM nginx:stable-alpine

# Directorio de trabajo (opcional si solo vas a copiar archivos a los directorios predeterminados de Nginx)
WORKDIR /usr/share/nginx/html

# Limpia el contenido predeterminado de Nginx y copia la build de producción de React
RUN rm -rf ./*

COPY ./dist/ .

COPY ./default.conf /etc/nginx/conf.d/default.conf

# (Opcional) Copia tu configuración personalizada de Nginx si es necesario
# COPY path/to/your/nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80 para el tráfico HTTP
EXPOSE 80

# Ejecuta Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
