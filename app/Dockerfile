FROM node:16-alpine as build-deps
WORKDIR /usr/src/app
COPY . .
RUN npm i
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]