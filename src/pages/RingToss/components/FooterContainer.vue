<template>
  <div class="footerContainer" :class="{ isFullScreen: isFullScreen }">
    <div class="overflow">
      <div
        :class="[
          'rope',
          {
            preCatch: footAnimation.preCatch,
            ropeCatch: footAnimation.catching
          }
        ]"
        v-show="footAnimation.ropeShow"
        :style="{ backgroundImage: footerImgList.rope }"
      ></div>
    </div>
    <div class="buttonGroup">
      <div
        class="leafBtn"
        :style="{ backgroundImage: footerImgList.leafBtn }"
      ></div>
      <div
        class="button j_activity_start_click"
        :style="{
          backgroundImage: footerImgList.button,
          opacity: footAnimation.isBtnShow ? 1 : 0
        }"
        @click="buttonClick"
      ></div>
      <div
        class="btn-down"
        :style="{
          backgroundImage: footerImgList.buttonDown,
          opacity: footAnimation.isBtnShow ? 0 : 1
        }"
      ></div>
      <div
        :class="['times', { active: !footAnimation.isBtnShow }]"
        :style="getConfigStyle({ color: 'timeColor' })"
      >
        {{ limitTimesText }}
      </div>
    </div>
    <div class="grass" :style="{ backgroundImage: footerImgList.grass }"></div>
    <div
      class="hand"
      v-show="footAnimation.isHandShow"
      :style="{ backgroundImage: footerImgList.hand }"
    ></div>
    <div class="prize-container">
      <prizeContainer
        v-if="isPrizeListShow"
        :container="containerObject"
        :liContainer="liContainer"
        :gutter="gutter"
        :title="title"
      />
    </div>
  </div>
</template>

<script>
import prizeContainer from './PrizeList'
import { getSkinConfig, getConfigStyle } from 'src/core'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'footerContainer',
  components: {
    prizeContainer
  },
  props: {
    limitTimesText: {
      type: String,
      default: ''
    },
    footAnimation: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    this._fullScreenLayout()
    window.onload = () => {
      this.isPrizeListShow = true
    }
  },
  data() {
    return {
      isPrizeListShow: false,
      footerImgList: {
        rope: `url(${getSkinConfig('rope')})`,
        leafBtn: `url(${getSkinConfig('leafBtn')})`,
        button: `url(${getSkinConfig('button')})`,
        buttonDown: `url(${getSkinConfig('buttonDown')})`,
        grass: `url(${getSkinConfig('btmImage')})`,
        hand: `url(${getSkinConfig('hand')})`
      },
      containerObject: {
        paddingTop: 16,
        paddingLeft: 100,
        paddingRight: 20,
        width: 716,
        height: 160,
        backgroundImage: `${getSkinConfig('listImage')}`
      },
      liContainer: {
        paddingLeft: 0,
        paddingRight: 0,
        width: 128,
        height: 128,
        backgroundImage: `${getSkinConfig('prizeBoxImage')}`
      },
      gutter: 22,
      title: {
        position: false
      },
      isFullScreen: false // 是否是全面屏
    }
  },

  emits: ['start'],

  methods: {
    buttonClick() {
      this.$emit('start')
    },
    // 全面屏判断
    _fullScreenLayout() {
      const winH = window.innerHeight
      const winW = window.innerWidth
      // 正常模式下判断比例标准为1.8，有客户端元素占据为1.65
      const limit =
        window.screen.height === window.screen.availHeight ? 1.8 : 1.65
      const screenRatio = winH / winW
      if (screenRatio > limit) {
        this.isFullScreen = true
      }
    },
    getConfigStyle(obj) {
      return getConfigStyle(obj)
    }
  }
})
</script>

<style lang="less">
.footerContainer {
  position: absolute;
  bottom: 1390px;

  &.isFullScreen {
    bottom: 1460px;
  }

  .overflow {
    position: absolute;
    top: 250px;
    .wh(751, 770);

    overflow: hidden;
    pointer-events: none;
  }

  .rope {
    position: absolute;
    pointer-events: none;
    background-repeat: no-repeat;
    background-size: cover;
    animation: ropeMove steps(7) 0.4s 0s infinite;
    .wh(751, 1606);

    &.preCatch {
      animation: ropeMove steps(7) 0.4s 0s infinite,
        ropeActive 0.4s linear forwards;
    }

    &.ropeCatch {
      animation: ropeMove steps(7) 0.4s 0s infinite,
        ropeCatch 0.4s linear forwards;
    }

    @keyframes ropeActive {
      0% {
        transform: scale(0.5);
      }

      100% {
        transform: scale(1) translateY(1rem);
      }
    }

    @keyframes ropeCatch {
      0% {
        transform: scale(1) translateY(1rem);
      }

      100% {
        transform: scale(0.5) translateY(-3rem);
      }
    }
  }

  .buttonGroup {
    position: absolute;
    top: 850px;
    .wh(361, 282);

    left: 220px;
    animation: buttonMove 5s linear infinite;

    .leafBtn {
      position: absolute;
      bottom: 0;
      .bg();
      .wh(361, 282);

      pointer-events: none;
    }

    .button {
      position: absolute;
      top: -70px;
      left: 40px;
      opacity: 1;
      .bg();
      .wh(276, 264);
    }

    .btn-down {
      position: absolute;
      top: -40px;
      left: 46px;
      pointer-events: none;
      opacity: 0;
      .bg();
      .wh(267, 226);
    }

    .times {
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      height: 38px;
      font-size: 22px;
      line-height: 38px;
      color: #fab07a;
      text-align: center;
      pointer-events: none;

      &.active {
        top: 90px;
      }
    }
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

.hand {
  .wh(190, 204);
  .bg();

  position: absolute;
  top: 890px;
  left: 464px;
  transform-origin: right bottom;
  animation: handMove 0.8s linear infinite;
}

@keyframes ropeMove {
  0% {
    background-position-x: 0;
    transform: scale(0.5);
  }

  100% {
    background-position-x: 100%;
    transform: scale(0.5);
  }
}

@keyframes handMove {
  25% {
    transform: rotate(-15deg);
  }

  75% {
    transform: rotate(30deg);
  }
}

@keyframes buttonMove {
  25% {
    transform: translate(-0.1rem, -0.05rem);
  }

  50% {
    transform: translate(-0.05rem, 0);
  }

  75% {
    transform: translate(-0.1rem, 0.05rem);
  }
}

.prize-container {
  position: absolute;
  top: 1050px;
  left: 16px;
  z-index: 11;
  padding-top: 0.2rem;
  overflow: hidden;
  touch-action: none;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
