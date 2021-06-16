<template>
  <div class="waterReflection">
    <div class="waterCloud" :style="{ backgroundImage: waterCloud }"></div>
    <div
      v-for="(item, key) in fishList"
      :key="key"
      :class="[`fish${item}`, 'fish']"
      :style="{ backgroundImage: fishImg }"
    ></div>
  </div>
</template>

<script>
import { getSkinConfig } from 'src/core'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'waterReflection',
  data() {
    return {
      fishList: [0, 1, 2, 3, 4],
      fishImg: `url(${getSkinConfig('fish')})`,
      waterCloud: `url(${getSkinConfig('waterCloud')})`
    }
  }
})
</script>

<style lang="less">
.fish {
  position: absolute;
  .wh(44, 16);
  .bg();

  &.fish0 {
    top: 400px;
    left: 50px;
    transform: rotateY(180deg);
    animation: fishMove 10s linear infinite;

    @keyframes fishMove {
      from {
        transform: translate(0, 0) rotateY(180deg);
      }
      50% {
        transform: translate(0.5rem, -0.6rem) rotateY(180deg);
      }
      to {
        transform: translate(0, 0) rotateY(180deg);
      }
    }
  }

  &.fish1 {
    top: 300px;
    left: 670px;
    transform: scale(0.5);
  }

  &.fish2 {
    top: 330px;
    left: 500px;
    transform: scale(0.5);
  }

  &.fish3 {
    top: 440px;
    left: 580px;
    transform: scale(0.5);
  }

  &.fish4 {
    top: 280px;
    left: 560px;
  }
}

.waterCloud {
  position: absolute;
  top: 230px;
  right: -4.3rem;
  .wh(236, 135);
  .bg();

  animation: cat 30s linear infinite;

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
}
</style>
