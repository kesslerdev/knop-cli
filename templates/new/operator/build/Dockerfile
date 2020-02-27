---
to: <%= packageName %>/build/Dockerfile
---
FROM node:lts-alpine AS builder

RUN if [ -n "$http_proxy" ]; then npm config set proxy $http_proxy; npm config set https-proxy $http_proxy; fi

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

COPY . /app
RUN npm run build

FROM node:lts-alpine

# Add Tini
RUN apk add --no-cache tini

ENV OPERATOR=/app/src/index.js \
    USER_UID=1001 \
    USER_NAME=<%= packageName %> \
    NODE_ENV=production \
    NODE_NO_WARNINGS=1

COPY build/bin /usr/local/bin

RUN if [ -n "$http_proxy" ]; then npm config set proxy $http_proxy; npm config set https-proxy $http_proxy; fi

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

COPY --from=builder /app/build/dist /app/src
COPY ./deploy/crds /app/deploy/crds
RUN  /usr/local/bin/user_setup

ENTRYPOINT ["/usr/local/bin/entrypoint"]

USER ${USER_UID}
