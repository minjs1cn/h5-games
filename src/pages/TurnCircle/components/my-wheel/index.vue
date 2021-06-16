<template>
  <div class="container" :style="containerStyle">
    <Wheel :angle="angle" class="wheel" :size="size" :style="wheelBgStyle">
      <WheelOption
        v-for="(item, index) in options"
        :title="item.title"
        :index="index"
        :key="index"
      >
        <div class="title" :style="titleStyle">{{ item.title }}</div>
        <img class="image" :src="item.image" />
      </WheelOption>
    </Wheel>
    <div class="point" :style="pointStyle"></div>
    <div class="light" :style="lightStyle">
      <div class="light ligth-revert" :style="lightStyle"></div>
    </div>
    <div class="start-bg" @click="onStart" :style="startBgStyle">
      <div
        :class="['start', startBtnActiveClass]"
        :style="startInnerStyle"
      ></div>
      <div class="hand shake" :style="handStyle" v-if="showHand"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType, computed } from 'vue'
import Wheel from 'src/packages/wheel'
import 'src/packages/wheel/index.less'
import { getSkinConfig } from 'src/core'

import './index.less'

export { default as useRotate } from 'src/packages/wheel/hooks'

export interface WheelOption {
  title?: string
  image?: string
}

export default defineComponent({
  components: {
    Wheel,
    WheelOption: Wheel.Option
  },

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
    const size = (270 / 320) * width

    const wheelBgStyle: CSSProperties = {
      backgroundImage: `url('${getSkinConfig('turntable')}')`
    }

    const startBgStyle: CSSProperties = {
      backgroundImage: `url('${getSkinConfig('start')}')`
    }

    const startInnerStyle: CSSProperties = {
      backgroundImage: `url('${getSkinConfig('startInner')}')`
    }

    const lightStyle: CSSProperties = {
      backgroundImage: `url('//yun.tuisnake.com/tact/turnCircle/3d407e4e-4275-44fa-afc1-8319a9484942.png')`
    }

    const handStyle: CSSProperties = {
      backgroundImage: `url('//yun.tuisnake.com/tact/turnCircle/bcb4fc7e-18c1-46d7-bdae-2e91147196c1.png')`
    }

    const containerStyle: CSSProperties = {
      backgroundImage: `url('${getSkinConfig('circleBg')}')`
    }

    const pointStyle: CSSProperties = {
      backgroundImage: `url('${getSkinConfig('point')}')`
    }

    const titleStyle: CSSProperties = {
      color: getSkinConfig('prizeText')
    }

    const startBtnActiveClass = computed(() => {
      if (props.showHand) return 'active'
      return ''
    })

    return {
      wheelBgStyle,
      startBgStyle,
      startInnerStyle,
      lightStyle,
      handStyle,
      containerStyle,
      pointStyle,
      titleStyle,
      startBtnActiveClass,
      size,
      onStart: () => {
        ctx.emit('click')
      }
    }
  }
})
</script>
