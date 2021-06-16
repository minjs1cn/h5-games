import { animate, linear, cubicBezier } from 'popmotion'

type OnUpdate = (angle: number) => void

export interface ToProps {
  index?: number
  to?: number
  duration?: number
  complete: () => void
}

function getAngleRangeByIndex(index: number) {
  return [45 * (7 - index), 45 + 45 * (7 - index)]
}

export default class {
  onUpdate: OnUpdate
  angle: number
  tw:
    | {
        stop: () => void
      }
    | undefined

  constructor(onUpdate: OnUpdate) {
    this.onUpdate = onUpdate
    this.angle = 0
  }

  /**
   * 闲置状态空转
   */
  idled() {
    this.tw?.stop()
    this.tw = animate({
      from: this.angle,
      to: this.angle + 360,
      duration: 10000,
      ease: linear,
      repeat: Infinity,
      onUpdate: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
      }
    })
  }

  /**
   * 开始抽奖
   */
  start() {
    this.tw?.stop()
    this.tw = animate({
      from: this.angle,
      to: this.angle + 360,
      duration: 500,
      ease: linear,
      repeat: Infinity,
      onUpdate: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
      }
    })
  }

  /**
   * 转到中奖结果处
   * @param data 抽奖结果
   */
  to(data: ToProps) {
    console.log(data)
    this.tw?.stop()
    let to = 0

    if (data.to !== undefined) {
      to = data.to
    } else if (data.index !== undefined) {
      const angles = getAngleRangeByIndex(data.index)
      to = (angles[0] + angles[1]) / 2
    }

    this.tw = animate({
      from: this.angle,
      to: this.angle + 360 * 3 - (this.angle % 360) + to,
      duration: data.duration || 1000,
      ease: cubicBezier(0.33, 1, 0.68, 1),
      onUpdate: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
      },
      onComplete: () => {
        data.complete()
      }
    })
  }
}
