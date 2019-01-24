FROM node:latest

LABEL maintainer="Anton Kharkhonov <a.kharkhonov@gmail.com>"

RUN mkdir -p /app
ADD package.json /app
WORKDIR /app
RUN npm install --only=production
ENV NODE_PATH=/app/node_modules

COPY . /app/

CMD node /app/bin/www
