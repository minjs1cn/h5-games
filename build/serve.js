const { beforeStart } = require('./utils/before')
const { SKIN_OPTIONS, pages } = require('./utils/config')
const { compiled, simplifySkinOption, simplifySkinConfig } = require('@tuia/config-simplify')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

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
  const { name, entry, html, page } = await beforeStart('dev', pages)
  // 读取皮肤配置项
  const configJsonFile = path.join(process.cwd(), page.replace('main.ts', 'config.json'))
  let config = {}
  if (fs.existsSync(configJsonFile)) {
    config = require(configJsonFile)
  }
  
  // 页面中注入全局配置
  provideConfig({
    entry,
    html
  }, {
    skinConfig: config.skinConfig ? simplifySkinConfig(config.skinConfig) : {},
    options: simplifySkinOption(SKIN_OPTIONS),
    skinName: name,
    limitTimes: 8
  })
  
  // 开启服务
  startServer()
}

start()