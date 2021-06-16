import { Advert } from 'src/core/services/hdAdvert/getAdvert'
import CouponModal from 'src/core/components/coupon-modal'

export interface AdvertModalOptions extends Advert {
  callback?: {
    /** 点击领取 */
    onUse?: Function
    /** 点击关闭 */
    onClose?: Function
    /** 再来一次 */
    onAgain?: Function
  }
}

/**
 * 展示广告弹层
 * @param options 广告弹层配置项，包括弹层描述与回调函数
 */
export default function showCouponModal(options: AdvertModalOptions) {
  // 风控数据？

  const modal = new CouponModal(options)

  return modal.show(options)
}
