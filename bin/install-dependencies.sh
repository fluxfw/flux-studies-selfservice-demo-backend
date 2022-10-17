#!/usr/bin/env sh

set -e

if [ "`basename "$(realpath ..)"`" = "node_modules" ]; then
    node_modules=".."
else 
    node_modules="node_modules"
fi

(mkdir -p $node_modules/flux-express-server-api && cd $node_modules/flux-express-server-api && wget -O - https://github.com/fluxfw/flux-express-server-api/archive/refs/tags/v2022-10-17-1.tar.gz | tar -xz --strip-components=1)

(mkdir -p $node_modules/flux-shutdown-handler-api && cd $node_modules/flux-shutdown-handler-api && wget -O - https://github.com/fluxfw/flux-shutdown-handler-api/archive/refs/tags/v2022-10-17-1.tar.gz | tar -xz --strip-components=1)

(mkdir -p $node_modules/flux-studies-selfservice-frontend && cd $node_modules/flux-studies-selfservice-frontend && wget -O - https://github.com/fluxfw/flux-studies-selfservice-frontend/archive/refs/tags/v2022-10-17-1-alpha.tar.gz | tar -xz --strip-components=1 && npm ci --omit=dev)
