<template>
  <div class="waveTotal">
    <div
      v-for="(item, key) in waveList"
      :key="key"
      :class="[`wave${item}`, 'wave']"
      :style="{ backgroundImage: waveImg }"
    ></div>
  </div>
</template>

<script>
import { getSkinConfig } from 'src/core'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'wave',
  data() {
    return {
      waveList: [1, 2, 3],
      waveImg: `url(${getSkinConfig('wave')})`
    }
  }
})
</script>

<style lang="less">
.waveTotal {
  position: absolute;
  top: 410px;

  .wave {
    position: absolute;
    background-repeat: no-repeat;
    background-size: cover;
    .wh(751, 300);

    animation: waveMove steps(14) 3s 0s infinite;

    &.wave2 {
      top: 299px;
      transform: rotateX(180deg);
    }

    &.wave3 {
      top: 596px;
    }
  }
}

@keyframes waveMove {
  0% {
    background-position-y: 0;
  }

  100% {
    background-position-y: 100%;
  }
}
</style>
