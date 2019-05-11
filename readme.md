## TL;DR

1. Create `.env` file from `.env_exmaple`
2. Run `docker-compose up` (requires `docker` and `docker-compose`)
3. Project will be available on `localhost:3000`
4. `/assets/app/home-page.js` has few lines commented. Comment them out to reproduce the error: https://github.com/sveltejs/svelte-loader/issues/88


## Infrastructure
It is a Docker image that runs two servers: 
1. Backend NodeJS with KOA + Handlebars app backed by Redis. Located at `/`.
2. Frontend NodeJS with Webpack to package SASS and JS. Located at `/assets/`.

`docker-compose up` will start both servers as well as a Redis server.

## Docker
We are using Docker for both testing and production. `docker-compose up` will start the test server on `localhost:3000`.

## Development
`NODE_ENV` environment variable need to be set. You can set it manually or create a `.env` file for Docker to read. Look at `.env_example` for more information.
