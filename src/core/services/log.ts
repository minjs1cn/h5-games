import logUrl from '@tuia/openlog'
import axios from 'axios'
import { hump2str } from '@minjs1cn/toolkits/lib/string'
import { loadImage } from '@minjs1cn/toolkits/lib/loadChunk'
import { isPre, isTest } from '../utils'

const ajax = axios.create()

// 开发环境
if (process.env.NODE_ENV === 'development') {
  logUrl.setEnv(logUrl.LogEnv.test)
}

// 测试环境
if (isTest) {
  logUrl.setEnv(logUrl.LogEnv.test)
}

// 预发环境
if (isPre) {
  logUrl.setEnv(logUrl.LogEnv.pre)
}

ajax.interceptors.request.use(config => {
  return config
})

ajax.interceptors.response.use(response => {
  return response.data
})

interface LogData {
  appKey: string | undefined
  activityId: string | undefined
  deviceId: string | undefined
  slotId: string | undefined
  [index: string]: string | undefined
}

interface JsonData {
  [index: string]: string
}

/**
 * 访问日志
 */

export async function visit(data: LogData) {
  const json: JsonData = {}
  Object.keys(data).forEach(key => {
    json[hump2str(key)] = data[key] || ''
  })
  return await loadImage(
    logUrl(
      206,
      {
        ...json,
        _t: Date.now() + ''
      },
      logUrl.LogName.inner
    )
  )
}

/**
 * 参与日志
 */
export async function doJoin(data: LogData) {
  const json: JsonData = {}
  Object.keys(data).forEach(key => {
    json[hump2str(key)] = data[key] || ''
  })
  try {
    return await loadImage(
      logUrl(
        207,
        {
          ...json,
          _t: Date.now() + ''
        },
        logUrl.LogName.inner
      )
    )
  } catch (error) {
    console.log(error)
  }
}

/**
 * 券曝光
 * @param url
 */
export async function expose(url: string) {
  return await axios.get(url)
}

/**
 * 券点击
 * @param url
 */
export async function click(url: string) {
  return await axios.get(url)
}
