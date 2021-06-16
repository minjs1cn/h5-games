import { ref, CSSProperties } from 'vue'

export interface MagicZoomOptions {
  duration?: number
  scale?: number
}

/**
 * 神奇放大
 * @param el - HTMLElement
 */
export default function(
  count: number,
  { duration = 1000, scale = 2 }: MagicZoomOptions = {}
) {
  const state = ref(
    Array.from({ length: count }).map(() => ({} as CSSProperties))
  )

  function zoom(el: HTMLElement, i: number) {
    if (!el.parentElement) {
      return Promise.resolve()
    }
    const { x, y, width, height } = el.parentElement.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const targetX = (width - elRect.width) / 2 + x - elRect.x
    const targetY = (height - elRect.height) / 2 + y - elRect.y
    return new Promise((resolve: Function) => {
      state.value[i].transitionDuration = `${duration}ms`
      state.value[
        i
      ].transform = `translate(${targetX}px, ${targetY}px) scale(${scale})`
      state.value[i].zIndex = 1
      setTimeout(resolve, duration)
    })
  }

  function reset(i: number) {
    delete state.value[i].transform
    delete state.value[i].transitionDuration
    delete state.value[i].zIndex
  }

  return [state, zoom, reset] as const
}
