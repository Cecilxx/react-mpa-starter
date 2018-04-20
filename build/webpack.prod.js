const base = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const HomeExtractTextPlugin = new ExtractTextPlugin({
  allChunks: true,
  filename: '[name]/style.[contenthash:8].css'
})
const AboutExtractTextPlugin = new ExtractTextPlugin({
  allChunks: true,
  filename: '[name]/style.[contenthash:8].css'
})

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

base.plugins.push(
  HomeExtractTextPlugin,
  AboutExtractTextPlugin,
  CommonsChunkPlugin,
  DefinePlugin,
  UglifyJsPlugin
)

/**
 ************ 自动配置css插件失败，test正则不知道怎么写*************
 */
// const pagesArray = require('./pages')
// pagesArray.forEach(page => {
//   const CSSExtractTextPlugin = new ExtractTextPlugin({
//     allChunks: true,
//     filename: '[name]/style.[contenthash:8].css'
//   })

//   base.plugins.push(CSSExtractTextPlugin)

//   base.module.rules.push({
//     test: /src(\\|\/)pages(\\|\/)home(\\|\/).*\.css$/,
//     use: CSSExtractTextPlugin.extract({
//       fallback: 'style-loader',
//       use: 'css-loader?minimize=true'
//     })
//   })
// })

base.module.rules.push(
  {
    test: /src(\\|\/)pages(\\|\/)home(\\|\/).*\.css$/,
    use: HomeExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader?minimize=true'
    })
  },
  {
    test: /src(\\|\/)pages(\\|\/)about(\\|\/).*\.css$/,
    use: AboutExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader?minimize=true'
    })
  }
)

module.exports = base
