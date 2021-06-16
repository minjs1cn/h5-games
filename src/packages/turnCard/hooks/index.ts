import { ref } from 'vue'

export interface Card {
  _i: number
  active: boolean
}

export type ToggleActive = (i: number) => void

export default function(count: number) {
  // 卡片状态
  const state = ref<Card[]>(
    Array.from({ length: count }).map((_, i) => ({
      _i: i,
      active: false
    }))
  )

  // 切换卡片状态
  const toggleActive: ToggleActive = i => {
    state.value[i].active = !state.value[i].active
  }

  return [state, toggleActive] as const
}
