<template>
  <div class="rule-modal">
    <div class="rule-modal-body" :style="bodyStyle">
      <div class="rule-modal-content">
        <div class="rule-modal-wrapper" v-html="content"></div>
      </div>
      <div class="rule-modal-close">
        <Close @click="onClose" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Close from '../close/index.vue'

import './index.less'

export default defineComponent({
  name: 'ruleModal',

  components: {
    Close
  },

  props: {
    content: {
      type: String,
      default: '<p></p>'
    }
  },

  emits: ['close'],

  setup(props, { emit }) {
    const bodyStyle = {
      backgroundImage: 'url("//yun.tuisnake.com/yrzhao/ruleModal/rule-bg2.png")'
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
