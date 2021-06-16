import { computed, CSSProperties } from 'vue'
import { createCard } from '../create'
import styles from '../styles'

export default createCard({
  props: {
    duration: {
      type: Number,
      default: 1000
    },
    ease: {
      type: String,
      default: 'linear'
    },
    active: Boolean
  },

  emits: ['click'],

  setup(props, ctx) {
    const onClick = (e: MouseEvent) => {
      ctx.emit('click', e)
    }

    const cardClassName = computed(() => {
      if (props.active) return `${styles.card} ${styles.cardActive}`
      return styles.card
    })

    const style: CSSProperties = {
      transitionDuration: `${props.duration}ms`,
      transitionTimingFunction: props.ease
    }

    return () => {
      const backSlot = (ctx.slots.back as Function)()
      const frontSlot = (ctx.slots.front as Function)()

      return (
        <div onClick={onClick} class={cardClassName.value}>
          <div class={styles.cardBack} style={style}>
            {backSlot}
          </div>
          <div class={styles.cardFront} style={style}>
            {frontSlot}
          </div>
        </div>
      )
    }
  }
})
