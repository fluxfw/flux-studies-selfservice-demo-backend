FROM node:19-alpine AS build

COPY bin/install-libraries.sh /build/flux-studis-selfservice-demo-backend/libs/flux-studis-selfservice-demo-backend/bin/install-libraries.sh
RUN /build/flux-studis-selfservice-demo-backend/libs/flux-studis-selfservice-demo-backend/bin/install-libraries.sh

RUN ln -s libs/flux-studis-selfservice-demo-backend/bin /build/flux-studis-selfservice-demo-backend/bin && ln -s libs/flux-studis-selfservice-demo-backend/src /build/flux-studis-selfservice-demo-backend/src

COPY . /build/flux-studis-selfservice-demo-backend/libs/flux-studis-selfservice-demo-backend

FROM node:19-alpine

USER node:node

EXPOSE 8080
EXPOSE 8443

ENTRYPOINT ["/flux-studis-selfservice-demo-backend/bin/server.mjs"]

COPY --from=build /build /

ARG COMMIT_SHA
LABEL org.opencontainers.image.revision="$COMMIT_SHA"
