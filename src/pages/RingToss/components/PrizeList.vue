<template>
  <div :class="$style.main" :style="containerStyle">
    <div :class="$style.wrapper" :style="wrapperStyle">
      <ul :class="$style.ul" :style="ulStyle">
        <li
          :class="$style.li"
          v-for="item in data"
          :key="item.id"
          :style="liStype"
        >
          <div :class="$style.liBg" :style="liBgStyle">
            <div
              :class="$style.image"
              :style="[
                imageStyle,
                { backgroundImage: 'url(' + item.image + ')' }
              ]"
            ></div>
          </div>
          <h4
            :style="titleStyle"
            :class="$style.title"
            v-if="title.position === 'top'"
          >
            {{ item.title }}
          </h4>
          <h4
            :style="titleStyle"
            :class="$style.title"
            v-if="title.position === 'bottom'"
          >
            {{ item.title }}
          </h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getConfig } from 'src/core'
import { px2rem } from '@minjs1cn/toolkits/lib/flexible'
import { computed, defineComponent } from 'vue'

const obj2style = obj => {
  const style = {}
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      switch (key) {
        case 'backgroundImage':
          style[key] = `url(${obj[key]})`
          break
        case 'color':
          style[key] = obj[key]
          break
        default:
          style[key] =
            obj[key].toString().indexOf('%') !== -1
              ? obj[key]
              : px2rem(obj[key]) + 'rem'
          break
      }
    }
  }
  return style
}

const containerStyle = {
  paddingTop: 10,
  paddingLeft: 100,
  paddingRight: 10,
  width: 750,
  height: 180,
  backgroundImage: '//yun.tuisnake.com/mami-media/img/be1fd745-c9kqw8ehzp.png'
}

const liContainer = {
  paddingLeft: 0,
  paddingRight: 0,
  width: 128,
  height: 128,
  backgroundImage: '//yun.tuisnake.com/tact/ringToss/prizeBox.png'
}
const item = {
  width: 160,
  height: 160
}

const title = {
  position: 'bottom',
  color: '#fff'
}

export default defineComponent({
  name: 'prize-list-scroll',

  props: {
    data: {
      type: Array,
      default() {
        return getConfig('options')
      }
    },
    container: {
      type: Object,
      default() {
        return {
          ...containerStyle
        }
      }
    },
    liContainer: {
      type: Object,
      default() {
        return {
          ...liContainer
        }
      }
    },
    item: {
      type: Object,
      default() {
        return {
          ...item
        }
      }
    },
    title: {
      type: Object,
      default() {
        return {
          ...title
        }
      }
    },
    gutter: {
      type: Number,
      default: 20
    }
  },

  setup(props) {
    const wrapperStyle = {}
    const imageStyle = computed(() => {
      const {
        title: { position }
      } = props
      let imageSize = 0.9
      // 如果不显示title，则图片区域占满
      if (position !== 'top' && position !== 'bottom') {
        imageSize = 1
      }

      const size = imageSize * 100 + '%'

      return {
        width: size,
        paddingBottom: size
      }
    })
    const titleStyle = computed(() => props.title.color)
    const containerStyle = computed(() => obj2style(props.container))
    const liBgStyle = computed(() => obj2style(props.liContainer))
    const ulStyle = computed(() => {
      const {
        item: { width, height },
        gutter,
        data
      } = props
      return obj2style({
        paddingTop: px2rem(props.container.height / 2 - height / 2),
        paddingLeft: px2rem(gutter),
        width: px2rem(data.length * (width + gutter))
      })
    })
    const liStype = computed(() => {
      const {
        item: { width, height },
        gutter
      } = props
      return obj2style({
        marginRight: gutter,
        width,
        height
      })
    })

    return {
      wrapperStyle,
      imageStyle,
      titleStyle,
      containerStyle,
      liBgStyle,
      ulStyle,
      liStype
    }
  }
})
</script>

<style lang="less" module>
.main {
  margin: 0 auto;
  overflow: hidden;
  background-size: 100% 100%;
}

.wrapper {
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.ul {
  display: flex;
  height: 100%;
  padding: 0;
}

.li {
  height: 100%;
  background-size: 100% 100%;
}

.liBg {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.title {
  padding: 0;
  margin: 0;
  font-size: 20px;
  line-height: 1.4;
  color: #555;
  text-align: center;
}

.image {
  margin: 0 auto;
  background-size: 100% 100%;
}
</style>
