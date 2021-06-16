<template>
  <div
    v-if="isIOS"
    :class="['disclaimer', isIOS10]"
    :style="configStyle"
    v-html="text"
  ></div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import { getSkinConfig } from '../../utils'
import { isIOS, isAppleX } from '@minjs1cn/toolkits/lib/env'

import './index.less'

export default defineComponent({
  props: {
    bgColor: {
      type: String,
      default: getSkinConfig('appleBgColor')
    },
    color: {
      type: String,
      default: getSkinConfig('appleColor')
    },
    text: {
      type: String,
      default: getSkinConfig('appleText')
    }
  },

  setup(props) {
    const configStyle = computed<CSSProperties>(() => ({
      backgroundColor: props.bgColor,
      color: props.color
    }))

    return {
      isIOS,
      isIOS10: isAppleX ? 'isAppleX' : '',
      configStyle
    }
  }
})
</script>
