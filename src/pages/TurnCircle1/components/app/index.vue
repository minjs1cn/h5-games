<template>
  <div class="page">
    <slot></slot>
    <div class="footer">
      <div class="btn rule-btn" @click="showRuleModal">活动规则</div>
      <div class="btn record-btn" @click="showRecordModal">我的奖品</div>
    </div>
    <div class="rule-modal" v-if="showRule">
      <div class="rule-container">
        <div class="rule-text">
          <p>活动规则：</p>
          <p>1.每个人每天只有1次抽奖机会</p>
          <p>2.本次活动均以优惠劵形式体现</p>
          <p>3.中奖后没有及时领奖，优惠劵将过期失效</p>
          <p>
            4.本活动由赞助商投放，用户对活动有任何问题需咨询，官方客服电话：0571-88138862
          </p>
        </div>
        <div class="rule-modal-title">活动规则</div>
      </div>
      <div class="rule-close" @click="closeRuleModal"></div>
    </div>
    <div class="rule-modal" v-if="showRecord">
      <div class="rule-container">
        <div class="rule-text rule-record">
          <img v-if="has" :src="lottery.image" :alt="lottery.title" />
          <span v-if="has">{{ lottery.title }}</span>
          <a v-if="has" :href="lottery.use">查看奖品</a>
        </div>
        <div class="rule-modal-title">我的奖品</div>
      </div>
      <div class="rule-close" @click="closeRecordModal"></div>
    </div>
    <div class="rule-modal result-modal" v-if="showLottery">
      <div class="rule-container">
        <div class="rule-text rule-lottery">
          <img :src="lottery.image" :alt="lottery.title" />
          <h1>恭喜您！获得一等奖</h1>
          <p class="lottery-text">{{ lottery.text }}</p>
          <a href="javascript:;" @click="onUse">立即领奖</a>
          <p>1小时有效</p>
        </div>
        <div class="rule-modal-title">中奖啦</div>
      </div>
      <div class="rule-close" @click="closeResultModal"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import userConfig from '../../userConfig'

import './index.less'

export default defineComponent({
  name: 'App',

  props: {
    limitTimes: Number,
    showResult: Boolean
  },

  emits: ['closeResultModal'],

  setup(props, { emit }) {
    const showRule = ref(false)
    function showRuleModal() {
      showRule.value = true
    }
    function closeRuleModal() {
      showRule.value = false
    }

    const showRecord = ref(false)

    function showRecordModal() {
      showRecord.value = true
    }
    function closeRecordModal() {
      showRecord.value = false
    }

    const has = computed(() => props.limitTimes === 0)

    const showLottery = computed(() => props.showResult)

    const closeResultModal = () => {
      emit('closeResultModal')
    }

    const lottery = userConfig.options[2]

    const onUse = () => {
      window.iqiyiTpct.track(19901, function() {
        location.href = lottery.use as string
      })
    }

    return {
      onUse,
      showLottery,
      has,
      lottery,
      showRecord,
      showRule,
      showRuleModal,
      closeRuleModal,
      showRecordModal,
      closeRecordModal,
      closeResultModal
    }
  }
})
</script>
