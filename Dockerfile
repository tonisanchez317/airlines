FROM node:14.10.1-alpine3.12
ARG APP_PORT
EXPOSE $APP_PORT
WORKDIR /app
COPY . .

RUN yarn install;
RUN yarn build;

CMD yarn app
