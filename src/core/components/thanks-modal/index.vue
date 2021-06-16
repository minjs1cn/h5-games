<template>
  <div class="thanks-modal">
    <div class="thanks-modal-body" :style="bodyStyle">
      <div class="thanks-modal-cancel" @click="onClose">{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { getSkinConfig } from 'src/core'
import { defineComponent } from 'vue'

import './index.less'

export default defineComponent({
  name: 'thanksModal',

  props: {
    content: {
      type: String,
      default: '<p></p>'
    },
    text: {
      type: String,
      default: getSkinConfig('thanksCloseText') || '关闭'
    }
  },

  emits: ['close'],

  setup(props, { emit }) {
    const bodyStyle = {
      backgroundImage: 'url("//yun.tuisnake.com/h5-mami/thanksPrize/body3.png")'
    }

    const onClose = () => {
      emit('close')
    }

    return {
      bodyStyle,
      onClose
    }
  }
})
</script>
