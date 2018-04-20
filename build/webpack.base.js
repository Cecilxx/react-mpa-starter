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

  /*
  ******************重要******************
  */
  entry,

  output: {
    path: path.join(__dirname, '../dist'), // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    publicPath: '/',
    filename: '[name]/index.js' // 每个页面对应的主js的生成配置
    // chunkFilename: 'js/[id].chunk.js' // chunk生成的配置
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

  plugins: [
    /*
    ******************重要******************
    **单独使用link标签加载css并设置路径，相对于output配置中的publickPath
    */
    /*
    ******************重要******************
    */
    // new HtmlWebpackPlugin({
    //   filename: './home/index.html', // 生成的html存放路径
    //   template: '../src/Pages/Home/index.html',
    //   chunks: ['vendor', 'home'] // 需要引入的chunk，不配置就会引入所有页面的资源
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './about/index.html',
    //   template: '../src/Pages/About/index.html',
    //   chunks: ['vendor', 'about']
    // })
  ],

  // //使用webpack-dev-server，提高开发效率
  devServer: {
    contentBase: '../dist',
    host: 'localhost',
    port: 9090, // 默认8080
    inline: true, // 可以监控js变化
    hot: true // 热启动
  }
}

pagesArray.forEach(page => {
  const htmlPlugin = new HtmlWebpackPlugin({
    title: page.chunkName,
    template: page.template,
    filename: page.filename,
    chunks: ['vendor', page.chunkName],
    // hash:true,
    minify: {
      removeComments: true,
      collapseWhitespace: false // 删除空白符与换行符
    }
  })
  base.plugins.push(htmlPlugin)
})

module.exports = base
