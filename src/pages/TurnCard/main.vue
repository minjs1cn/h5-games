<template>
  <App>
    <Banner />
    <div class="flex-center">
      <div class="limit-times" :style="limitTimesStyle">
        {{ limitTimesText }}
      </div>
    </div>
    <TurnCard :cards="cards" :setItemRef="setItemRef" @click="onStart" />
  </App>
</template>

<script lang="ts">
import { CSSProperties, defineComponent } from 'vue'
import { getSkinConfig, useDoJoinService } from 'src/core'
import App from 'src/core/components/app/index.vue'

import Banner from './components/banner/index.vue'
import TurnCard from './components/my-turnCard/index.vue'
import useTurnCard from './hooks/useTurnCard'

import './main.less'

export default defineComponent({
  name: 'Main',

  components: {
    App,
    Banner,
    TurnCard
  },

  setup() {
    const {
      limitTimesText,
      doJoin,
      canDoJoin,
      showResultModal,
      showThanksModal
    } = useDoJoinService()

    const [
      cards,
      els,
      toggleActive,
      setItemRef,
      zoomIn,
      zoomOut
    ] = useTurnCard()

    const onStart = async (i: number) => {
      if (cards.value[i].active) return
      if (!canDoJoin()) return
      const lottery = await doJoin()
      if (lottery) {
        toggleActive(i)
        setTimeout(() => {
          zoomIn(els.value[i], i).then(() => {
            showResultModal(lottery)
            setTimeout(() => {
              zoomOut(i)
            }, 1000)
          })
        }, 1000)
      } else {
        showThanksModal()
      }
    }

    const limitTimesStyle: CSSProperties = {
      color: getSkinConfig('timeColor')
    }

    return {
      limitTimesText,
      limitTimesStyle,
      onStart,
      cards,
      setItemRef
    }
  }
})
</script>
