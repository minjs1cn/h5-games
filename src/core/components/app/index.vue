<template>
  <div class="page" :style="pageStyle">
    <slot></slot>
    <Disclaimer />
    <div class="rule-btn" :style="ruleStyle" @click="showRuleModal"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, CSSProperties } from 'vue'
import { getSkinConfig } from 'src/core'
import Disclaimer from '../disclaimer/index.vue'
import showRuleModal from '../../libs/showRuleModal'
import '../kefu'

import './index.less'

export default defineComponent({
  name: 'App',

  components: {
    Disclaimer
  },

  setup() {
    const pageStyle: CSSProperties = {
      backgroundColor: getSkinConfig('bgColor'),
      backgroundImage: `url('${getSkinConfig('bgImage')}')`
    }

    const ruleStyle: CSSProperties = {
      backgroundImage: `url('${getSkinConfig('ruleBgImage')}')`
    }

    return {
      pageStyle,
      ruleStyle,
      showRuleModal
    }
  }
})
</script>
