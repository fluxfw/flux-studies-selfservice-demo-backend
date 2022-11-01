FROM node:19-alpine AS build

COPY package*.json /build/flux-studies-selfservice-demo-backend/
COPY bin/install-dependencies.sh /build/flux-studies-selfservice-demo-backend/bin/install-dependencies.sh
RUN (cd /build/flux-studies-selfservice-demo-backend && npm ci --omit=dev && rm -rf bin) 

COPY . /build/flux-studies-selfservice-demo-backend/node_modules/flux-studies-selfservice-demo-backend

FROM node:19-alpine

USER node:node

ENTRYPOINT ["/flux-studies-selfservice-demo-backend/node_modules/flux-studies-selfservice-demo-backend/bin/flux-studies-selfservice-demo-backend-server.mjs"]

COPY --from=build /build /

ARG COMMIT_SHA
LABEL org.opencontainers.image.revision="$COMMIT_SHA"
