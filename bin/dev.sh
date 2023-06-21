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

(cd "$libs" && node-docker flux-studis-selfservice-frontend/bin/generate-pwa.mjs)

xdg-open "http://$host_ip"

docker run --rm -v "$libs:/$name/libs:ro" -p "$host_ip:80:80" "$image:$tag"

git-clean-ignored "$libs/flux-studis-selfservice-frontend"
