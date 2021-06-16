import { axios } from 'src/core'
import { Response } from '../types'

/**
 * GetToken响应数据类型
 */
export interface TokenResult extends Response {
  data: string
}

/**
 * GetToken请求数据类型
 */
export interface TokenData {
  appKey: string
  slotId: string
  deviceId: string
  imei: string
}

/**
 * 获取token
 * @param params
 */
export async function getToken(params: TokenData): Promise<TokenResult> {
  return await axios.get('/hdAdvert/getToken', {
    params: {
      ...params,
      _t: Date.now()
    }
  })
}
