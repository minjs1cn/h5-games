import { App, defineComponent, ComponentOptionsWithObjectProps } from 'vue'

export function createComponentNamespace(name: string) {
  return function(sfc: ComponentOptionsWithObjectProps) {
    name = 'mk-' + name
    sfc.name = name
    sfc.install = (app: App) => {
      app.component(name, sfc)
    }

    return defineComponent(sfc)
  } as typeof defineComponent
}

export function createClassNamespace(name: string) {
  return (type: string) => 'mk-' + name + '_' + type
}
