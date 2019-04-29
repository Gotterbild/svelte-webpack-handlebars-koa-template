## Infrastructure
It is a Docker image that runs KOA+Handlebars app backed by Redis. Webpack is used to package frontend and Svelte boilerplate is created
We have two separate Node installations. KOA2 is located at `/` and Webpack is at `/assets/`.

Docker
-
We are using Docker for both testing and production. `docker-compose up` will start the test server on port 3000

Development
-
`NODE_ENV` environment variable need to be set. You can set it manually or create a `.env` file for Docker to read. Look at `.env_example` for more information.

`docker-compose up` will start both servers as well as a Redis server.

### Redis

To clear redis cache for a certain page, add `clearcache` query parameter to URL, for example
http://dev.crowleymarine.com:3000/some/path/?clearcache

To clear redis cache for all pages, run
`docker container ls -a`
to determine `REDIS_CONTAINER_ID` and then run
`docker exec -it REDIS_CONTAINER_ID redis-cli FLUSHALL`

### ESLint

You should use ESLint in your code editor. There is `.eslintrc` config file in root folder containing rules. Some packages gonna be required for ESLint to work. You can install them like this:

```js
npm install eslint eslint-plugin-import eslint-plugin-html babel-eslint eslint-config-airbnb-base
```
