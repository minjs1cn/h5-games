import { ComponentPublicInstance, ref } from 'vue'

export default function() {
  const instances = ref<Array<ComponentPublicInstance>>([])

  const setInstance = (el: ComponentPublicInstance) => {
    instances.value.push(el)
  }

  return [instances, setInstance] as const
}
