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
