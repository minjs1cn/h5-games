import { ref, computed } from 'vue'
import localStorageWithTime from '@minjs1cn/toolkits/lib/localStorageWithTime'
import { isNull } from '@minjs1cn/toolkits/lib/is'
import showNoTimesModal from '../libs/showNoTimesModal'
import { getConfig, getCacheKey } from 'src/core'

const key = getCacheKey('limitTimes')

export default function useLimitTimes() {
  /** 初始化参与次数 */
  let initValue = getConfig('limitTimes')

  // 如果有缓存，则更新参与次数
  const cache = localStorageWithTime.get(key)
  if (isNull(cache)) {
    localStorageWithTime.set(key, initValue + '')
  } else {
    initValue = parseInt(cache)
  }

  // 转化为响应式数据
  const limitTimes = ref(initValue)

  // 减少次数
  const decreaseLimitTimes = () => {
    limitTimes.value--
    localStorageWithTime.set(key, limitTimes.value + '')
  }

  // 是否还有参数次数
  const hasLimitTimes = computed(() => limitTimes.value > 0)

  // 文案显示
  const limitTimesText = computed(() => {
    if (limitTimes.value > 0) return `今日剩余: ${limitTimes.value} 次`
    return '今日次数已用完'
  })

  return {
    limitTimes,
    hasLimitTimes,
    decreaseLimitTimes,
    showNoTimesModal,
    limitTimesText
  }
}
