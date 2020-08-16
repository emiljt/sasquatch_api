FROM node:latest

WORKDIR /srv/sasquatch_api

COPY ./package*.json ./

RUN npm install

USER node

CMD npm start
