'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    demo: ['./src/index.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'google-login.js',
    libraryTarget: 'umd',
    library: 'GoogleLogin',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    }]
  },
  externals: {
    'react': 'react',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
