# General Information
pilotCMS2 is the new version of pilotCMS, built with Node.js and KOA2.
[https://github.com/koajs/koa](https://github.com/koajs/koa)

## Infrastructure
The application does not interact with our database directly, it uses a Rest API instead. It can be accessed during testing at [http://rest-dev.crowleymarine.com](http://rest-dev.crowleymarine.com).

Docker
-
We are using Docker for both testing and production. `docker-compose up` will start the test server on port 3000

Development
-
`NODE_ENV` environment variable need to be set. You can set it manually or create a `.env` file for Docker to read. Look at `.env_example` for more information.

We have two separate Node installations. KOA2 is located at `/` and Webpack is at `/assets/`.

`docker-compose up` will start both servers as well as a Redis server.

Website will be available on [http://localhost:3000](http://localhost:3000).
`dev.crowleymarine.com` is an allowed host API-side, so you can add it to your hosts file and access development site on [http://dev.crowleymarine.com:3000](http://dev.crowleymarine.com:3000)

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
