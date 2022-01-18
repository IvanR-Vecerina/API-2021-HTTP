FROM php:8.1-apache
LABEL MAINTAINER_NAME="Ivan Vecerina"

# When we build the image, we copy the folder content in the image/server file system. 
#
COPY conf/ /etc/apache2/

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
RUN service apache2 restart