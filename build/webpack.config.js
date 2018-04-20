const base = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const HomeExtractTextPlugin = new ExtractTextPlugin('[name]/style.css')
const AboutExtractTextPlugin = new ExtractTextPlugin('[name]/style.css')
const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin()
const NoEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin()

base.plugins.push(
  HomeExtractTextPlugin,
  AboutExtractTextPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin
)

base.module.rules.push(
  {
    test: /src(\\|\/)pages(\\|\/)Home(\\|\/).*\.css$/,
    use: HomeExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  },
  {
    test: /src(\\|\/)pages(\\|\/)About(\\|\/).*\.css$/,
    use: AboutExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  }
)

module.exports = base
