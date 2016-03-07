'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    demo: ['./src/index.js']
  },

  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: 'babel', 
        exclude: /node_modules/ 
      }
    ]
  },

  externals: {
    'react': 'react',
    'react-dom': 'ReactDOM',
  },

  output: {
    filename: 'dist/google-login.js',
    libraryTarget: 'umd',
    library: 'GoogleLogin'
  },


  resolve: {
    extensions: ['', '.js']
  },

  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
};
