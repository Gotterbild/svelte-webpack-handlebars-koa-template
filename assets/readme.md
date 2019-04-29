##Frontend Workflow

We are using Webpack to bundle our .js and .css files. The configuration can be found in `/assets/webpack.config.js`

###Installation
`npm install` This will install all required dependencies based on the contents of `package.json`

### Source files
Source .js files are located in `assets/app`. Source .scss files are in `assets/scss`

### Destination files
Running webpack will generate two .js bundles, **app.bundle.min.js** and **vendor.bundle.min.js**. It will also generate **main.css**.

If you run the webpack dev server these files are not actually generated locally, but stored and served from memory. Running `npm run release` will generate these files for production and save them to /assets/js/* and /assets/css/*

### Test server
`npm start` This will start the webpack dev server on port 8080. Any changes made to the source files will trigger webpack to recreate the various bundles. An example of a file URL is `http://localhost:8080/js/vendor.bundle.min.js` pilotCMS is currently setup to serve all bundles from localhost:8080 when `application.isTest = true` (which should be all the time when testing)

You can browse the test server at `localhost:8080/webpack-dev-server`

### Create bundled files for release
`npm run release` This will run webpack in production mode, budnling the files and creating them locally.

### Notes
We are transpiling ES6 to ES5 and using Uglify for both JS and CSS.