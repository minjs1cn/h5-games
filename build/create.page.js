const fs = require('fs-extra')
const { PAGES } = require('./utils/config')
const path = require('path')
/**
 * 启动
 */
async function start() {
  process.env.NODE_ENV = 'development'
  if (process.argv.length < 3) {
    console.error('请输入文件名，例如: yarn dev:create Demo')
    return
  }

  let name = process.argv.pop()
  name = name.slice(0, 1).toLocaleUpperCase() + name.slice(1)
  
  const dest = path.join(PAGES, name)

  if(fs.existsSync(dest)) {
    console.error(`文件名已存在，请试试看: yarn dev:create ${name}_1`)
    return
  }

  fs.copySync(path.join(__dirname, './page-tpl'), path.join(PAGES, name))
  console.log(`${name} 创建完成`)
}

start()