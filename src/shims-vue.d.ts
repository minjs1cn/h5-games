/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface Window {
  iqiyiTpct: {
    track(a: number, cb?: Function): void
  },

  CFG: {
    skinConfig: import('@tuia/config-simplify').SimplifySkinConfig
    options: Array<import('@tuia/config-simplify').SimplifySkinOption>
    skinName: string
    limitTimes: number
  },

  HUNTER_CONFIG: {
    client: string
    pageId: string
  },

  /**  爱奇艺提供的打开页面的方法 */
  openService(url: string): void

  /** 七鱼客服提供的能力 */
  ysf: {
    (method: string): string
    (method: string, cb: () => void): void
    (method: string, options?: { [index: string]: unknown }): void
    a: unknown[]
  }
}

declare interface ImportMeta {
  readonly hot?: {
    readonly data: any

    accept(): void
    accept(cb: (mod: any) => void): void

    acceptDeps(dep: string, cb: (mod: any) => void): void
    acceptDeps(deps: readonly string[], cb: (mods: any[]) => void): void

    dispose(cb: (data: any) => void): void
    decline(): void
    invalidate(): void

    on(event: string, cb: (...args: any[]) => void): void
  }

  readonly env: {
    [key: string]: string | boolean | undefined
    BASE_URL: string
    MODE: string
    DEV: boolean
    PROD: boolean
  }
}

declare module '*.png' {
  const content = ''
  export default content
}
