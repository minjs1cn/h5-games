/**
 * 在爱奇艺下利用 window.top 跳转未经审核的落地页链接，跳过限制
 * 后期可能会被封
 * @param url 跳转链接
 */
export function iqiyiJumpUrl(url: string) {
  if (window.top === window.self) {
    window.location.href = url
  } else {
    try {
      window.top.location.href = url
    } catch (error) {
      window.location.href = url
    }
  }
}
