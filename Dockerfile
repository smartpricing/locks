FROM node:18-alpine

RUN apk update && apk add curl vim

WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json
# install packages using buildkit secret for .npmrc
RUN --mount=type=secret,id=npmrc,dst=/root/.npmrc npm ci --ignore-scripts --omit=dev

COPY . .

CMD npm run start
