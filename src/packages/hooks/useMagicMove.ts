import { CSSProperties, ref } from 'vue'

interface MagicMoveOptions {
  duration: number
  middleIndex: number
}

/**
 * 神奇移动
 * @param refs - 组件数组
 * @param duration - 动画时长
 */
export default function(
  count: number,
  { middleIndex, duration }: MagicMoveOptions
) {
  const state = ref(
    Array.from({ length: count }).map(() => ({} as CSSProperties))
  )

  function magicMove(els: Array<HTMLElement>) {
    const index = middleIndex || (els.length / 2) | 0

    return new Promise((resolve: Function) => {
      // 中间那个dom
      const middle = els[index].getBoundingClientRect()
      // 遍历所有dom
      for (let i = 0; i < els.length; i++) {
        // 获取当前dom位置
        const item = els[i].getBoundingClientRect()
        // 设置当前组件的偏移位置
        state.value[i].transitionDuration = '0ms'
        state.value[i].transform = `translate(${middle.x -
          item.x}px,${middle.y - item.y}px)`
      }
      // 下一桢的时候恢复位置，发生动画
      setTimeout(() => {
        for (let i = 0; i < els.length; i++) {
          state.value[i].transitionDuration = `${duration}ms`
          state.value[i].transform = 'translate(0,0)'
        }
        setTimeout(resolve, duration)
      })
    })
  }

  return [state, magicMove] as const
}
