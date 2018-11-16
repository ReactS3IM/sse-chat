FROM node:10-alpine AS web

COPY ./ /www
WORKDIR /www

RUN yarn \
 && node ./node_modules/.bin/encore production

FROM php:7.2-fpm-alpine3.7

#
#
# PHP ext install

RUN apk update \
 && apk add --no-cache zlib-dev postgresql-dev libpq libstdc++ make git imagemagick icu openssh-client \
 && apk add --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing gnu-libiconv \
 && apk add --no-cache --virtual .build-deps ${PHPIZE_DEPS} imagemagick-dev icu-dev \
 && docker-php-ext-install zip pdo_pgsql intl pcntl mbstring iconv opcache \
 && pecl install mongodb imagick apcu apcu \
 && docker-php-ext-enable mongodb imagick apcu \
 && apk del .build-deps \
 && rm -rf /tmp/* /var/cache/apk/*

ENV LD_PRELOAD /usr/lib/preloadable_libiconv.so php

RUN curl -o composer-setup.php https://getcomposer.org/installer \
 && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

COPY . /www
COPY ./docker/php.ini /usr/local/etc/php/php.ini
COPY ./docker/www.conf /usr/local/etc/php-fpm.d/www.conf

WORKDIR /www

RUN chmod 600 /root/.ssh/id_rsa \
 && ssh-keyscan -t rsa bitbucket.org >> ~/.ssh/known_hosts \
 && composer install --no-dev --no-interaction --prefer-dist --no-scripts \
 && php bin/console cache:warmup --env=prod --no-debug || true \
 && php bin/console cache:warmup --env=prod --no-debug \
 && php bin/console assets:install public

COPY --from=web /www/public /www/public

CMD ["php-fpm", "-R"]
