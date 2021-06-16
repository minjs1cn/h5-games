import config from '../../userConfig'

type Config = typeof config.options

export interface GameConfig {
  canvas: HTMLCanvasElement
  width: number
  height: number
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = src
  })
}

export class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number

  constructor(config: GameConfig) {
    this.canvas = config.canvas
    this.width = config.width
    this.height = config.height
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.backgroundColor = '#000'
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  async init(options: Config) {
    const size = Math.floor(this.width / 6)
    console.log(size)
    const imgs = await Promise.all(
      options.map(option => loadImage(option.image))
    )
    options.forEach((option, index) => {
      this.ctx.save()
      this.ctx.translate(this.width / 2, this.height / 2)
      this.ctx.beginPath()
      this.ctx.moveTo(0, 0)
      this.ctx.lineWidth = 1
      switch (index) {
        case 0:
          this.ctx.lineTo(this.width / 2, -this.height / 2)
          this.ctx.lineTo(0, -this.height / 2)
          break
        case 1:
          this.ctx.lineTo(this.width / 2, 0)
          this.ctx.lineTo(this.width / 2, -this.height / 2)
          break
        case 2:
          this.ctx.lineTo(this.width / 2, 0)
          this.ctx.lineTo(this.width / 2, this.height / 2)
          break
        case 3:
          this.ctx.lineTo(this.width / 2, this.height / 2)
          this.ctx.lineTo(0, this.height / 2)
          break
        case 4:
          this.ctx.lineTo(0, this.height / 2)
          this.ctx.lineTo(-this.width / 2, this.height / 2)
          break
        case 5:
          this.ctx.lineTo(-this.width / 2, this.height / 2)
          this.ctx.lineTo(-this.width / 2, 0)
          break
        case 6:
          this.ctx.lineTo(-this.width / 2, 0)
          this.ctx.lineTo(-this.width / 2, -this.height / 2)
          break
        case 7:
          this.ctx.lineTo(-this.width / 2, -this.height / 2)
          this.ctx.lineTo(0, -this.height / 2)
          break
      }
      this.ctx.fillStyle = index % 2 === 0 ? '#fff' : '#f9f4c3'
      this.ctx.closePath()
      this.ctx.fill()
      this.ctx.rotate(((index * 45 + 22.5) * Math.PI) / 180)
      this.ctx.translate((-1 * size) / 2, (-1 * size) / 2)
      this.ctx.font = Math.floor(size / 4) + 'px blod'
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = 'red'
      this.ctx.fillText(option.title, size / 2, -size * 2)
      this.ctx.drawImage(imgs[index], 0, -size * 1.8, size, size)
      this.ctx.restore()
    })
  }
}
