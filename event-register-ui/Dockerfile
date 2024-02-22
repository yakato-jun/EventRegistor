FROM node:21.6.1-bookworm-slim

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app
USER node

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]