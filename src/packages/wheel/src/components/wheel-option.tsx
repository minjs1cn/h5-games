import { computed } from 'vue'
import { createWheelOption } from '../create'
import styles from '../styles'

export default createWheelOption({
  props: {
    title: String,
    image: String,
    index: {
      type: Number,
      required: true
    }
  },

  emits: ['click'],

  setup(props, ctx) {
    const OptionStyle = computed(() => ({
      transform: `rotate(${15 + props.index * 60}deg) skew(15deg, 15deg)`
    }))

    const onClick = (e: MouseEvent) => {
      ctx.emit('click', e, props.index)
    }

    const image = props.image ? (
      <img class={styles.optionImage} src={props.image} alt={props.title} />
    ) : null

    return () => {
      const optionChild = ctx.slots.default ? (
        (ctx.slots.default as Function)(props.index)
      ) : (
        <>
          <div class={styles.optionTitle}>{props.title}</div>
          {image}
        </>
      )
      return (
        <div onClick={onClick} style={OptionStyle.value} class={styles.option}>
          <div class={styles.optionRevert}>{optionChild}</div>
        </div>
      )
    }
  }
})
