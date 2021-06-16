import RuleModal from 'src/core/components/rule-modal/index.vue'
import { getSkinConfig } from 'src/core/utils'
import { createVNode, render } from 'vue'

const defaultContent = getSkinConfig('ruleText')

export default function showRuleModal(
  e: Event,
  content: string = defaultContent
) {
  const container = document.createElement('div')
  const vm = createVNode(RuleModal, {
    content,
    onClose: () => {
      document.body.removeChild(container)
    }
  })

  render(vm, container)
  document.body.appendChild(container)
}
