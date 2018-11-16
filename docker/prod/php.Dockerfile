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
COPY ./docker/prod/concerto.rsa /root/.ssh/id_rsa

WORKDIR /www

ENV APP_ENV=prod
ENV APP_SECRET=b348acaf7a64761b3e2debcdb222951d
ENV S3_REGION=eu-west-3
ENV S3_KEY=AKIAJ5YVK23NDTNCNZOQ
ENV S3_SECRET=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
ENV S3_BUCKET=otaa
ENV S3_PREFIX=https://s3.eu-west-3.amazonaws.com/otaa
ENV S3_ENDPOINT=https://s3.eu-west-3.amazonaws.com
ENV DATABASE_URL=pgsql://otaa:otaa@database:5432/otaa
ENV MONGODB_URL=mongodb://mongo:27017
ENV MONGODB_DB=otaa
ENV REDIS_URL=redis://redis
ENV DARKSKY_API_KEY=3530995e80e0400144ce7d60a92d93b1
ENV INSTAGRAM_ACCOUNT_ID=17841403344048648
ENV FACEBOOK_APP_ID=195725817721114
ENV FACEBOOK_APP_SECRET=11623fa0a55447c0eb27da9188b50bd7

RUN chmod 600 /root/.ssh/id_rsa \
 && ssh-keyscan -t rsa bitbucket.org >> ~/.ssh/known_hosts \
 && composer install --no-dev --no-interaction --prefer-dist --no-scripts \
 && php bin/console cache:warmup --env=prod --no-debug || true \
 && php bin/console cache:warmup --env=prod --no-debug \
 && php bin/console assets:install public

COPY --from=web /www/public /www/public

CMD ["php-fpm", "-R"]
