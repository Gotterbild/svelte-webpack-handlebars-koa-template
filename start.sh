#!/bin/bash

if [ "$NODE_ENV" == "development" ]; then
    cd assets && NODE_ENV=development npm install
    cd ..
else
    rm -rf /usr/src/app/assets
fi

# PM2 options
instances=2
script=app.js

if [ "$NODE_ENV" == "development" ]; then
   	# ICU directory is set in start script
   	# If we set ICU directory in ENV variable webpack-dev-server will fail to start
   	exec ./node_modules/.bin/npm-run-all --parallel start webpack
else
	# Set ICU directory
	export NODE_ICU_DATA="node_modules/full-icu"

   	# Start web server
   	cd /usr/src/app/ && pm2-docker -i $instances $script
fi
