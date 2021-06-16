import axios from 'axios'
import { isPre, isTest } from './env'

const apis = {
  test: '//activity.tuiatest.cn',
  pre: '//activity.tuiapre.cn',
  prod: '//activity.tuia.cn'
}

const ajax = axios.create({
  baseURL: '//activity.tuia.cn'
})

// 开发环境
if (process.env.NODE_ENV === 'development') {
  ajax.defaults.baseURL = '/api'
}

// 测试环境
if (isTest) {
  ajax.defaults.baseURL = apis.test
}

// 预发环境
if (isPre) {
  ajax.defaults.baseURL = apis.pre
}

ajax.interceptors.request.use(config => {
  return config
})

ajax.interceptors.response.use(response => {
  return response.data
})

export default ajax
