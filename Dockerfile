FROM nginx:latest

ADD default.conf /etc/nginx/conf.d/
ADD build/. /usr/share/nginx/html/
RUN chmod -R 777 /usr/share/nginx/html/
