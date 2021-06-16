<template>
  <div class="banner" :style="style"></div>
</template>

<script lang="ts">
import { getSkinConfig } from 'src/core'
import { defineComponent } from 'vue'
import './index.less'

export default defineComponent({
  setup() {
    return {
      style: {
        backgroundImage: `url('${getSkinConfig('theme')}')`
      }
    }
  }
})
</script>
