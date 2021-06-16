import { getConfig } from 'src/core'

const query = getConfig('query')

/**
 * 缓存客服链接
 */
let url: string | undefined

function loadScript(src: string) {
  const j = document.createElement('script')
  j.async = true
  j.src = src
  document.head.appendChild(j)
}

/**
 * 加载七鱼sdk
 */
export function loadSdk() {
  window.ysf =
    window.ysf ||
    function(...args: unknown[]) {
      ;(window.ysf.a = window.ysf.a || []).push(args)
    }
  loadScript('//qiyukf.com/script/895e029b6bd533c9e14a2706b28bd3be.js')
}

/**
 * 初始化完成
 * @param callback - 回调地址
 */
function onReady(callback: Function) {
  const { activityId, slotId } = query
  const ysf = window.ysf
  ysf('logoff')
  ysf('config', {
    success: () => {
      url = window.ysf('url')
      callback(url)
    },
    data: JSON.stringify([
      { index: 0, key: 'appName', label: '来源APP', value: '静态活动爱奇艺' },
      { index: 1, key: 'appId', label: '广告位ID', value: slotId },
      { index: 2, key: 'activityId', label: '活动ID', value: activityId }
    ])
  })
}

/**
 * 获取客服链接
 */
export function getUrl(): Promise<string> {
  return new Promise(resolve => {
    if (url) return resolve(url)
    window.ysf('onready', () => {
      onReady(resolve)
    })
  })
}
