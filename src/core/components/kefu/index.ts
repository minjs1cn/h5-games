import { getSkinConfig, loadChunk, isPre, isTest } from 'src/core'
import { getUrl } from './qiyuWeb'

import './index.less'

const kefuVisible = getSkinConfig('kefuVisible')
const kefuChunkId = getSkinConfig('kefuChunkId')

/**
 * 打开页面，爱奇艺白名单机制
 * @param url - 页面地址
 */
export function openService(url: string) {
  if (process.env.NODE_ENV === 'development' || isTest || isPre) {
    return window.open(url)
  }
  /** 爱奇艺提供的打开页面的方法 */
  window.openService(url)
}
export interface Kefu {
  el: Element
  onBtnClick(openService: () => void): void
  mount(container: Element): void
}

interface KefuModule {
  default: Kefu
}

/**
 * 打开客服页面
 */
async function openKefu() {
  const url = await getUrl()
  openService(url)
}

async function init() {
  // 加载七鱼sdk
  // loadSdk()
  try {
    // 加载客服皮肤
    const kefu = await loadChunk<KefuModule>(kefuChunkId, '_kefu_', true)
    if (kefu) {
      // 绑定事件
      kefu.default.onBtnClick(openKefu)
    }
  } catch (error) {
    console.log(error)
  }
}

if (kefuVisible) {
  console.log('%c开启客服 ---', 'color:red;')
  init()
}
