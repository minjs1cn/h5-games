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
  skinConfig: [
    {
      childrens: [
        {
          name: 'theme',
          psd:
            '//yun.tuisnake.com/h5-mami/activity/turnCircle/image/banner1.png',
          size: {
            width: 750,
            height: 300
          },
          title: '主题图',
          type: 'image',
          value: './assets/banner.png'
        },
        {
          name: 'bgImage',
          psd: '//yun.tuisnake.com/upload/F0Y4G1473332079745.psd',
          size: {
            width: 750,
            height: 1606
          },
          title: '背景图',
          type: 'image',
          value: '//yun.tuisnake.com/h5-mami/dist/72896d9092dc22497066.png'
        },
        {
          title: '规则图',
          name: 'ruleBgImage',
          size: {
            width: 92,
            height: 34
          },
          type: 'image',
          psd:
            '//yun.tuisnake.com/h5/activity/turntable_circle/images/rule.png',
          value:
            '//yun.tuisnake.com/h5/activity/turntable_circle/images/rule.png'
        },
        {
          name: 'bgColor',
          title: '背景色',
          type: 'color',
          value: '#6a17e0'
        },
        {
          name: 'statusText',
          title: '抽奖状态颜色',
          type: 'color',
          value: '#ffffff'
        }
      ],
      name: 'elements',
      title: '页面配置'
    },
    {
      childrens: [
        {
          name: 'turntable',
          psd: '//yun.tuisnake.com/upload/uDpLh1473332048354.psd',
          size: {
            height: 635,
            width: 635
          },
          title: '大转盘背景',
          type: 'image',
          value: '//yun.tuisnake.com/h5-mami/dist/56a29daa0ad4f64f8a9e.png'
        },
        {
          name: 'circleBg',
          psd: '',
          size: {
            height: 856,
            width: 750
          },
          title: '大转盘边框',
          type: 'image',
          value:
            '//yun.tuisnake.com/h5-mami/activity/turnCircle/2.1/circleBg.png'
        },
        {
          name: 'foundation',
          psd: '',
          size: {
            height: 283,
            width: 676
          },
          title: '大转盘底座',
          type: 'image',
          value:
            '//yun.tuisnake.com/h5-mami/activity/turnCircle/2.1/foundation1.png'
        },
        {
          name: 'point',
          psd: '//yun.tuisnake.com/upload/newHdTool/turntable_cricle/point.psd',
          size: {
            height: 68,
            width: 42
          },
          title: '指针',
          type: 'image',
          value: '//yun.tuia.cn/mami-media/img/ey50jzcohn.png'
        },
        {
          name: 'startInner',
          psd: '',
          size: {
            height: 178,
            width: 178
          },
          title: '按钮内圈',
          type: 'image',
          value: '//yun.tuisnake.com/h5-mami/dist/97a10a5cbd0c9cf3f606.png'
        },
        {
          name: 'start',
          title: '按钮外圈',
          type: 'image',
          size: {
            width: 243,
            height: 274
          },
          value: '//yun.tuisnake.com/h5-mami/dist/5ee82ba891e04abd3eb7.png',
          psd: ''
        },
        {
          name: 'prizeText',
          title: '奖品字体颜色',
          type: 'color',
          value: '#f45125'
        }
      ],
      name: 'core',
      title: '游戏配置'
    },
    {
      childrens: [
        {
          name: 'ruleText',
          require: true,
          title: '活动规则',
          type: 'text',
          value:
            '<p>睡前领红包，好梦到天明~</p><p>活动说明：参与活动即有机会获得幸运奖~每天限参与8次，8次机会免费。此活动为概率中奖，奖品数量有限，祝好运！</p><p>惊喜一：100元红包</p><p>惊喜二：50元红包</p><p>惊喜三：10元红包</p><p>惊喜四：随机红包</p><p>惊喜五：幸运福袋</p><p>－－－－－－－－－－－－－－－－</p><p>惊喜一：100元红包共10份，中奖概率为0.01%；</p><p>惊喜二：50元红包共20份，中奖概率为0.02%；</p><p>惊喜三：10元红包共30份，中奖概率为0.03%；</p><p>惊喜四：随机红包共120份，中奖概率为0.12%；&nbsp;&nbsp;</p><p>以上奖品，每人每天限领取1次。</p>'
        },
        {
          name: 'limitTimes',
          require: true,
          title: '次数用完',
          type: 'plainText',
          value: '今日机会已用完，明天再来吧'
        },
        {
          name: 'appleColor',
          title: '苹果声明颜色',
          type: 'color',
          value: 'rgba(255,255,255,.6)'
        },
        {
          name: 'appleBgColor',
          title: '苹果声明背景',
          type: 'color',
          value: '#6a17e0'
        },
        {
          name: 'appleText',
          title: '苹果声明文字',
          type: 'text',
          value: '<p>*奖品与活动和设备生产商Apple Inc.公司无关</p>'
        },
        {
          name: 'kefuChunkId',
          require: true,
          title: '客服文件ID',
          type: 'plainText',
          value: 'kefu2.ddd50255'
        },
        {
          name: 'kefuVisible',
          require: true,
          title: '客服可见',
          type: 'switch',
          value: true
        },
        {
          name: 'thanksCloseText',
          require: true,
          title: '谢谢参与关闭文案',
          type: 'plainText',
          value: '关闭'
        }
      ],
      name: 'textInfo',
      title: '公共配置'
    }
  ],
  limitTimes: 1,
  options: [
    {
      id: 1,
      title: '现金红包',
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
      title: '扫地机器人',
      image: c,
      type: OptionType.LOTTERY,
      text: '获得智能扫地机器人2600元优惠券！限时领取！',
      use:
        'alipays://platformapi/startapp?appId=20000067&url=' +
        encodeURIComponent(
          'https://shop92398926.m.youzan.com/wscgoods/detail/2xbue8xpbcyye'
        )
    },
    {
      id: 4,
      title: '谢谢参与',
      image: d,
      type: OptionType.THANKS
    },
    {
      id: 5,
      title: '苹果手机',
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
