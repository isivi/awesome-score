// noinspection Eslint
var webpack = require('webpack');

// noinspection Eslint
module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      './ascore_js/**/*-test.js' // just load this file
    ],
    preprocessors: {
      './ascore_js/**/*-test.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-mocha'
    ],
    webpack: {
      module: {
        loaders: [
          // JS
          { test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel' },
          // CSS
          {
            test: /\.css$/,
            loader: 'style!css'
          },

          // LESS
          {
            test: /\.less$/,
            loader: 'style!css!less'
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
