#!/usr/bin/env sh

DOCKER_IMAGE_APP=docker.un-zero-un.net/chat_app \
DOCKER_IMAGE_NGINX=docker.un-zero-un.net/chat_nginx \
docker stack deploy -c docker-compose.prod.yml otaa --with-registry-auth
