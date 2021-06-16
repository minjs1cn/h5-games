const { upload } = require('@tuia/upload')
const { CDN } = require('./config')

async function startUpload() {
  await upload({
    cdn: CDN,
    hash: 0
  })
}

module.exports = {
  startUpload
}