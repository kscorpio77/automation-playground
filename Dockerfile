FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY pages/ /usr/share/nginx/html/pages/
COPY assets/ /usr/share/nginx/html/assets/
COPY downloads/ /usr/share/nginx/html/downloads/

EXPOSE 80
