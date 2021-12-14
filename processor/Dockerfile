FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY . .
RUN npm i
RUN npm run build
COPY ./.env ./dist

CMD ["npm", "start"]

EXPOSE 9001