import { getSkinConfig } from 'src/core'
import AlertModal from 'src/core/components/alert-modal/index.vue'
import { createVNode, render } from 'vue'

export interface AlertModalHooks {
  onClose?: Function
}
let isRemoved = true

export default function showNoTimesModal(hooks: AlertModalHooks = {}) {
  if (!isRemoved) return
  const container = document.createElement('div')
  isRemoved = false
  const vm = createVNode(AlertModal, {
    text: getSkinConfig('limitTimes') || '明天再来吧',
    onClose: () => {
      document.body.removeChild(container)
      hooks.onClose?.()
      isRemoved = true
    }
  })

  render(vm, container)
  document.body.appendChild(container)
}
