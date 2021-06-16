import { expose, click } from 'src/core/services/log'
import { AdvertModalOptions } from 'src/core/libs/showCouponModal'
import { ModalShowResult, IndustryId2Factory, ModalClassName } from './constant'
import { legacyModalHolder } from './legacy'
import DowngradeModal from './Downgrade.vue'
import { createVNode, render } from 'vue'
import { iqiyiJumpUrl } from 'src/shared/jump'

/**
 * 弹层初始化函数
 * @param data 广告券数据
 * @param options 弹层选项
 */
interface ModalFactory {
  (data: AdvertDataLegacy, options: AdvertModalOptions):
    | string
    | ZeptoCollection
}

/**
 * 广告券数据，弹层中会用到
 */
interface AdvertDataLegacy {
  /** 奖品 ID */
  id?: number
  /** 弹层 ID */
  layerId: number
  /** 奖品类型 */
  type?: string
  /** 券图片 */
  img: string
  /** 也是券图片 */
  imgurl: string
  /** 券名称 */
  title: string
  /**
   * 自定义领取按钮文案
   * @default 立即领取
   */
  useBtnText: string
  /** 显示领取按钮 */
  showUse: boolean
  /** 落地页的数据 */
  downloadAppConfig: {
    /** iOS 落地页链接 */
    iosDownloadUrl: string
    /** Android 落地页链接 */
    androidDownloadUrl: string
    /** 广告 ID */
    advertId: number | string
  }
}

const ModuleName = 'CouponModal'

/**
 * 券弹层
 */
export default class CouponModal {
  /** 存放弹层节点的容器节点 */
  public static container: Element = CouponModal.initContainer()

  /**
   * 初始化容器节点
   * @param className 容器节点类名
   */
  private static initContainer(className = 'modal-group'): Element {
    let node: HTMLElement
    const t: HTMLCollectionOf<Element> = document.getElementsByClassName(
      className
    )

    if (t.length) {
      node = t[0] as HTMLElement
    } else {
      node = document.createElement('div')
      node.className = className
      node.style.display = 'none'
      document.body.appendChild(node)
    }

    return node
  }

  /**
   * 加载券图片
   * @param url 图片地址
   */
  public static fetchCoupon(url: string): void {
    if (url) {
      new Image().src = url
    }
  }

  /**
   * 加载弹层代码片段
   * @param codeSnippets 弹层代码片段
   */
  public static fetchModal(codeSnippets: string): void {
    if (!codeSnippets) return

    // https 的情况下，才添加 crossOrigin 属性（用于天眼监控查看详细报错）
    // http 的情况下，js 代码可能会被运营商拦截，如果添加了 crossOrigin，但是运营商并未支持 Access-Control-Allow-Origin: *，将导致跨域文件加载失败
    codeSnippets.replace(
      /oScript\.crossOrigin = "anonymous"/g,
      'if(window.location.protocol === "https:"){oScript.crossOrigin = "anonymous"}'
    )

    $(this.container).append(codeSnippets)
  }

  /**
   * 获取弹层初始化函数
   * @param id 弹层 ID
   */
  private static getModalFactory(id: number): Promise<ModalFactory> {
    return new Promise((resolve, reject) => {
      if (id) {
        const industryFactoryName = `${IndustryId2Factory[id]}_tpl`
        // 计数器
        let counter = 0
        const timer = setInterval(() => {
          if (legacyModalHolder.prototype[id]) {
            // 弹层的初始化函数都用弹层 ID
            resolve(legacyModalHolder.prototype[id])
          } else if (legacyModalHolder.prototype[industryFactoryName]) {
            // 很老弹层的名字
            resolve(legacyModalHolder.prototype[industryFactoryName])
          } else if (legacyModalHolder.prototype.tpl) {
            // 一些很旧的弹层初始化函数名跟 ID 无关
            resolve(legacyModalHolder.prototype.tpl)
          } else if (counter >= 8) {
            // 超过 8 次
            clearInterval(timer)
            reject(new Error('waiting modal factory timeout'))
          }

          counter++
        }, 125)
      } else {
        reject(new Error('wrong modal id'))
      }
    })
  }

  /**
   * 跳转落地页
   * @param url 跳转地址
   */
  private static toLandingPage(url: string) {
    if (!url) return

    iqiyiJumpUrl(url)
  }

  /**
   * 生成降级弹层
   * @param options 弹层配置
   */
  private static getDowngradeModalZepto(
    options: AdvertModalOptions
  ): ZeptoCollection {
    const container = document.createElement('div')
    const vm = createVNode(DowngradeModal, {
      couponName: options.title,
      couponImage: options.bannerPngUrl
    })
    render(vm, container)

    return $(container.firstElementChild as Node)
  }

  private $modal: ZeptoCollection | undefined

  /**
   * 构造函数
   * @constructor
   * @param options 弹层配置
   */
  constructor(options: AdvertModalOptions) {
    const { advertLayer } = options

    // 加载广告券
    // TODO: webp 优化
    CouponModal.fetchCoupon(advertLayer.image)
    CouponModal.fetchModal(advertLayer.code)
  }

  /** 移除整个弹层 */
  private removeEntireModal() {
    this.$modal?.remove()

    // 一些不具有唯一名字的旧弹层，关闭后需要移除初始化函数避免下次轮询检查到上轮的弹层
    if (legacyModalHolder.prototype.tpl) {
      delete legacyModalHolder.prototype.tpl
    }
  }

  /**
   * 事件注册
   * @param options 弹层配置
   */
  private events(options: AdvertModalOptions) {
    // 领取
    $(ModalClassName.Use).one('click', e => {
      console.debug(`[${ModuleName}]:`, '领取')

      e.stopPropagation()

      // 点击埋点
      click(options.embed.advertClickUrl).then(() => {
        // 跳转落地页
        CouponModal.toLandingPage(options.promoteUrl)

        // 移除弹层
        this.removeEntireModal()

        // 点击领取回调
        options?.callback?.onUse?.()
      })
    })

    // 关闭
    $(ModalClassName.Close).one('click', e => {
      console.debug(`[${ModuleName}]:`, '关闭')

      e.stopPropagation()

      // 关闭埋点？

      // 移除弹层
      this.removeEntireModal()

      // 点击领取回调
      options?.callback?.onClose?.()
    })

    // 再来一次
    $(ModalClassName.Again).one('click', e => {
      console.debug(`[${ModuleName}]:`, '再来一次')

      e.stopPropagation()

      // 再来一次埋点？
      Promise.resolve().then(() => {
        // 移除弹层
        this.removeEntireModal()

        // 点击领取回调
        options?.callback?.onAgain?.()
      })
    })
  }

  /**
   * 展示弹层
   * @param options 弹层选项
   */
  public async show(options: AdvertModalOptions): Promise<ModalShowResult> {
    // 加载弹层代码片段

    // 弹层构造函数
    let factory: ModalFactory | undefined = undefined
    let resultCose: ModalShowResult

    try {
      // 1. 等待弹层初始化函数加载
      factory = await CouponModal.getModalFactory(options.advertLayer.id)
    } catch (e) {
      console.error(e)
    }

    if (factory && typeof factory === 'function') {
      // 2. 获取弹层 DOM 片段或 **Zepto** 对象
      // 绑定 this 指向到 `CouponModal` 原型，而不是当前作用域
      // 因为某些弹层初始化函数会用到 `this.xxx` 原型上的属性
      factory = factory.bind(legacyModalHolder.prototype)

      const legacyPrizeOptions: AdvertDataLegacy = {
        layerId: options.advertLayer.id,
        img: options.bannerPngUrl,
        imgurl: options.bannerPngUrl,
        title: options.title,
        showUse: true,
        useBtnText: options.buttonText,
        downloadAppConfig: {
          iosDownloadUrl: options.promoteUrl,
          androidDownloadUrl: options.promoteUrl,
          advertId: options.advertId
        }
      }

      // 某些弹层里可能会用到
      legacyModalHolder.prototype.prize = legacyPrizeOptions

      // 弹层初始化函数可能会运行异常
      try {
        this.$modal = $(factory(legacyPrizeOptions, options))
        resultCose = ModalShowResult.Done
      } catch (e) {
        console.error('modal factory break', e)

        // 2. 降级弹层
        this.$modal = CouponModal.getDowngradeModalZepto(options)
        resultCose = ModalShowResult.Fail
      }
    } else {
      // 2. 降级弹层
      this.$modal = CouponModal.getDowngradeModalZepto(options)
      resultCose = ModalShowResult.Fail
    }

    // 3. 添加到页面上
    $('body').append(this.$modal)

    // 4. 事件注册
    this.events(options)

    // 统一更新关闭按钮样式？

    // 添加订单号到页面？

    // 设置广告水印？

    // 券曝光
    expose(options.embed.advertExposureUrl)

    // 5. 展示
    $(ModalClassName.Main).show()

    return resultCose
  }
}
