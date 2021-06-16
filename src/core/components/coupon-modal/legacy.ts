declare global {
  interface Window {
    /** 兼容弹层 */
    CouponModal: Function
    preload: Function
    $: ZeptoStatic & {
      cookie: Function
    }
  }

  interface String {
    /** 返回 WebP 格式地址 */
    ossimg: Function
  }
}

/** 为弹层初始化而创建的全局变量 `CouponModal` */
/* eslint-disable-next-line @typescript-eslint/no-empty-function */
export function legacyModalHolder() {}

legacyModalHolder.prototype.prize = {}
/* eslint-disable-next-line @typescript-eslint/no-empty-function */
legacyModalHolder.prototype.preload = function() {}
legacyModalHolder.prototype.hasHtml = ''
legacyModalHolder.prototype.hasInsert = ''
legacyModalHolder.prototype.mmData = ''

/** 兼容性处理 */
window.CouponModal = legacyModalHolder

/**
 * 下述都是对旧弹层的兼容性处理
 * 不太重要的都用空函数顶替
 */

String.prototype.ossimg = function() {
  return this
}

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
window.preload = function() {}

if (window.$) {
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  window.$.cookie = window.$.fn.cookie = function() {}
}
