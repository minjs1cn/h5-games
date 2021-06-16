import { stringify } from '@minjs1cn/toolkits/lib/query-string'
import { getConfig } from 'src/core/utils'

const version = '1.0.0'
const domain = 'https://hunter-report.dui88.com'

window.HUNTER_CONFIG = window.HUNTER_CONFIG || {}
window.HUNTER_CONFIG.client = 'tuia'
window.HUNTER_CONFIG.pageId = getConfig('skinName')

interface Prefparams {
  cache: number // 读取缓存时间
  dns: number // DNS 解析耗时
  tcp: number // TCP 连接耗时
  req: number // 网络请求耗时
  res: number // 数据传输耗时
  dom: number // DOM 解析耗时
  readycb: number // domContentLoaded回调函数耗时
  fasrt: number // 首屏异步资源加载耗时，即domContentLoaded和load之间加载的资源，一般为图片加载，JS异步加载的资源
  loadcb: number // load回调函数耗时
  fp: number // 白屏时间
  ready: number // DOM Ready耗时
  load: number // 页面完全加载时间
}

function prefParmas() {
  // https://www.w3.org/TR/navigation-timing/timing-overview.png
  const data: {
    [index: string]: Array<keyof PerformanceTiming>
  } = {
    cache: ['domainLookupStart', 'fetchStart'], // 读取缓存时间
    dns: ['domainLookupEnd', 'domainLookupStart'], // DNS 解析耗时
    tcp: ['connectEnd', 'connectStart'], // TCP 连接耗时
    req: ['responseStart', 'requestStart'], // 网络请求耗时
    res: ['responseEnd', 'responseStart'], // 数据传输耗时
    dom: ['domContentLoadedEventStart', 'domLoading'], // DOM 解析耗时
    readycb: ['domContentLoadedEventEnd', 'domContentLoadedEventStart'], // domContentLoaded回调函数耗时
    fasrt: ['domComplete', 'domContentLoadedEventEnd'], // 首屏异步资源加载耗时，即domContentLoaded和load之间加载的资源，一般为图片加载，JS异步加载的资源
    loadcb: ['loadEventEnd', 'loadEventStart'], // load回调函数耗时
    fp: ['domLoading', 'fetchStart'], // 白屏时间
    ready: ['domContentLoadedEventEnd', 'fetchStart'], // DOM Ready耗时
    load: ['loadEventEnd', 'fetchStart'] // 页面完全加载时间
  }

  const getData = {} as Prefparams
  const performance =
    window.performance ||
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    (window as any).msPerformance ||
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    (window as any).webkitPerformance
  if (!performance || !performance.timing) {
    return null
  }
  const timing = performance.timing
  Object.keys(data).map(item => {
    const firstParams = timing[data[item][0]] as number
    const secondParams = timing[data[item][1]] as number
    const value = Math.round(firstParams - secondParams)
    value >= 0 && value < 36e5 && (getData[item as keyof Prefparams] = value)
  })
  return getData as Prefparams
}

function init(options: { url: string }) {
  const { appKey, slotId, deviceId, activityId } = getConfig('query')

  const baseParmas = {
    client: window.HUNTER_CONFIG.client,
    appId: appKey || '', // 媒体ID
    pageId: window.HUNTER_CONFIG.pageId, // 页面ID
    slotId: slotId || '', // 广告位ID
    consumerId: deviceId || '', // consumerId
    activityId: activityId || '', // 活动ID
    version,
    url: location.href,
    /* eslint-disable-next-line @typescript-eslint/camelcase */
    a_oId: '', // 订单ID
    rid: '' // 广告位全链路追踪ID
  }

  const parmas = { ...baseParmas, ...(prefParmas() as Prefparams), fmp: 0 }

  // 自定义 白屏、首屏、整屏
  parmas.fmp = parmas.ready

  new Image().src = `${options.url}?${stringify(parmas)}`
}

const $ready = (function() {
  const funcs: Array<() => void> = []
  let ready = false

  function handler(e: Event) {
    // 只要有一种情况发送了，就阻止下个回调发送
    if (ready) {
      return
    }

    // 处理readystatechange，只有complete才往下走
    if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
      return
    }

    let i = 0
    for (i = 0; i < funcs.length; i++) {
      funcs[i].call(document)
    }

    ready = true
    funcs.length = 0
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', handler, false)
    window.addEventListener('load', handler, false) // `onload` 在WebKit < 535.23， Firefox < 9.0 不被支持；则降级为下方
    document.addEventListener('readystatechange', handler, false)
  }

  return function(fn: () => void) {
    if (ready) {
      fn.call(document)
    } else {
      funcs.push(fn)
    }
  }
})()

console.log('%c开启狩猎，线上生效 ---', 'color:red;')
// 只有线上环境处理
if (process.env.NODE_ENV === 'production') {
  $ready(() => {
    setTimeout(() => {
      init({
        url: `${domain}/bireport`
      })
    }, 0)
  })
}
