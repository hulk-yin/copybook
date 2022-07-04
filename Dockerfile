FROM nginx:latest

ADD nginx.conf /etc/nginx/conf.d/
ADD build/. /usr/share/nginx/html/
