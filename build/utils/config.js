const path = require('path')
const tuiaConfig = require('../../.tuia.json')
const { execSync } = require('child_process')

/** 根目录 */
const ROOT = path.resolve(__dirname, '../../')
/** 打包输出目录 */
const DIST = path.join(ROOT, 'dist')
/** 源码目录 */
const SRC = path.join(ROOT, 'src')

const pages = 'pages'
const sdks = 'sdks'

/** 存放页面目录 */
const PAGES = path.join(ROOT, 'src', pages)
/** 存放SDK目录 */
const SDKS = path.join(ROOT, 'src', sdks)

/** HTML入口路径 */
const ENTRY_HTML = path.join(ROOT, 'public', 'index.html')
/** HTML输出路径 */
const OUTPUT_HTML = path.join(DIST, 'index.html')

const HOST = '//yun.tuisnake.com'
const CDN = tuiaConfig.cdn
const PUBLIC_PATH = HOST + CDN

/** 配置文件路径 */
const CONFIG_FILE_PATH = path.join(SRC, 'core', 'config.js')
/** 配置文件输出路径 */
const CONFIG_OUT_FILE_PATH = path.join(DIST, '[name]/config.json')

/** 外链资源 */
const EXTERNALS = {
  css: '',
  vendor: '/js/vendor.js',
}

/** 默认奖品配置项 */
const SKIN_OPTIONS = [
  {
    id: 1,
    image: "//yun.tuisnake.com/mami-media/img/691aa62e-d5xwaga1hn.png",
    title: "哈利波特全套",
    prizeType: "physical"
  },
  {
    id: 2,
    image: "//yun.tuisnake.com/mami-media/img/50d7608a-ociowk8pm5.png",
    prizeType: "physical",
    title: "盗墓笔记全套"
  },
  {
    id: 3,
    image: "//yun.tuisnake.com/h5-mami/couponPrize/lucky.png",
    prizeType: "lucky",
    title: "福袋"
  },
  {
    id: 4,
    image: "//yun.tuisnake.com/mami-media/img/8ecabe26-iq6wlrhpam.png",
    prizeType: "virtual",
    title: "冰与火之歌",
  },
  {
    id: 5,
    image: "//yun.tuisnake.com/mami-media/img/570a6594-vhcb3jmuz8.png",
    prizeType: "physical",
    title: "三体全套"
  },
  {
    id: 6,
    image: "//yun.tuisnake.com/h5-mami/couponPrize/thanks.png",
    prizeType: "thanks",
    title: "谢谢参与"
  }
]

/** 本地时间 */
const TIME = {
  now() {
    const time = new Date()
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  }
}

module.exports = {
  ROOT,
  DIST,
  SRC,
  PAGES,
  pages,
  SDKS,
  sdks,
  HOST,
  CDN,
  TIME,
  git: {
    config: {
      email: execSync('git config user.email').toString(),
      name: execSync('git config user.name').toString()
    }
  },
  PUBLIC_PATH,
  CONFIG_FILE_PATH,
  CONFIG_OUT_FILE_PATH,
  ENTRY_HTML,
  OUTPUT_HTML,
  EXTERNALS,
  SKIN_OPTIONS
}