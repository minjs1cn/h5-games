import { createTurnCard } from '../create'
import styles from '../styles'

export default createTurnCard({
  setup(props, ctx) {
    return () => (
      <div class={styles.group}>{(ctx.slots.default as Function)()}</div>
    )
  }
})
