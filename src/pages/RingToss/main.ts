import { createApp } from 'vue'
import Main from './main.vue'
import * as flexible from '@minjs1cn/toolkits/lib/flexible'
import 'src/core/libs/hunter'

flexible.init(640, 750)

createApp(Main).mount('#app')
