module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px2rem': {
      remUnit: 200 * 750 / 640 // 兼容old
    }
  }
}