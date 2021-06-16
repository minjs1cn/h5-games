import { getConfig } from 'src/core'

const query = getConfig('query')

const qiyuUrl =
  'https://tuia.qiyukf.com/client?k=895e029b6bd533c9e14a2706b28bd3be&wp=1&shuntId=0'

export function getUrl() {
  const { activityId, slotId } = query
  const appName = '静态活动爱奇艺'
  const title = encodeURIComponent(`${appName}/${slotId}/${activityId}`)

  return `${qiyuUrl}&t=${title}`
}
