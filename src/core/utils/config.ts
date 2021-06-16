import { parse } from '@minjs1cn/toolkits/lib/query-string'
import { PrizeType } from '@tuia/config-simplify'
import { CSSProperties } from 'vue'

const {
  id,
  appKey,
  slotId,
  deviceId,
  idfa,
  imei,
  oaid,
  mac,
  openUdId,
  androidId,
  flowTag,
  _env = 'prod'
} = parse(location.search)

type CONFIG = typeof window.CFG & {
  /** 所有url参数 */
  query: {
    /** 活动ID */
    activityId: string
    /** 媒体key  */
    appKey: string
    /** 广告位ID */
    slotId: string
    /** 设备ID */
    deviceId: string | undefined
    idfa: string | undefined
    imei: string | undefined
    oaid: string | undefined
    mac: string | undefined
    openUdId: string | undefined
    androidId: string | undefined
    /** 来源 */
    flowTag: string | undefined
    _env: string
  }
}

const CFG: CONFIG = {
  ...(window.CFG || { skinConfig: {}, options: [] }),
  query: {
    activityId: id as string,
    appKey: appKey as string,
    slotId: slotId as string,
    flowTag,
    deviceId,
    idfa,
    imei,
    oaid,
    mac,
    openUdId,
    androidId,
    _env
  }
}

console.log('%cUrl Query ---', 'color:red;')
console.table(CFG.query)

/**
 * 获取全局配置
 */
export function getConfig(): CONFIG
export function getConfig<k extends keyof CONFIG>(name: k): CONFIG[k]
export function getConfig<k extends keyof CONFIG>(name?: k) {
  if (name) {
    return CFG[name]
  }
  return CFG
}

/**
 * 获取皮肤配置
 */
export function getSkinConfig(): CONFIG['skinConfig']
export function getSkinConfig(name: string): string
export function getSkinConfig(name?: string) {
  if (name) {
    return CFG.skinConfig[name]
  }
  return CFG.skinConfig
}

/**
 * 获取奖品配置
 */
export function getSkinOptions() {
  return CFG.options
}

/**
 * 返回奖品项的下标
 * @param prizeType - 奖品类型
 */
export function getOptionIndexByPrizeType(prizeType: PrizeType = 'lucky') {
  let index = -1
  getSkinOptions().forEach((option, i) => {
    if (option.prizeType === prizeType) index = i
  })
  return index
}

/**
 * 获取用于缓存key值
 */
export function getCacheKey(key: string) {
  const query = getConfig('query')
  return [query.slotId, query.activityId, query.deviceId, key].join('_')
}

/**
 * 生成一个CSSProperties
 * @param configMap - css属性和配置项key的对象
 */
export function getConfigStyle(configMap: { [index: string]: string } = {}) {
  const style: { [index: string]: string } = {}
  const keys = Object.keys(configMap) as Array<keyof CSSProperties>
  keys.forEach(key => {
    style[key] =
      key === 'backgroundImage'
        ? `url(${getSkinConfig(configMap[key] as string)})`
        : getSkinConfig(configMap[key])
  })
  return style as CSSProperties
}
