// pagesArray.js
const path = require('path')
const fs = require('fs')
const SRC_PATH = path.join(__dirname, '../src')
const PAGES_PATH = path.join(SRC_PATH, './pages')
let pagesArray = []

function eachFile (dir) {
  try {
    fs.readdirSync(dir).forEach(function (file) {
      const fileObj = {}
      const filePath = `${dir}/${file}`
      const chunkName = path.basename(file, '.html')

      fileObj['title'] = file
      fileObj['filename'] = `${file}/index.html`
      fileObj['template'] = `${filePath}/index.html`
      fileObj['chunkName'] = chunkName

      pagesArray.push(fileObj)
    })
  } catch (e) {}
}
eachFile(PAGES_PATH)
// 导出我们需要的html模板信息

module.exports = pagesArray
