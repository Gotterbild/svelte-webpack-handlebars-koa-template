FROM node:10-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache git bash openssh

# Set working directory
WORKDIR /usr/src/app

# Setup Node Modules for app
COPY ./package.json /usr/src/app/package.json
RUN npm install

# Setup PM2
RUN npm install pm2 -g

# Copy app
COPY ./routes /usr/src/app/routes
COPY ./views /usr/src/app/views
COPY ./locales /usr/src/app/locales
COPY ./app.js ./router.js ./favicon.ico ./start.sh /usr/src/app/

# Copy /assets and setup Node Modules
# The files will be deleted on PROD env
COPY ./assets/package.json /usr/src/app/assets/package.json
COPY ./assets/app /usr/src/app/assets/app
COPY ./assets/images /usr/src/app/assets/images
COPY ./assets/scss /usr/src/app/assets/scss
COPY ./assets/webpack.config.js /usr/src/app/assets/webpack.config.js

# Start Node app
ENTRYPOINT ["/bin/bash", "./start.sh"]