<template>
  <div class="foundation" :style="foundationStyle">
    <div class="limit-times" :style="timesStyle">{{ textcontent }}</div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import { getSkinConfig } from 'src/core'

import './index.less'

export default defineComponent({
  props: {
    limitTimes: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    const textcontent = computed(() => {
      if (props.limitTimes >= 1) return `今日剩余：${props.limitTimes}次`

      return '今日机会已用完'
    })

    const foundationStyle: CSSProperties = {
      backgroundImage: `url('${getSkinConfig('foundation')}')`
    }

    const timesStyle: CSSProperties = {
      color: getSkinConfig('statusText')
    }

    return {
      textcontent,
      foundationStyle,
      timesStyle
    }
  }
})
</script>
