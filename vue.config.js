var webpack = require('webpack');
const path = require('path');

module.exports = {
  runtimeCompiler: true,
    configureWebpack: {
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            PACKAGE_JSON: '"' + escape(JSON.stringify(require('./package.json'))) + '"'
          }
        })
      ]
    }
  }