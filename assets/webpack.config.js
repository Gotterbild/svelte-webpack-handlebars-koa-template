/* eslint-disable import/order, import/no-self-import */

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const precss = require('precss')
const autoprefixer = require('autoprefixer')
const postcssPresetEnv = require('postcss-preset-env')

const release_id = process.env.CIRCLE_SHA1 || 'test'

// prepare browserslist
const browserslist = []
for (const name in process.env) {
  if (name.match('browserslist')) {
    const record = process.env[name]
    browserslist.push(record)
  }
}

const config = {
  resolve: {
    alias: {
      App: path.resolve(__dirname, 'app/'),
    },
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  entry: {
    app: './app/app.js',
    vendor: ['jquery', 'what-input'],
    main: './scss/main.scss',
  },
  output: {
    filename: `./js/[name]-${release_id}.bundle.min.js`,
    sourceMapFilename: `./maps/[name]-${release_id}.map`,
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: false, // svelte 3 not yet supported
          },
        },
      },
      // Transpire JS to es2015
      // Babel required for Foundation6. http://foundation.zurb.com/sites/docs/javascript.html
      {
        test: /\.js$/,
        // exclude: /(node_modules)/,
        // Excluding node_modules also excludes processing external dependencies
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: browserslist,
                },
                useBuiltIns: true,
                debug: false,
              }],
            ],
          },
        }],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          // use: ['css-loader', 'sass-loader']
          use: [
            { loader: 'css-loader', options: { sourceMap: true } }, // Load CSS into Webpack
            // postcss-loader autoprefixes CSS
            // Not sure if needed. Installed based on usage notes here: http://foundation.zurb.com/sites/docs/sass.html
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  precss,
                  autoprefixer,
                  postcssPresetEnv(),
                ],
              },
            },
            // Compiles Sass to CSS
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['node_modules/motion-ui/src'],
                sourceMap: true,
                outputStyle: 'compact',
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader?limit=100000',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new ExtractTextPlugin(`./css/[name]-${release_id}.css`),
  ],
}

// Check if webpack is running in production mode
// We are adding plugins manually instead of using the -p flag
// The -p flag enables DefinePlugin and UglifyJsPlugin
// NODE_ENV=production webpack
if (process.env.NODE_ENV === 'production') {

  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    })
  )
  config.devtool = 'source-map'

}

module.exports = config
