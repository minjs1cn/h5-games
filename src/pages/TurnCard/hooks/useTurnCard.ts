import useTurnCard from 'src/packages/turnCard/hooks'
import useMagicMove from 'src/packages/hooks/useMagicMove'
import useCollecInstance from 'src/packages/hooks/useCollecInstance'
import useToggleClassName from 'src/packages/hooks/useToggleClassName'
import useMagicZoom from 'src/packages/hooks/useMagicZoom'
import { computed, onMounted } from 'vue'
import localStorageWithTime from '@minjs1cn/toolkits/lib/localStorageWithTime'
import { getCacheKey } from 'src/core'

const key = getCacheKey('imm')

export default function() {
  const total = 9
  // 卡片激活状态
  const [state, toggleState] = useTurnCard(total)
  // 卡片组件实例
  const [instances, setItemRef] = useCollecInstance()
  // 卡片位置状态
  const [s1, magicMove] = useMagicMove(state.value.length, {
    duration: 500,
    middleIndex: 4
  })
  // 卡片className
  const [s2, toggleClassName] = useToggleClassName(state.value.length, {
    activeClassName: 'active',
    duration: 1000,
    filter: i => state.value[i].active
  })
  // 卡片缩放状态
  const [s3, zoomIn, zoomOut] = useMagicZoom(state.value.length, {
    duration: 500
  })

  // 卡片dom
  const els = computed(() => instances.value.map(_ => _.$el))

  onMounted(() => {
    if (localStorageWithTime.get(key)) {
      toggleClassName()
    } else {
      localStorageWithTime.set(key, '1')
      magicMove(els.value).then(() => {
        toggleClassName()
      })
    }
  })

  const cards = computed(() => {
    const results = []
    for (let i = 0; i < total; i++) {
      results.push({
        ...state.value[i],
        style: {
          ...s1.value[i],
          ...s3.value[i]
        },
        class: s2.value[i]
      })
    }
    return results
  })

  return [cards, els, toggleState, setItemRef, zoomIn, zoomOut] as const
}
