const { beforeStart } = require('./utils/before')
const { compiled } = require('@tuia/config-simplify')
const fs = require('fs')
const { execSync } = require('child_process')
const { sdks } = require('./utils/config')

/**
 * 创建服务
 */
async function startServer() {
  execSync('vue-cli-service serve', { stdio: [0, 1, 2] })
}

/**
 * 页面中注入配置项等
 * @param {*} param0 
 * @param {*} config 
 */
function provideConfig({ entry, html }, config) {
  html = compiled(html, config)
  fs.writeFileSync(entry, html)
}

/**
 * 启动
 */
async function start() {
  process.env.NODE_ENV = 'development'
  const { name, entry, html } = await beforeStart('dev', sdks)
  
  // 页面中注入全局配置
  provideConfig({
    entry,
    html
  }, {
    skinConfig: {},
    options: [],
    skinName: name,
    limitTimes: 8
  })
  
  startServer()
}

start()