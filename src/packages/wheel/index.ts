import { Plugin, App } from 'vue'
import Wheel from './src/components/wheel'
import WheelOption from './src/components/wheel-option'

Wheel.Option = WheelOption

Wheel.install = function(app: App) {
  app.component(Wheel.name, Wheel)
  app.component(Wheel.WheelOption.name, Wheel.WheelOption)
  return app
}

export default Wheel as typeof Wheel &
  Plugin & {
    readonly Option: typeof WheelOption
  }

export { Wheel, WheelOption }
