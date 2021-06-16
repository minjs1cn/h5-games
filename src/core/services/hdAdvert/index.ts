import { TokenData, getToken } from './getToken'
import { getAdvert, AdvertResult } from './getAdvert'

// export { AdvertResult, Advert } from './getAdvert'

/**
 * doJoin请求数据类型
 */
export interface DojoinData extends TokenData {
  activityId: string
}

/**
 * 请求发券
 * @param params
 */
export async function doJoin(params: DojoinData): Promise<AdvertResult> {
  const { data } = await getToken(params)
  return getAdvert({
    token: data,
    activityId: params.activityId
  })
}
