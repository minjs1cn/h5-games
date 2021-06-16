import { getConfig } from './config'

const { _env } = getConfig('query')

export const isTest =
  location.host.indexOf('tuiatest.cn') !== -1 || _env === 'test'

export const isPre = location.host.indexOf('tuiapre.cn') !== -1 || _env == 'pre'
