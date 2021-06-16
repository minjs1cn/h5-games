import { doJoin as dojoin, log, getConfig, getSkinOptions } from 'src/core'
import { Advert } from '../services/hdAdvert/getAdvert'
import { ref } from 'vue'
import useLimitTimes from './useLimitTimes'
import showCouponModal, { AdvertModalOptions } from '../libs/showCouponModal'
import showJiMuModal from '../libs/showJimuModal'
import showOriginThanksModal, {
  ThanksModalHooks
} from '../libs/showThanksModal'

export default function useDoJoinService() {
  /** 所有URL参数 */
  const query = getConfig('query')
  /** 皮肤标识 */
  const skinName = getConfig('skinName')
  /** 奖品配置项 */
  const options = getSkinOptions()
  /** 日志基础数据 */
  const logData = {
    ...query,
    skinName
  }

  const {
    /** 剩余参与次数 */
    limitTimes,
    /** 是否还有剩余次数 */
    hasLimitTimes,
    /** 剩余次数文案 */
    limitTimesText,
    /** 参与次数减1 */
    decreaseLimitTimes,
    /** 次数用完弹层  */
    showNoTimesModal
  } = useLimitTimes()

  /** 是否请求正在处理 */
  const isPending = ref(false)
  /**
   * 设置请求状态
   * @param value - 是否还在请求
   */
  const setPending = (value: boolean) => {
    isPending.value = value
  }
  /** 中奖结果 */
  let lottery: Advert | undefined
  /**
   * 开始抽奖
   */
  async function doJoin() {
    // 没有次数，不允许参与
    if (limitTimes.value <= 0) return
    // 请求正在发送中，不允许参与
    if (isPending.value) return
    // 参与埋点
    log.doJoin(logData)
    // 开始请求
    setPending(true)
    // 参与次数减1
    decreaseLimitTimes()
    // 请求广告
    try {
      const result = await dojoin({
        ...query,
        imei: query.imei || '',
        deviceId: query.deviceId || ''
      })
      if (result.success && result.data && result.data.length) {
        lottery = result.data[0]
      }
    } catch (error) {
      console.log(error)
    }

    return lottery
  }

  /**
   * 广告弹层
   * @param params
   */
  function showResultModal(lottery: AdvertModalOptions) {
    // 接口发送完毕
    setPending(false)

    if (lottery.advertLayer.sourceType === 1) {
      // 积木弹层
      showJiMuModal(lottery)
    } else {
      // 非积木，代码片段弹层
      showCouponModal(lottery)
    }
  }

  /**
   * 谢谢参与弹层
   * @param hooks - 钩子
   */
  function showThanksModal(hooks: ThanksModalHooks = {}) {
    // 接口发送完毕
    setPending(false)
    showOriginThanksModal(hooks)
  }

  /**
   * 参与前置判断
   */
  function canDoJoin() {
    // 请求处理中
    if (isPending.value) return false
    // 没有次数了
    if (!hasLimitTimes.value) {
      showNoTimesModal()
      return false
    }
    return true
  }

  return {
    query,
    options,
    isPending,
    setPending,
    limitTimes,
    limitTimesText,
    hasLimitTimes,
    doJoin,
    canDoJoin,
    showResultModal,
    showThanksModal,
    showNoTimesModal
  }
}
