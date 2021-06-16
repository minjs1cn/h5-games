const { beforeStart } = require('./utils/before')
const { startUpload } = require('./utils/upload')
const { DIST, SRC, sdks } = require('./utils/config')
const path = require('path')
const fs = require('fs')
const utils = require('@tuia/upload/src/utils')
const { execSync } = require('child_process')

/**
 * 开始构建
 */
async function startBuild({
  libName,
  name,
  entry
}) {
  execSync(`vue-cli-service build --target lib --name ${libName} --filename ${name} ${entry} --formats umd-min`, { stdio: [0, 1, 2] })
}

/**
 * 重命名sdk
 * @param {string} name - sdk名称 
 */
function reName(name) {
  // js
  const oldPath = path.join(DIST, `${name}.umd.min.js`)
  const hash = utils.readFileHash256Sync(oldPath).substring(0, 8)
  const newPath = path.join(DIST, `${name}.${hash}.js`)
  fs.renameSync(oldPath, newPath)
  // map
  const oldPath1 = path.join(DIST, `${name}.umd.min.js.map`)
  const newPath1 = path.join(DIST, `${name}.${hash}.js.map`)
  fs.renameSync(oldPath1, newPath1)
  // css
  if (fs.existsSync(path.join(DIST, `${name}.css`))) {
    fs.renameSync(path.join(DIST, `${name}.css`), path.join(DIST, `${name}.${hash}.css`))
  }
}

/**
 * 启动
 */
async function start() {
  process.env.NODE_ENV = 'production'
  const { name } = await beforeStart('prod', sdks)
  // 暂时没有好方法，先这样处理
  let libName = name
  if (name.startsWith('kefu')) {
    libName = '_kefu_'
  }
  if (name === 'pv') {
    libName = '_pv_'
  }

  // 开始构建
  await startBuild({
    name,
    libName,
    entry: path.join(SRC, sdks, `${name}/main.ts`)
  })
  // 重命名
  reName(name)
  // 上传
  startUpload()
}

start()