#!/usr/bin/env sh

DOCKER_IMAGE_APP=docker.un-zero-un.net/otaa_app \
DOCKER_IMAGE_NGINX=docker.un-zero-un.net/otaa_nginx \
docker-compose -f docker-compose.prod.yml build
