<template>
  <App>
    <div style="font-size: 48px;text-align: center;">hello</div>
    <button
      @click="onStart"
      style="display:block;margin: 20px auto;font-size: 48px;"
    >
      开始
    </button>
  </App>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDoJoinService } from 'src/core'
import App from 'src/core/components/app/index.vue'

import './main.less'

export default defineComponent({
  name: 'Main',

  components: {
    App
  },

  setup() {
    const {
      limitTimesText,
      doJoin,
      canDoJoin,
      showResultModal,
      showThanksModal
    } = useDoJoinService()

    const reset = () => {}

    const onStart = async () => {
      if (!canDoJoin()) return
      const lottery = await doJoin()
      if (lottery) {
        showResultModal({
          ...lottery,
          callback: {
            onUse: reset,
            onClose: reset
          }
        })
      } else {
        showThanksModal()
      }
    }

    return {
      limitTimesText,
      onStart
    }
  }
})
</script>
