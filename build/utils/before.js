const { getPages, askForName } = require('@tuia/inquirer')
const { createEntryHtml } = require('./template')
const { TitleTag } = require('@tuia/config-simplify')
const { SRC, CONFIG_FILE_PATH } = require('./config')
const path = require('path')
const fs = require('fs')

/**
 * 服务开启前
 */
async function beforeStart(env = 'prod', root, message = '请输入') {
  if (root === undefined) throw Error('请指定入口文件夹')
  const isDev = env === 'dev'
  // 获取所有入口
  const pages = await getPages(`src/${root}/**/main.ts`)
  // 询问需要启动的入口名
  const name = await askForName('name', Object.keys(pages), message, root)
  const title = isDev ? name : TitleTag
  // 是否存在配置脚本
  const isExisted = fs.existsSync(path.join(SRC, root, name, 'config.js'))
  if (isExisted) {
    fs.writeFileSync(CONFIG_FILE_PATH, `
      const config = require('../${root + '/' + name}/config.js')
      const { simplifySkinConfig } = require('@tuia/config-simplify')
      window.CFG.skinConfig = simplifySkinConfig(config.skinConfig)
    `)
  }
  // 创建入口文件
  const {
    entry,
    html
  } = createEntryHtml({
    title,
    main: `/src/${root}/${name}/main.ts`,
    config: isDev && isExisted ? `/js/config.js` : ''
  })
  process.env.SKIN_NAME = name
  process.env.SKIN_ENTRY = path.join(SRC, root, name, 'main.ts')
  
  return new Promise(resolve => {
    resolve({
      name,
      title,
      entry,
      html,
      page: pages[name]
    })
  })
}

module.exports = {
  beforeStart
}