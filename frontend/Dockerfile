# Usar a imagem básica do Nginx
FROM nginx:alpine

# Diretório de trabalho no contêiner
WORKDIR /usr/share/nginx/html

# Copiar todos os arquivos HTML, CSS e JS para o diretório de trabalho no contêiner
COPY ./html /usr/share/nginx/html
COPY ./css /usr/share/nginx/html/css
COPY ./images /usr/share/nginx/html/images
COPY ./js /usr/share/nginx/html/js

# Expor a porta 80
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]