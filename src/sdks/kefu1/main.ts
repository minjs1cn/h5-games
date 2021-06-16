import { Kefu } from 'src/core/components/kefu'
import { str2dom } from 'src/shared/dom'

import './main.less'

function createApp(str: string): Kefu {
  const el = str2dom(str) as Element

  return {
    el,
    onBtnClick(openService: () => void) {
      el?.addEventListener('click', openService)
    },
    mount(container) {
      container.appendChild(el)
    }
  }
}

const app = createApp(`
  <div class="kefu"></div>
`)

app.mount(document.body)

export default app
