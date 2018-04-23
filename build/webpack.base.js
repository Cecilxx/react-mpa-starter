const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const entry = require('./entry')
const pagesArray = require('./pages')

const base = {
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },

  entry,

  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name]/index.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', 'html']
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.js[x]?$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js[x]?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?name=./fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=8192&name=./img/[hash].[ext]'
      }
    ]
  },

  plugins: []
}

pagesArray.forEach(page => {
  const htmlPlugin = new HtmlWebpackPlugin({
    title: page.chunkName,
    template: page.template,
    filename: page.filename,
    chunks: ['vendor', page.chunkName],
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  })
  base.plugins.push(htmlPlugin)
})

module.exports = base
