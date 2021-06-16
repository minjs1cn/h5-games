import { computed } from 'vue'
import { createWheel } from '../create'
import styles from '../styles'

export default createWheel({
  props: {
    angle: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 300
    }
  },

  setup(props, ctx) {
    const circleStyle = computed(() => ({
      transform: `rotate3d(0, 0, 1, ${props.angle}deg)`,
      width: props.size + 'px',
      height: props.size + 'px'
    }))

    return () => (
      <div style={circleStyle.value} class={styles.circle}>
        {(ctx.slots.default as Function)()}
      </div>
    )
  }
})
