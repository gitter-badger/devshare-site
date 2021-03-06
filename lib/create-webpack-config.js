'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var buildPath = 'build';
var publicPath = 'assets';
var port = process.env.PORT || 3000;
var webpackPort = process.env.WEBPACK_PORT || 3001;

function createWebpackConfig(options) {
  if (!options) { options = {}; }

  var devtool = options.dev ? 'eval-source-map' : 'sourcemap';

  var entry = options.entry || [
    './app/client.js'
  ];

  if (options.dev) {
    entry = entry.concat(
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:' + webpackPort
    );
  }

  var output = {
    path: path.resolve(__dirname, '..', buildPath),
    filename: options.outputFilename || (options.dev ? 'bundle.js' : 'bundle.[hash].js'),
    publicPath: options.dev ?
      'http://localhost:' + webpackPort + '/' + publicPath + '/' :
      '/' + publicPath + '/',
    libraryTarget: options.outputLibraryTarget
  };

  var plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/),
    new ExtractTextPlugin('style.[hash].css', {allChunks: true}),
    new webpack.DefinePlugin({
      "require.specified": "require.resolve"
    })
  ];

  if (options.dev) {
    plugins = plugins.concat(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins = plugins.concat(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }));
  }

  if (options.target === 'node') {
    plugins = plugins.concat(
      new webpack.BannerPlugin('require("source-map-support").install();',
        {raw: true, entryOnly: true}));
  } else {
    plugins = plugins.concat([
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      function() {
        this.plugin('done', function(stats) {
          fs.writeFileSync(
            path.resolve(__dirname, '..', 'stats.json'),
            JSON.stringify(stats.toJson())
          );
        });
      }
    ]);
  }

  if (options.target) {
    plugins = plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          WEBPACK_TARGET: JSON.stringify(options.target)
        }
      }),
    ]);
  }

  var resolve = {
    alias: {
      assets: path.resolve(__dirname, '..', 'assets'),
      'kyper-grout': path.resolve(__dirname, '..', 'node_modules/kyper-grout/dist/grout.js'),
      'firebase': path.resolve(__dirname, '..', 'node_modules/firebase/lib/firebase-web.js'),
    },
    extensions: ['', '.js']
  };

  var cssLoaders = [
    'css',
    'resolve-url',
    'sass?outputStyle=expanded&'
  ].join('!');

  var loaders = [
    {
      exclude: [/node_modules/, /grout/],
      test: /\.js$/,
      loaders: options.dev ?
        ['react-hot', 'babel'] :
        ['babel']
    },
    {
      // exclude: [/node_modules/], //Needed for codemirror
      test: /\.(scss|css)$/,
      loader: options.dev ?
        'style!' + cssLoaders
        :
        ExtractTextPlugin.extract(cssLoaders)
    },
    {
      exclude: [/node_modules/],
      test: /\.(jpg|png|svg)$/,
      loader: 'url?limit=8192'
    },
    {
      exclude: [/node_modules/],
      test: /\.json$/,
      loader: 'json-loader'
    }
  ];
  return {
    bail: !options.dev,
    devtool: devtool,
    entry: entry,
    output: output,
    plugins: plugins,
    resolve: resolve,
    module: {loaders: loaders, noParse: /firepad/},
    target: options.target,

    port: port,
    webpackPort: webpackPort,
    buildPath: buildPath,
    publicPath: publicPath
  };
}
module.exports = createWebpackConfig;
