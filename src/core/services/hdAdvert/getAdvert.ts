import { axios, getConfig } from 'src/core'
import { Response } from '../types'

/**
 * 弹层数据
 */
interface AdvertLayer {
  /** 弹层ID */
  id: number
  /** 弹层代码 */
  code: string
  /** 弹层类型 */
  skinType: number
  /** 弹层来源 */
  sourceType: number
  /** 券图片 */
  image: string
}

/**
 * 广告数据
 */
export interface Advert {
  /** 广告 ID */
  advertId: string
  /** 落地页 */
  promoteUrl: string
  /** 订单号 */
  orderId: string
  /** 广告素材图片 */
  bannerPngUrl: string
  /** 广告素材缩略图 */
  thumbnailPngUrl: string
  /** 广告标题 */
  title: string
  /** 优惠券描述 */
  couponRemark: string
  /** 按钮文案 */
  buttonText: string
  /** 弹层数据 */
  advertLayer: AdvertLayer
  /** 埋点数据 */
  embed: AdvertEmbed
}

/**
 * 广告埋点数据
 */
interface AdvertEmbed {
  /** 券曝光 */
  advertExposureUrl: string
  /** 券点击 */
  advertClickUrl: string
}

/**
 * getAdvert响应数据类型
 */
export interface AdvertResult extends Response {
  data: Array<Advert>
}

/**
 * getAdvert请求数据类型
 */
interface GetAdvertData {
  token: string
  activityId: string
}

const { flowTag } = getConfig('query')

export async function getAdvert(data: GetAdvertData): Promise<AdvertResult> {
  return await axios.get('/hdAdvert/getAdvert', {
    params: {
      ...data,
      isTuiaCall: 1,
      appFlowType: 4,
      flowTag,
      _t: Date.now()
    }
  })
}
