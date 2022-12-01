#!/usr/bin/env sh

set -e

installDependency() {
    if [ "`basename "$(realpath ..)"`" = "node_modules" ]; then
        node_modules=".."
    else 
        node_modules="node_modules"
    fi

    (mkdir -p "$node_modules/$1" && cd "$node_modules/$1" && wget -O - "$2" | tar -xz --strip-components=1)
}

installDependency flux-config-api https://github.com/fluxfw/flux-config-api/archive/refs/tags/v2022-12-01-2.tar.gz

installDependency flux-express-server-api https://github.com/fluxfw/flux-express-server-api/archive/refs/tags/v2022-11-24-2.tar.gz

installDependency flux-fetch-api https://github.com/fluxfw/flux-fetch-api/archive/refs/tags/v2022-11-24-1.tar.gz

installDependency flux-json-api https://github.com/fluxfw/flux-json-api/archive/refs/tags/v2022-11-24-1.tar.gz

installDependency flux-shutdown-handler-api https://github.com/fluxfw/flux-shutdown-handler-api/archive/refs/tags/v2022-11-24-1.tar.gz

installDependency flux-studis-selfservice-frontend/src https://github.com/fluxfw/flux-studis-selfservice-frontend/releases/download/v2022-12-01-1/flux-studis-selfservice-frontend-v2022-12-01-1-build.tar.gz
