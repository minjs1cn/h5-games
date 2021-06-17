<template>
  <div class="container">
    <div class="game-bg">
      <div class="game-container" :style="circleStyle">
        <canvas id="game"></canvas>
      </div>
      <div class="light">
        <div class="light ligth-revert"></div>
      </div>
    </div>
    <div class="start-bg" @click="onStart">
      <div :class="['start', startBtnActiveClass]"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, onMounted } from 'vue'
import userConfig from '../../userConfig'
import * as flexible from '@minjs1cn/toolkits/lib/flexible'

import './index.less'
import { Game } from './cc'

export { default as useRotate } from './hooks'

export interface WheelOption {
  title?: string
  image?: string
}

export default defineComponent({
  props: {
    angle: Number,
    options: {
      type: Array as PropType<Array<WheelOption>>
    },
    showHand: Boolean
  },

  emits: ['click'],

  setup(props, ctx) {
    let width = document.body.offsetWidth
    if (document.documentElement.clientWidth > 1024) width = 640
    const size = width * flexible.designDpr

    const startBtnActiveClass = computed(() => {
      if (props.showHand) return 'active'
      return ''
    })

    const circleStyle = computed(() => ({
      transform: `rotate3d(0, 0, 1, ${props.angle}deg)`
    }))

    onMounted(() => {
      const game = new Game({
        canvas: document.getElementById('game') as HTMLCanvasElement,
        width: size,
        height: size
      })

      game.init(userConfig.options)
    })

    return {
      circleStyle,
      startBtnActiveClass,
      size,
      onStart: () => {
        ctx.emit('click')
      }
    }
  }
})
</script>
