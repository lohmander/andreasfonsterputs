FROM node:10-alpine

RUN mkdir /app
WORKDIR /app

ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn

ADD . /app
RUN yarn build

CMD ["yarn", "start"]