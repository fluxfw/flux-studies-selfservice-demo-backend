#!/usr/bin/env sh

set -e

host_ip="$1"
if [ -z "$host_ip" ]; then
    echo "Please pass a host ip" >&2
    exit 1
fi

bin="`dirname "$0"`"
root="$bin/.."
libs="$root/.."

name="`basename "$(realpath "$root")"`"
user="${FLUX_PUBLISH_DOCKER_USER:=fluxfw}"
image="$user/$name"
tag="`get-release-tag "$root"`"

dev_build_image="$name-dev-build"
dev_build_tag="`date +%s`-$RANDOM"
echo -e "FROM node:current-alpine\nRUN apk add --no-cache imagemagick" | docker build - --pull -t "$dev_build_image:$dev_build_tag"
run-in-docker "$dev_build_image:$dev_build_tag" flux-studis-selfservice-frontend/bin/build.mjs "$libs" dev

xdg-open "http://$host_ip"

docker run --rm -v "$libs:/$name/libs:ro" -p "$host_ip:80:80" "$image:$tag"

git-clean-ignored "$libs/flux-studis-selfservice-frontend"
