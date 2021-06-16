<template>
  <div>
    <div
      v-for="(item, key) in initCatList"
      :key="key"
      :class="[
        `cat${key}`,
        'initCat',
        { activeCatInit: item.isInitMove },
        { stopCatMove: item.isStop }
      ]"
      :style="initCatImgList[key]"
      v-show="item.isShow"
      :ref="item.id"
    ></div>
    <div class="overflowHidden">
      <div
        v-for="(item, key) in catchingList"
        :key="`${key}0`"
        :class="[
          'initCatchCat',
          `catchCat${key}`,
          { active: item.catchActive }
        ]"
        :style="catchCatImgList[key]"
      ></div>
      <div
        v-for="(item, key) in catchingList"
        :key="`${key}1`"
        :class="[
          'initEscapeCat',
          `escapeCat${key}`,
          { active: item.escapeActive }
        ]"
        :style="escapeCatImgList[key]"
      ></div>
    </div>
    <div
      class="dragWave"
      :style="getConfigStyle({ backgroundImage: 'dragWave' })"
      v-show="waveShow"
    ></div>
    <div
      class="ropeWave ropeWave1"
      :style="getConfigStyle({ backgroundImage: 'ropeWave' })"
      v-show="waveShow"
    ></div>
    <div
      class="ropeWave ropeWave2"
      :style="getConfigStyle({ backgroundImage: 'ropeWave' })"
      v-show="waveShow"
    ></div>
  </div>
</template>

<script>
import { getSkinConfig, getConfigStyle } from 'src/core'
import { defineComponent } from 'vue'
import { delay } from '../utils'

export default defineComponent({
  name: 'initCat',
  data() {
    return {
      hasCatchIndex: 0, // 哪只猫被抓
      waveShow: false, // 绳子和叶子波浪
      initCatList: [
        // 初始猫所需动效
        {
          isShow: true, // 是否要显示
          isInitMove: true, // 是否是初始动效
          isStop: false, // 是否要停止动画
          id: 'cat0'
        },
        {
          isShow: true,
          isInitMove: true,
          isStop: false,
          id: 'cat1'
        },
        {
          isShow: true,
          isInitMove: true,
          isStop: false,
          id: 'cat2'
        }
      ],
      initCatImgList: [
        {
          backgroundImage: `url(${getSkinConfig('cat0')})`
        },
        {
          backgroundImage: `url(${getSkinConfig('cat1')})`
        },
        {
          backgroundImage: `url(${getSkinConfig('cat2')})`
        }
      ],
      catchCatImgList: [
        {
          backgroundImage: `url(${getSkinConfig('catchCat0')})`
        },
        {
          backgroundImage: `url(${getSkinConfig('catchCat1')})`
        },
        {
          backgroundImage: `url(${getSkinConfig('catchCat2')})`
        }
      ],
      escapeCatImgList: [
        {
          backgroundImage: `url(${getSkinConfig('escapeCat0')})`
        },
        {
          backgroundImage: `url(${getSkinConfig('escapeCat1')})`
        },
        {
          backgroundImage: `url(${getSkinConfig('escapeCat2')})`
        }
      ],
      catchingList: [
        // 被抓的猫的动效
        {
          catchActive: false,
          escapeActive: false
        },
        {
          catchActive: false,
          escapeActive: false
        },
        {
          catchActive: false,
          escapeActive: false
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('pageshow', () => {
      // 解决ios样式问题
      this.initCatList.forEach(item => {
        item.isInitMove = false
      })
      delay(0).then(() => {
        this.initCatList.forEach(item => {
          item.isInitMove = true
        })
      })
    })
  },
  methods: {
    getConfigStyle,
    /**
     * 计算猫的位置
     */
    computedCat() {
      const a =
        this.$refs.cat0.getBoundingClientRect().left / document.body.clientWidth
      const a1 =
        this.$refs.cat1.getBoundingClientRect().left / document.body.clientWidth
      if (a >= 0.33 && a <= 0.7) {
        this.hasCatchIndex = 0
      } else if (a1 >= 0.33 && a1 <= 0.7) {
        this.hasCatchIndex = 1
      } else {
        this.hasCatchIndex = 2
      }
    },
    /**
     * 抓猫
     */
    catchCat() {
      this.initCatList[this.hasCatchIndex].isShow = false
      this.initCatList.forEach((item, key) => {
        if (key !== this.hasCatchIndex) {
          this.initCatList[key].isStop = true
        }
      })
      this.catchingList[this.hasCatchIndex].catchActive = true
      this.waveShow = true
    },
    notCatchCat() {
      this.catchingList[this.hasCatchIndex].catchActive = false
      this.catchingList[this.hasCatchIndex].escapeActive = true
      this.waveShow = false
    },
    /**
     * 重置猫
     */
    reset() {
      this.initCatList = [
        {
          isShow: true, // 是否要显示
          isInitMove: false, // 是否是初始动效
          isStop: false, // 是否要停止动画
          id: 'cat0'
        },
        {
          isShow: true,
          isInitMove: false,
          isStop: false,
          id: 'cat1'
        },
        {
          isShow: true,
          isInitMove: false,
          isStop: false,
          id: 'cat2'
        }
      ]
      delay(100).then(() => {
        this.initCatList.forEach(item => {
          item.isInitMove = true
        })
      })
      this.catchingList = [
        {
          catchActive: false,
          escapeActive: false
        },
        {
          catchActive: false,
          escapeActive: false
        },
        {
          catchActive: false,
          escapeActive: false
        }
      ]
      this.waveShow = false
    },
    hideCat() {
      this.initCatList.forEach(item => {
        item.isShow = false
      })
    }
  }
})
</script>

<style lang="less">
.initCat {
  position: absolute;
  top: -100px;
  right: -4.4rem;
  touch-action: none;
  background-repeat: no-repeat;
  background-size: cover;
  transform-origin: bottom center;
  .wh(275, 327);
}

.activeCat1 {
  &-fs {
    top: 0;
  }
}

.activeCatInit {
  animation: catInit steps(1) 1s 0s infinite, cat 2.8s linear infinite;
}

.stopCatMove {
  animation-play-state: paused;
}

.cat0 {
  animation-delay: -1.8s;
}

.cat1 {
  animation-delay: -0.9s;
}

.cat2 {
  animation-delay: 0s;
}

@keyframes catInit {
  0% {
    background-position-x: 0;
  }

  50% {
    background-position-x: 100%;
  }
}

@keyframes cat {
  0% {
    transform: translate(0, 0);
  }

  10% {
    transform: translate(-0.4rem, 0);
  }

  20% {
    transform: translate(-0.8rem, 0);
  }

  30% {
    transform: translate(-1.2rem, 0);
  }

  40% {
    transform: translate(-1.6rem, -0.1rem);
  }

  50% {
    transform: translate(-2rem, 0) scale(1, 1);
  }

  60% {
    transform: translate(-2.4rem, 0) scale(1, 1.1);
  }

  70% {
    transform: translate(-2.8rem, 0);
  }

  80% {
    transform: translate(-3.2rem, -0.1rem);
  }

  90% {
    transform: translate(-3.6rem, 0);
  }

  100% {
    transform: translate(-4.2rem, -0.1rem) scale(1, 1);
  }
}

.overflowHidden {
  position: absolute;
  top: -130px;
  .wh(751, 800);

  overflow: hidden;
  pointer-events: none;

  .initCatchCat {
    position: absolute;
    top: 30px;
    right: 0;
    left: 30px;
    margin: 0 auto;
    pointer-events: none;
    touch-action: none;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0;
    .wh(275, 736);

    &-fs {
      top: 130px;
    }

    &.active {
      opacity: 1;
      animation: stepMove steps(1) 0.2s forwards, catchCat 2.3s linear forwards;

      @keyframes stepMove {
        0% {
          background-position-x: 0;
        }

        100% {
          background-position-x: 100%;
        }
      }
    }
  }

  .initEscapeCat {
    position: absolute;
    top: 140px;
    right: 0;
    left: 30px;
    margin: 0 auto;
    pointer-events: none;
    touch-action: none;
    opacity: 0;
    .wh(275, 327);
    .bg();

    &-fs {
      top: 240px;
    }

    &.active {
      opacity: 1;
      animation: escapeCatMove 1s linear forwards;

      @keyframes escapeCatMove {
        0% {
          transform: translate(0, 0);
        }

        100% {
          transform: translate(0, -0.6rem);
        }
      }
    }
  }
}

.dragWave {
  position: absolute;
  top: 140px;
  right: -2.5rem;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.75;
  animation: stepMove steps(20) 1s infinite, catchCat 2.3s linear forwards;
  .wh(340, 100);

  &.dragWave-fs {
    top: 240px;
  }
}

.ropeWave {
  position: absolute;
  top: 10px;
  right: -2.5rem;
  .wh(180, 100);

  background-repeat: no-repeat;
  background-size: cover;
  animation: stepMove steps(8) 0.4s 0.2s forwards;

  &.ropeWave2 {
    right: -1.5rem;
    transform: rotateY(180deg);
  }

  &-fs {
    top: 110px;
  }
}

@keyframes catchCat {
  from {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-0.2rem, 0.3rem);
  }
  40% {
    transform: translate(-0.15rem, 0.3rem);
  }
  66% {
    transform: translate(0.2rem, 0.4rem);
  }
  73% {
    transform: translate(0.15rem, 0.4rem);
  }
  to {
    transform: translate(0, 0.7rem);
  }
}
</style>
