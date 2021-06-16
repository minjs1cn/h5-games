import a from 'src/assets/options/1.png'
import b from 'src/assets/options/2.png'
import c from 'src/assets/options/3.png'
import d from 'src/assets/options/4.png'
import e from 'src/assets/options/5.png'
import f from 'src/assets/options/6.png'
import g from 'src/assets/options/7.png'
import h from 'src/assets/options/8.png'

export const OptionType = {
  LOTTERY: 'lottery',
  THANKS: 'thanks'
}

export default {
  title: '哈哈哈哈',
  limitTimes: 1,
  options: [
    {
      id: 1,
      title: '50元红包',
      image: a,
      type: OptionType.LOTTERY
    },
    {
      id: 2,
      title: '谢谢参与',
      image: b,
      type: OptionType.THANKS
    },
    {
      id: 3,
      title: '品牌机器人',
      image: c,
      type: OptionType.LOTTERY,
      text: '获得智能扫地机器人2600元优惠券！限时领取！',
      use: 'https://shop92398926.m.youzan.com/wscgoods/detail/2xbue8xpbcyye'
    },
    {
      id: 4,
      title: '谢谢参与',
      image: d,
      type: OptionType.THANKS
    },
    {
      id: 5,
      title: 'iPhone12',
      image: e,
      type: OptionType.LOTTERY
    },
    {
      id: 6,
      title: '100元话费',
      image: f,
      type: OptionType.LOTTERY
    },
    {
      id: 7,
      title: '空气净化器',
      image: g,
      type: OptionType.LOTTERY
    },
    {
      id: 8,
      title: '谢谢参与',
      image: h,
      type: OptionType.LOTTERY
    }
  ]
}
