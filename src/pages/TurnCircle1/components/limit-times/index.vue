<template>
  <div class="foundation">
    <div class="limit-times">{{ textcontent }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

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

    return {
      textcontent
    }
  }
})
</script>
