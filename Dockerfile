FROM node:19-alpine AS build

COPY package*.json /build/flux-studis-selfservice-demo-backend/
COPY bin/install-dependencies.sh /build/flux-studis-selfservice-demo-backend/bin/install-dependencies.sh
RUN (cd /build/flux-studis-selfservice-demo-backend && npm ci --omit=dev && rm -rf bin)

RUN ln -s node_modules/flux-studis-selfservice-demo-backend/bin /build/flux-studis-selfservice-demo-backend/bin && ln -s node_modules/flux-studis-selfservice-demo-backend/src /build/flux-studis-selfservice-demo-backend/src

COPY . /build/flux-studis-selfservice-demo-backend/node_modules/flux-studis-selfservice-demo-backend

FROM node:19-alpine

USER node:node

ENTRYPOINT ["/flux-studis-selfservice-demo-backend/bin/flux-studis-selfservice-demo-backend-server.mjs"]

COPY --from=build /build /

ARG COMMIT_SHA
LABEL org.opencontainers.image.revision="$COMMIT_SHA"
