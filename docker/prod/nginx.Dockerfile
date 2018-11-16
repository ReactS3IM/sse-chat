FROM docker.un-zero-un.net/otaa_app AS app

FROM nginx:1.13-alpine

COPY --from=app /www/public /www/public
COPY ./docker/prod/vhost.conf /etc/nginx/conf.d/default.conf
COPY ./docker/prod/nginx-entrypoint.sh /nginx-entrypoint.sh

ENTRYPOINT [ "/nginx-entrypoint.sh" ]
