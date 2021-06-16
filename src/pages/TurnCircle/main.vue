<template>
  <App>
    <Banner />
    <MyWheel
      :angle="angle"
      :options="options"
      :show-hand="isShowHand"
      @click="onStart"
    />
    <div class="flex-center">
      <LimitTimes :limitTimes="limitTimes" />
    </div>
  </App>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useDoJoinService, getOptionIndexByPrizeType } from 'src/core'
import App from 'src/core/components/app/index.vue'

import MyWheel, { useRotate } from './components/my-wheel/index.vue'
import Banner from './components/banner/index.vue'
import LimitTimes from './components/limit-times/index.vue'

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
      options,
      doJoin,
      canDoJoin,
      showResultModal,
      showThanksModal
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
      if (lottery) {
        rotate.to({
          index: getOptionIndexByPrizeType(),
          complete: () => {
            showResultModal({
              ...lottery,
              callback: {
                onUse: reset,
                onClose: reset
              }
            })
          }
        })
      } else {
        rotate.to({
          index: getOptionIndexByPrizeType('thanks'),
          complete: () => {
            showThanksModal({
              onClose: reset
            })
          }
        })
      }
    }

    return {
      options,
      angle,
      isShowHand,
      limitTimes,
      onStart
    }
  }
})
</script>
