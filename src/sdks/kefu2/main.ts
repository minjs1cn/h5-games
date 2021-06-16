import { Kefu } from 'src/core/components/kefu'
import { str2dom } from 'src/shared/dom'

import './main.less'

function createKefuModal() {
  const el = str2dom(`
    <div class="kefu-modal">
      <div class="kefu-btns">
        <div class="kefu-btn kefu-online"><i></i>在线客服</div>
        <a class="kefu-btn kefu-tel" href="tel:057122930370">
          <i></i>057122930370 (9.00-21.00)
        </a>
        <div class="kefu-cancel">取消</div>
      </div>
    </div>
  `) as Element

  return {
    el,
    online: el.querySelector('.kefu-online'),
    cancel: el.querySelector('.kefu-cancel')
  }
}

function createApp(str: string): Kefu {
  const el = str2dom(str) as Element
  const modal = createKefuModal()

  function closeModal() {
    modal.el.parentNode?.removeChild(modal.el)
  }

  function showModal() {
    document.body.appendChild(modal.el)
  }

  modal.cancel?.addEventListener('click', closeModal)

  el.addEventListener('click', showModal)

  return {
    el,
    onBtnClick(openService: () => void) {
      modal.online?.addEventListener('click', openService)
    },
    mount(container) {
      container.appendChild(el)
    }
  }
}

const app = createApp(`
  <div class="kefu">
    <img class="kefu-logo" src="//yun.tuisnake.com/h5-mami/activity/ic_kefu.png" />
    <span class="kefu-text">客服</span>
  </div>
`)

app.mount(document.body)

export default app
