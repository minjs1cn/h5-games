/**
 * Vue 3.0 积木接入文档 https://www.yuque.com/docs/share/9ef1436e-a090-4654-8b0f-91d97850ca7d
 */

import { AdvertModalOptions } from 'src/core/libs/showCouponModal'
import { expose, click } from 'src/core/services/log'

declare global {
  interface Window {
    /** 兼容弹层 */
    JimuSDK: {
      showLayer(options: JiMuShowOptions): void
    }
  }
}

interface JiMuShowOptions {
  schema: string
  skinType: number
  androidDownloadUrl: string
  iosDownloadUrl: string
  afterClose?: Function
  beforeUse?: Function
  beforeUsePromise?: Function
  /** 弹层曝光 */
  onLayerExpose: Function
  /** 弹层加载完成 */
  onLayerComplete?: Function
  /** 弹层关闭 */
  onLayerClose: Function
  /** 弹层点击 */
  onLayerClick: Function
}

/**
 * 展示积木弹层
 */
export default function showJiMuModal(options: AdvertModalOptions) {
  const showOptions: JiMuShowOptions = {
    schema: options.advertLayer.code,
    skinType: options.advertLayer.skinType,
    androidDownloadUrl: options.promoteUrl,
    iosDownloadUrl: options.promoteUrl,
    afterClose: () => {
      options?.callback?.onClose?.()
    },
    beforeUse: () => {
      options?.callback?.onUse?.()
    },
    onLayerExpose: () => {
      // 券曝光埋点
      expose(options.embed.advertExposureUrl)
    },
    onLayerClose: () => {
      console.log('onLayerClose')
    },
    onLayerClick: () => {
      // 券点击埋点
      click(options.embed.advertClickUrl)
    }
  }

  console.log('[showJiMuModal]', 'showOptions', showOptions)

  return window.JimuSDK.showLayer(showOptions)
}
