var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPage = (title, filename, chunks) => new HtmlWebpackPlugin({
  title,
  hash: true,
  filename: './' + filename + '.html',
  template: path.resolve(__dirname, './public/index.html'),
  chunks: [
    ...chunks,
    'chunk-vendors'
  ]
});

let resolve = dir => path.join(__dirname, 'src', dir)
module.exports = {
    configureWebpack: {
      entry: {
        main: resolve('./main'),
        options: resolve('./options/options')
      },
      plugins: [
        htmlPage('options', 'options', ['options']),
        htmlPage('main', 'index', ['main']),
        new webpack.DefinePlugin({
          'process.env': {
            PACKAGE_JSON: '"' + escape(JSON.stringify(require('./package.json'))) + '"'
          }
        })
      ]
    }
  }