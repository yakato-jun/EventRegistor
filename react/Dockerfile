FROM node:21.6.1-bookworm-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .
EXPOSE 8080
WORKDIR /usr/src/app

CMD [ "yarn", "start" ]