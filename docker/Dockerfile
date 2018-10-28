FROM node:10-alpine AS node

FROM php:7.2-fpm-alpine3.7

#
#
# PHP ext install

RUN apk update \
 && apk add --no-cache zlib-dev postgresql-dev libpq libstdc++ make git imagemagick icu openssh-client libxml2 libedit \
 && apk add --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing gnu-libiconv \
 && apk add --no-cache --virtual .build-deps ${PHPIZE_DEPS} imagemagick-dev icu-dev libtool \
 && docker-php-ext-install zip pdo_pgsql intl pcntl mbstring iconv opcache \
 && pecl install mongodb imagick apcu \
 && docker-php-ext-enable mongodb imagick apcu \
 && apk del .build-deps \
 && rm -rf /tmp/* /var/cache/apk/*

ENV LD_PRELOAD /usr/lib/preloadable_libiconv.so php

RUN curl -o composer-setup.php https://getcomposer.org/installer \
 && php composer-setup.php --install-dir=/usr/local/bin --filename=composer



#
#
# NodeJS copy from node image

COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/include/node /usr/local/include/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /opt/yarn* /opt/yarn

RUN ln -vs /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN ln -vs /opt/yarn/bin/yarn /usr/local/bin/yarn

COPY ./docker/php.ini /usr/local/etc/php/php.ini
COPY ./docker/www.conf /usr/local/etc/php-fpm.d/www.conf

ENV COMPOSER_ALLOW_SUPERUSER 1
RUN composer global require "hirak/prestissimo:^0.3" --prefer-dist --no-progress --no-suggest --classmap-authoritative

WORKDIR /app

CMD ["php-fpm", "-R"]
