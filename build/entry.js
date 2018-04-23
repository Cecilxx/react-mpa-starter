const path = require('path')
const fs = require('fs')
const SRC_PATH = path.join(__dirname, '../src')
const PAGES_PATH = path.join(SRC_PATH, './pages')
let entryFiles = {}

function eachFile (dir) {
  try {
    fs.readdirSync(dir).forEach(function (file) {
      const filePath = dir + '/' + file
      const fname = path.basename(file, '.js')
      entryFiles[fname] = filePath
    })
  } catch (e) {}
}

eachFile(PAGES_PATH)

module.exports = entryFiles
