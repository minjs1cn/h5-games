# tuia-static-activity-vue3

# Tuia-Static-Activity

推啊静态活动页（舍弃服务端渲染），使用互动直投API进行广告发放

## Usage

安装依赖

```
yarn
```

进入开发

```
yarn dev
```

开始打包

```
yarn build
```

## 配置项

一些core的默认 KEY 的配置项

```json
{
  "skinConfig": [
    {
      "name": "elements",
      "title": "页面配置",
      "childrens": [
        {
          "title": "背景图",
          "name": "bgImage",
          "type": "image",
          "size": {
            "width": 750,
            "height": 1606
          },
          "value": "",
          "psd": ""
        },
        {
          "title": "背景色",
          "name": "bgColor",
          "type": "color",
          "value": "#fff"
        }
      ]
    },
    {
      "name": "game",
      "title": "游戏配置",
      "childrens": []
    },
    {
      "name": "core",
      "title": "公共配置",
      "childrens": [
        {
          "name": "ruleText",
          "require": true,
          "title": "活动规则",
          "type": "text",
          "value": "<p>睡前领红包，好梦到天明~</p><p>活动说明：参与活动即有机会获得幸运奖~每天限参与8次，8次机会免费。此活动为概率中奖，奖品数量有限，祝好运！</p>"
        },
        {
          "title": "规则图",
          "name": "ruleBgImage",
          "size": {
            "width": 120,
            "height": 44
          },
          "type": "image",
          "psd": "",
          "value": "//yun.tuisnake.com/h5-mami/dist/rule.7fe947d73245bb3e152d731c761885f4.png"
        },
        {
          "name": "limitTimes",
          "require": true,
          "title": "次数用完",
          "type": "plainText",
          "value": "今日机会已用完，明天再来吧"
        },
        {
          "name": "appleColor",
          "title": "苹果声明颜色",
          "type": "color",
          "value": "rgba(255,255,255,.6)"
        },
        {
          "name": "appleBgColor",
          "title": "苹果声明背景",
          "type": "color",
          "value": "#6a17e0"
        },
        {
          "name": "appleText",
          "title": "苹果声明文字",
          "type": "text",
          "value": "<p>*奖品与活动和设备生产商Apple Inc.公司无关</p>"
        },
        {
          "name": "kefuChunkId",
          "require": true,
          "title": "客服文件ID",
          "type": "plainText",
          "value": "kefu2.ddd50255"
        },
        {
          "name": "kefuVisible",
          "require": true,
          "title": "客服可见",
          "type": "switch",
          "value": true
        },
        {
          "name": "thanksCloseText",
          "require": true,
          "title": "谢谢参与关闭文案",
          "type": "plainText",
          "value": "关闭"
        }
      ]
    }
  ]
}
```

## dependencies

[tuia-config-simplify](http://gitlab.dui88.com/tuia-frontend/tuia-activity-frontend/tuia-config-simplify)   
[vite-plugin-mocker](https://github.com/minjs1cn/vite-plugin-mocker)   
[js-toolkits](https://github.com/minjs1cn/js-toolkits)   
[tuia-uplpad](http://gitlab.dui88.com/tuia-cli/tuia-packages/tuia-upload)   
[tuia-inquirer](http://gitlab.dui88.com/tuia-frontend/tuia-activity-frontend/tuia-inquirer)   
[tuia-openlog](http://gitlab.dui88.com/tuia-frontend/tuia-activity-frontend/tuia-openlog)