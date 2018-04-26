const base = require('./build/webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const pageArray = require('./build/pages')
const config = require('./build/config')

const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin()

const NoEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin()

const DefinePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
})

base.devServer = {
  contentBase: '',
  host: 'localhost',
  port: config.port,
  inline: true,
  hot: true
}

pageArray.forEach(page => {
  const CssExtractTextPlugin = new ExtractTextPlugin('[name]/[name].css')

  const rule = {
    test: new RegExp(
      'src(\\\\|/)pages(\\\\|/)' + page.chunkName + '(\\\\|/).*\\.css$'
    ),
    use: CssExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  }

  base.plugins.push(CssExtractTextPlugin)
  base.module.rules.push(rule)
})

base.plugins.push(
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  DefinePlugin
)

base.devtool = 'source-map'
module.exports = base
