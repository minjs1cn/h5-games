<template>
  <TurnCard class="group">
    <Card
      v-for="(item, index) in cards"
      :ref="setItemRef"
      :active="item.active"
      :class="['card', item.class]"
      :key="index"
      :style="item.style"
      @click="onStart(index)"
    >
      <template v-slot:back>
        <div class="back" :style="cardFrontStyle">
          <div class="back-text" :style="cardTextStyle">
            {{ cardTexts[index] }}
          </div>
        </div>
      </template>
      <template v-slot:front>
        <div class="front" :style="cardBackStyle"></div>
      </template>
    </Card>
  </TurnCard>
</template>

<script lang="ts">
import { defineComponent, CSSProperties, PropType } from 'vue'
import TurnCard from 'src/packages/turnCard'
import { Card } from 'src/packages/turnCard/hooks'
import 'src/packages/turnCard/index.less'

import './index.less'
import { getSkinConfig } from 'src/core'

export default defineComponent({
  components: {
    TurnCard,
    Card: TurnCard.Card
  },

  props: {
    cards: {
      type: Array as PropType<Array<Card>>,
      default: () => []
    },
    setItemRef: {
      type: Function,
      default: () => ({})
    }
  },

  emits: ['click'],

  setup(props, ctx) {
    const onStart = async (i: number) => {
      ctx.emit('click', i)
    }

    const cardBackStyle: CSSProperties = {
      backgroundImage: `url(${getSkinConfig('cardBackImage')})`
    }
    const cardFrontStyle: CSSProperties = {
      backgroundImage: `url(${getSkinConfig('cardFrontImage')})`
    }

    const cardTextStyle: CSSProperties = {
      color: getSkinConfig('turnCardTextColor')
    }

    let cardTexts = getSkinConfig('turnCardText')
      .split('#')
      .filter(item => item)
    cardTexts = (cardTexts[cardTexts.length - 1] + '#')
      .repeat(props.cards?.length)
      .split('#')
      .filter(item => item)

    return {
      onStart,
      cardTexts,
      cardTextStyle,
      cardBackStyle,
      cardFrontStyle
    }
  }
})
</script>
