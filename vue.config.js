const { sdks, SRC, git, TIME } = require('./build/utils/config')
const { useMiddleWare } = require('vite-plugin-mocker')
const webpack = require('webpack')
const path = require('path')
const PROD = process.env.NODE_ENV === 'production'
const DEV = process.env.NODE_ENV === 'development'
/**
 * @type {import('@vue/cli-service').ConfigFunction}
 */
const Config = () => {
  // 皮肤文件夹名
  const name = process.env.SKIN_NAME
  // 皮肤入口文件路径
  const entry = process.env.SKIN_ENTRY
  // 多页面
  const pages = {
    [name]: entry
  }

  if (DEV) {
    // 开发环境，使用本地配置
    pages.config = path.join(SRC, 'core/config.js')
  }

  const styleConfig = JSON.stringify(require(path.resolve(`src/pages/${name}/config`)))
  const outputDir =  'dist/' + name.toLowerCase()

  return {
    devServer: {
      before (app) {
        app.use(async function(req, res, next) {
          if (req.url === '/') {
            res.redirect(`/${name}.html`)
          } else {
            next()
          }
        })
        // 使用mock中间件
        app.use(useMiddleWare())
      }
    },
    pages,
    outputDir,
    publicPath: '/',
    chainWebpack: config => {
      if (entry.indexOf(sdks) === -1) {
        // sdk没有html，有html的不需要压缩
        config.plugin('html-'+name).tap(args => {
          args[0].minify = {
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: false,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
          return args
        })
      }
      // 设置alias
      config.resolve.alias.set('@', SRC)
      config.resolve.alias.set('src', SRC)

      if (PROD) {
        // 生产环境剔除一些无效的代码
        config.optimization
          .minimizer('terser')
          .tap(args => {
            args[0].terserOptions.compress.drop_console = true
            args[0].terserOptions.compress.drop_debugger = true
            return args
          })
        // 去除脚本预加载
        config.plugins.delete(`preload-${name}`)
      }
    },
    configureWebpack: {
      // 生产环境隐藏source-map
      devtool: PROD ? 'hidden-source-map' : '',
      plugins: [
        new webpack.BannerPlugin({
          banner: `@bundleinfo-${git.config.name}-${git.config.email}-${TIME.now()}`
        })
      ],
      optimization: {
        splitChunks: false
      }
    },
    // 加入编译的npm包
    transpileDependencies: [
      '@minjs1cn/toolkits'
    ],
    // 导入less的mixin
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
          './src/core/styles/mixin.less'
        ]
      }
    }
  }
}

module.exports = Config