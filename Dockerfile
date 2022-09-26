FROM node:18-alpine AS build

COPY package*.json /build/flux-studies-selfservice-demo-backend/
RUN (cd /build/flux-studies-selfservice-demo-backend && npm ci --omit=dev)

# TODO: npm removes symlinks (Or bad tar extract?)
RUN for lib in flux-css-api flux-fetch-api; do mkdir -p /build/flux-studies-selfservice-demo-backend/node_modules/flux-studies-selfservice-frontend/src/Libs/$lib && ln -s ../../../../$lib/src /build/flux-studies-selfservice-demo-backend/node_modules/flux-studies-selfservice-frontend/src/Libs/$lib/src; done

COPY . /build/flux-studies-selfservice-demo-backend

FROM node:18-alpine

USER node:node

ENTRYPOINT ["/flux-studies-selfservice-demo-backend/bin/flux-studies-selfservice-demo-backend-server.mjs"]

COPY --from=build /build /

ARG COMMIT_SHA
LABEL org.opencontainers.image.revision="$COMMIT_SHA"
