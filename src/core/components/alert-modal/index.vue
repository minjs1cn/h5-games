<template>
  <div id="alertModal" class="alert-modal">{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import './index.less'

export default defineComponent({
  name: 'alertModal',

  props: {
    text: String,
    duration: {
      type: Number,
      default: 1500
    }
  },

  emits: ['close'],

  setup(props, ctx) {
    onMounted(() => {
      setTimeout(() => {
        ctx.emit('close')
      }, props.duration)
    })

    return {}
  }
})
</script>
