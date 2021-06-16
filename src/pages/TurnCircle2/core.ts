import { ref } from '@vue/reactivity'
import useLimitTimes from './useLimitTimes'
import userConfig from './userConfig'

export function useDoJoinService() {
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
  /**
   * 开始抽奖
   */
  async function doJoin() {
    // 没有次数，不允许参与
    if (limitTimes.value <= 0) return
    // 请求正在发送中，不允许参与
    if (isPending.value) return
    // 开始请求
    setPending(true)
    // 参与次数减1
    decreaseLimitTimes()

    if (limitTimes.value === 0) return true
    return
  }

  const showResult = ref(false)

  /**
   * 广告弹层
   * @param params
   */
  function showResultModal({ reset }: { reset: Function }) {
    // 接口发送完毕
    setPending(false)
    showResult.value = true
    reset()
  }

  function closeResultModal() {
    showResult.value = false
  }

  /**
   * 参与前置判断
   */
  function canDoJoin() {
    // 请求处理中
    if (isPending.value) return false
    // 没有次数了
    if (!hasLimitTimes.value) {
      return false
    }
    return true
  }

  function showThanksModal({ reset }: { reset: Function }) {
    // 接口发送完毕
    setPending(false)
    reset()
  }

  return {
    isPending,
    setPending,
    limitTimes,
    limitTimesText,
    hasLimitTimes,
    closeResultModal,
    showResult,
    doJoin,
    canDoJoin,
    showResultModal,
    showNoTimesModal,
    showThanksModal
  }
}

export function getOptionIndexByPrizeType(id: number): number {
  let result = 0
  userConfig.options.forEach((option, index) => {
    if (option.id === id) {
      result = index
    }
  })
  return result
}
