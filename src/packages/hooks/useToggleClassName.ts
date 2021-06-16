import { ref } from 'vue'

export interface ToggleClassNameOptions {
  /** 激活状态class */
  activeClassName: string
  /** 激活状态停留时长 */
  duration: number
  /** 过滤 */
  filter(i: number): boolean
}

export default function(
  count: number,
  { activeClassName, duration, filter }: ToggleClassNameOptions
) {
  const state = ref(Array.from({ length: count }).map(() => ''))
  let i = 0,
    timer: null | number
  const len = count
  const filters: {
    [index: string]: undefined | boolean
  } = {}

  const decrease = () => {
    if (i === len - 1) {
      i = 0
    } else {
      i += 1
    }
  }

  const destory = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const toggleClassName = () => {
    if (i === 0) {
      state.value[len - 1] = ''
    } else {
      state.value[i - 1] = ''
    }
    if (!filter(i)) {
      state.value[i] = activeClassName
      decrease()
      timer = setTimeout(toggleClassName, duration)
      return
    }
    if (!filters[i]) {
      filters[i] = true
    }
    if (Object.keys(filters).length >= len) {
      destory()
    } else {
      decrease()
      toggleClassName()
    }
  }

  return [state, toggleClassName] as const
}
