const base = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const pagesArray = require('./pages')

// const HomeExtractTextPlugin = new ExtractTextPlugin({
//   allChunks: true,
//   filename: '[name]/style.[contenthash:8].css'
// })
// const AboutExtractTextPlugin = new ExtractTextPlugin({
//   allChunks: true,
//   filename: '[name]/style.[contenthash:8].css'
// })

const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.[chunkhash:8].js'
})

const DefinePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
})

const UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  output: {
    comments: false
  }
})

base.output.publicPath = '../../dist/'
base.output.filename = '[name]/[name].[chunkhash:8].js'

pagesArray.forEach(page => {
  const CssExtractTextPlugin = new ExtractTextPlugin(
    '[name]/style.[contenthash:8].css'
  )
  const rule = {
    test: new RegExp(
      'src(\\\\|/)pages(\\\\|/)' + page.chunkName + '(\\\\|/).*\\.css$'
    ),
    use: CssExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader?minimize=true'
    })
  }

  base.module.rules.push(rule)
  base.plugins.push(CssExtractTextPlugin)
})

base.plugins.push(CommonsChunkPlugin, DefinePlugin, UglifyJsPlugin)

module.exports = base
