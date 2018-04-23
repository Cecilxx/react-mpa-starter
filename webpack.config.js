const base = require('./build/webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin()
const NoEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin()
const pageArray = require('./build/pages')

base.devServer = {
  contentBase: '',
  host: 'localhost',
  port: 9090,
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

base.plugins.push(HotModuleReplacementPlugin, NoEmitOnErrorsPlugin)

// base.module.rules.push(
//   {
//     test: /src(\\|\/)pages(\\|\/)home(\\|\/).*\.css$/,
//     use: HomeExtractTextPlugin.extract({
//       fallback: 'style-loader',
//       use: 'css-loader'
//     })
//   },
//   {
//     test: /src(\\|\/)pages(\\|\/)about(\\|\/).*\.css$/,
//     use: AboutExtractTextPlugin.extract({
//       fallback: 'style-loader',
//       use: 'css-loader'
//     })
//   }
// )

module.exports = base
