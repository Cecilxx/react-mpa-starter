const express = require('express')
const webpack = require('webpack')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const compiler = webpack(config)
const app = express()

// 引入webpack组件
app.use(
  WebpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
  })
)
app.use(WebpackHotMiddleware(compiler))

const router = express.Router()

router.get('/login', function (req, res, next) {
  res.sendfile('./src/views/login_register.html') // 发送静态文件
})
router.get('/register', function (req, res, next) {
  res.sendfile('./src/views/login_register.html')
})

// 根目录下的所有404错误，引向index.html页面，让react-router进行解析
router.get('/*', function (req, res) {
  res.sendfile('./src/views/index.html')
})
app.use(router)

app.listen(3000, function () {
  console.log('Listening on 3000')
})
