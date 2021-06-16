import logUrl, { imageReport } from '@tuia/openlog'

function parse(query: string) {
  // Create an object with no prototype
  const ret = Object.create(null)
  if (typeof query !== 'string') {
    return ret
  }
  query = query.trim().replace(/^[?#&]/, '')
  if (!query) {
    return ret
  }
  let kvs
  return query.split('&').reduce((res, kv) => {
    kvs = kv.split('=')
    res[kvs[0]] = decodeURIComponent(kvs[1])
    return res
  }, {} as { [index: string]: unknown })
}

function hump2str(str: string) {
  return str.replace(/([A-Z])/g, (_, s) => '_' + s.toLowerCase())
}

const query = parse(location.search)

const isTest =
  location.host.indexOf('localhost') !== -1 ||
  location.host.indexOf('tuiatest.cn') !== -1 ||
  query._env === 'test'

const isPre = location.host.indexOf('tuiapre.cn') !== -1 || query._env == 'pre'

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

interface LogData {
  appKey: string | null
  activityId: string | null
  deviceId: string | null
  slotId: string | null
  [index: string]: string | null
}

interface JsonData {
  [index: string]: string
}

/**
 * 访问日志
 */

function visit(data: LogData) {
  const json: JsonData = {}
  Object.keys(data).forEach(key => {
    json[hump2str(key)] = data[key] || ''
  })
  imageReport(
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

visit({
  ...query,
  skinName: window.CFG.skinName,
  /* eslint-disable-next-line @typescript-eslint/camelcase */
  activity_id: query.id
})
console.log('%c访问+1', 'color:red;')
