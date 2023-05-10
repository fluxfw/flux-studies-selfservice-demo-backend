FROM node:20-alpine AS build

COPY bin/install-libraries.sh /build/flux-studis-selfservice-demo-backend/libs/flux-studis-selfservice-demo-backend/bin/install-libraries.sh
RUN /build/flux-studis-selfservice-demo-backend/libs/flux-studis-selfservice-demo-backend/bin/install-libraries.sh

RUN ln -s libs/flux-studis-selfservice-demo-backend/bin /build/flux-studis-selfservice-demo-backend/bin

COPY . /build/flux-studis-selfservice-demo-backend/libs/flux-studis-selfservice-demo-backend

FROM node:20-alpine

USER node:node

ENTRYPOINT ["/flux-studis-selfservice-demo-backend/bin/server.mjs"]

COPY --from=build /build /
