# https://docs.docker.com/develop/develop-images/multistage-build/#stop-at-a-specific-build-stage
# https://docs.docker.com/compose/compose-file/#target


# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=13
ARG NGINX_VERSION=1.17


# "development" stage
FROM node:${NODE_VERSION}-alpine AS api_platform_client_development

WORKDIR /usr/src/client

RUN yarn global add @angular/cli

# prevent the reinstallation of node modules at every changes in the source code
COPY package.json package-lock.json ./
RUN set -eux; \
  yarn install

COPY . ./

VOLUME /usr/src/client/node_modules

EXPOSE 4200
CMD ng serve --port 4200 --host 0.0.0.0
