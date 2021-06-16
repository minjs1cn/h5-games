const { beforeStart } = require('./utils/before')
const { pages, CONFIG_OUT_FILE_PATH, SRC } = require('./utils/config')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

/**
 * 开始构建
 */
async function startBuild() {
  execSync('vue-cli-service build', { stdio: [0, 1, 2] })
}

/**
 * 输出配置项文件到打包目标
 * @param {*} pages 
 * @param {*} name 
 */
function createConfig(pages, name) {
  const entry = pages + '/' + name
  const configJsonFile = path.join(SRC, entry, 'config.json')
  const configJsFile = path.join(SRC, entry, 'config.js')
  const outputFilePath = CONFIG_OUT_FILE_PATH.replace('[name]', name.toLowerCase())
  if (fs.existsSync(configJsonFile)) {
    fs.writeFileSync(outputFilePath, JSON.stringify(require(configJsonFile), null, 2))
  }
  if (fs.existsSync(configJsFile)) {
    fs.writeFileSync(outputFilePath, JSON.stringify(require(configJsFile), null, 2))
  }
}

/**
 * 启动
 */
async function start() {
  process.env.NODE_ENV = 'production'
  await beforeStart('prod', pages)
  await startBuild()
}

start()