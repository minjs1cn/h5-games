<template>
  <App
    :limitTimes="limitTimes"
    @closeResultModal="closeResultModal"
    :show-result="showResult"
  >
    <Banner />
    <MyWheel :angle="angle" :show-hand="isShowHand" @click="onStart" />
    <div class="flex-center">
      <LimitTimes :limitTimes="limitTimes" />
    </div>
  </App>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useDoJoinService, getOptionIndexByPrizeType } from './core'
import App from './components/app/index.vue'

import MyWheel, { useRotate } from './components/my-wheel/index.vue'
import Banner from './components/banner/index.vue'
import LimitTimes from './components/limit-times/index.vue'

function delay(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

import './main.less'

export default defineComponent({
  name: 'Main',

  components: {
    App,
    MyWheel,
    Banner,
    LimitTimes
  },

  setup() {
    const {
      isPending,
      limitTimes,
      doJoin,
      canDoJoin,
      showResultModal,
      showThanksModal,
      showResult,
      closeResultModal
    } = useDoJoinService()

    const [angle, rotate] = useRotate(0)

    const isShowHand = computed(() => !isPending.value)

    onMounted(() => {
      rotate.idled()
    })

    const reset = () => {
      rotate.idled()
    }

    const onStart = async () => {
      // 前置判断
      if (!canDoJoin()) return

      rotate.start()
      const lottery = await doJoin()
      await delay(2000)
      if (lottery) {
        rotate.to({
          index: getOptionIndexByPrizeType(3),
          duration: 4000,
          complete: () => {
            showResultModal({
              reset
            })
          }
        })
      } else {
        rotate.to({
          index: getOptionIndexByPrizeType(2),
          complete: () => {
            showThanksModal({
              reset
            })
          }
        })
      }
    }

    return {
      showResult,
      closeResultModal,
      angle,
      isShowHand,
      limitTimes,
      onStart
    }
  }
})
</script>
