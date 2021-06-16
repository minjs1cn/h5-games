/** 弹窗请求结果 */
export enum ModalShowResult {
  /** 展示成功（已关闭） */
  Done = 1,
  /** 展示失败（加载失败） */
  Fail = 2
}

/** 弹层类型 */
export enum ModalType {
  /** 普通弹层 */
  Normal = 1,
  /** 行业、重点、降级弹层 */
  Special = 2
}

/** 行业弹层 ID 映射初始化函数名 */
export const IndustryId2Factory: {
  [index: number]: string
} = {
  104: 'edu',
  103: 'credit',
  105: 'insurance',
  110: 'game',
  111: 'lottery',
  113: 'edu_1',
  114: 'credit_1',
  115: 'lottery_1',
  124: 'hangzhou_1',
  125: 'hangzhou_2'
}

/** 弹层固定类名 */
export enum ModalClassName {
  /** 弹层主体 */
  Main = '.J_modalShowPrize, .coupon-modal-showPrize',
  /** 领取、查看使用详情、标题 */
  Use = '.J_modalShowPrize .J_btnCoupon, .J_gotoDetail, .J_modalShowPrize .modal-title.title-clickable',
  /** 关闭按钮、蒙层 */
  Close = '.J_modalShowPrize .coupon-modal-close, .J_coupon-modal-close, .J_modal_close',
  /** 再来一次 */
  Again = '.coupon-again'
}
