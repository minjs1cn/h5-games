import { createApp } from 'vue'
import Main from './main.vue'
import * as flexible from '@minjs1cn/toolkits/lib/flexible'
import CFG from './userConfig'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window.CFG = CFG

flexible.init(750, 750)

createApp(Main).mount('#app')
