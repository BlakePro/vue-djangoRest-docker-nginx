FROM node:14.16.1-alpine3.12
WORKDIR /app
RUN yarn global add serve
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
CMD [ "serve", "dist" ]
