import ThanksModal from 'src/core/components/thanks-modal/index.vue'
import { createVNode, render } from 'vue'

export interface ThanksModalHooks {
  onClose?: Function
}

export default function showThanksModal(
  hooks: ThanksModalHooks | undefined = {}
) {
  const container = document.createElement('div')

  const vm = createVNode(ThanksModal, {
    onClose: () => {
      document.body.removeChild(container)
      hooks.onClose?.()
    }
  })
  render(vm, container)
  document.body.appendChild(container)
}
