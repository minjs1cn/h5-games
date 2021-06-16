<template>
  <App>
    <wave />
    <div :class="$style.main">
      <div :class="$style.contain">
        <water-reflection />
        <init-cat ref="initCatComponent" />
      </div>
      <footer-container
        :limitTimesText="limitTimesText"
        :footAnimation="footAnimation"
        @start="onStart"
      />
    </div>
  </App>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getSkinConfig, useDoJoinService } from 'src/core'
import App from 'src/core/components/app/index.vue'

import wave from './components/Wave.vue'
import waterReflection from './components/WaterReflection.vue'
import initCat from './components/InitCat.vue'
import footerContainer from './components/FooterContainer.vue'

import { delay } from './utils'

import './main.less'

export default defineComponent({
  name: 'Main',

  components: {
    App,
    wave,
    waterReflection,
    initCat,
    footerContainer
  },

  setup() {
    const state = reactive({
      isStart: false, // 防止重复点击
      skinImg: {
        bg: `url(${getSkinConfig('backgroundImg')})`,
        rule: `url(${getSkinConfig('ruleImage')})`,
        rope: `url(${getSkinConfig('rope')})`
      },
      footAnimation: {
        isBtnShow: true, // 是否要显示初始按钮
        preCatch: false, // 绳子预备抓起
        catching: false, // 绳子开始抓起
        ropeShow: true, // 绳子开始抓起
        isHandShow: false // 手势是否显示
      },
      initCatComponent: null
    })

    const {
      limitTimesText,
      hasLimitTimes,
      doJoin,
      canDoJoin,
      showResultModal,
      showThanksModal
    } = useDoJoinService()

    const reset = () => {
      state.isStart = false
      state.footAnimation = {
        isBtnShow: true, // 是否要显示初始按钮
        preCatch: false, // 绳子预备抓起
        catching: false, // 绳子开始抓起
        ropeShow: true, // 绳子开始抓起
        isHandShow: false // 手势是否显示
      }
      if (hasLimitTimes) {
        state.footAnimation.isHandShow = true
      }
      state.initCatComponent.reset()
    }

    onMounted(() => {
      if (hasLimitTimes) {
        state.footAnimation.isHandShow = true
      }
    })

    /** 抓住猫 */
    const catchCat = () => {
      state.footAnimation.preCatch = false
      state.footAnimation.catching = true
      delay(350).then(() => {
        state.footAnimation.ropeShow = false
        state.initCatComponent.catchCat()
      })
    }

    /** 没抓住 */
    const notCatchCat = () => {
      catchCat()
      delay(2300).then(() => {
        state.initCatComponent.notCatchCat()
      })
    }

    const onStart = async () => {
      if (!canDoJoin()) return
      const lottery = await doJoin()
      // 计算哪只猫
      state.initCatComponent.computedCat()
      if (lottery) {
        state.footAnimation.isBtnShow = false
        state.footAnimation.preCatch = true
        state.footAnimation.isHandShow = false
        catchCat()
        delay(2000).then(() => {
          state.initCatComponent.hideCat()
          showResultModal({
            ...lottery,
            callback: {
              onUse: reset,
              onClose: reset
            }
          })
        })
      } else {
        state.footAnimation.isBtnShow = false
        state.footAnimation.preCatch = true
        state.footAnimation.isHandShow = false
        notCatchCat()
        delay(2300).then(() => {
          showThanksModal({
            onClose: reset
          })
        })
      }
    }

    const bottomStyle = {
      backgroundImage: `url(${getSkinConfig('btmImage')})`
    }

    return {
      limitTimesText,
      bottomStyle,
      onStart,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="less" module>
.main {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  .contain {
    position: absolute;
    top: 460px;
  }
}

.grass {
  position: absolute;
  top: 830px;
  left: 0;
  width: 751px;
  height: 634px;
  pointer-events: none;
  .bg();
}
</style>
