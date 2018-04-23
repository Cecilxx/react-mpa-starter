# 基于 webpack 的多入口文件（多页应用）脚手架

## 特征

* [x] web-dev-server : 基于 web-dev-server 启动本地服务
* [x] build : 打包静态资源
* [ ] react : 基于 react 及其周边库进行组件开发
* [ ] express : 基于 express 启动本地服务
* [ ] hot-replace : 实现热替换和热加载

## 目录
```
.
|-- README.md
|-- build                             --------------------------- 配置文件夹
|   |-- config.js
|   |-- entry.js
|   |-- pages.js
|   |-- server.js                     --------------------------- webpack-dev-server启动时没有
|   |-- webpack.base.js               --------------------------- 基础配置
|   `-- webpack.prod.js               --------------------------- prod环境
|-- dist                              --------------------------- build后的文件夹，每个页面对应一个子文件夹
|   |-- about                         --------------------------- about页
|   |   |-- about.6376e268.js
|   |   |-- index.html
|   |   `-- style.1d9e0002.css
|   |-- home                          --------------------------- home页
|   |   |-- home.14e45b94.js
|   |   |-- index.html
|   |   `-- style.9bbc47de.css
|   |-- list                          --------------------------- list页
|   |   |-- index.html
|   |   |-- list.a97938ca.js
        `-- style.2a9e0293.css
|   `-- vendor.bcc1824a.js            --------------------------- 提取的公共js文件
|-- package-lock.json
|-- package.json
|-- src
|   |-- common
|   |   `-- apply.js
|   `-- pages                         --------------------------- 每个页面对应一个子文件夹，必须要有index.html和index.js作为入口文件
|       |-- about                     --------------------------- about页 
|       |   |-- index.css
|       |   |-- index.html
|       |   `-- index.js
|       |-- home                      --------------------------- home页
|       |   |-- index.css
|       |   |-- index.html
|       |   `-- index.js
|       `-- list                      --------------------------- list页
|           |-- index.css
|           |-- index.html
|           `-- index.js
`-- webpack.config.js                 --------------------------- dev环境
```

## 添加页面
> 例如添加一个详情页

```
|-- pages                             --------------------------- 每个页面对应一个子文件夹，必须要有index.html和index.js作为入口文件
|       |-- about                     --------------------------- about页 
|       |   |-- index.css
|       |   |-- index.html
|       |   `-- index.js
|       |-- home                      --------------------------- home页
|       |   |-- index.css
|       |   |-- index.html
|       |   `-- index.js
|       |-- list                      --------------------------- list页
|       |   |-- index.css
|       |   |-- index.html
|       |   `-- index.js
|       `-- detail                    --------------------------- 新增详情页detail
|           |-- index.html
|           `-- index.js
```

## 启动

```
npm run dev
```
> 默认启动端口：[http://localhost:9090](http://localhost:9090), 输入[http://localhost:9090/home](http://localhost:9090)访问home页
## 打包

```
npm run build
```

## 备注
如果想要自定义文件目录或者自定义配置，需要在相应的webpack中进行配置和调试
