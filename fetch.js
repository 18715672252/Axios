import axios from 'axios'
import qs from 'qs'
import loading from 'base/loading/loading.js'
import { requestJudge } from 'js/utils/utils'
import { JSEncrypt } from 'jsencrypt'
import md5 from 'js-md5'
import * as types from '@/store/mutation-types'
import store from '@/store/index'
import Vue from 'vue'
let loadCount = 0
axios.interceptors.request.use(
  config => {
    let requestUrl = config.url
    config.headers['Request-Url'] = config.url
    if (requestUrl.indexOf('sendFeedbackEmail') !== -1) {
      config.data = qs.stringify(config.params, { arrayFormat: 'repeat' })
      config.params = []
    }
    // 签名
    if (requestJudge(requestUrl)) {
      config.headers['Session-Id'] = store.state.sessionId
      if (store.state.token !== '') {
        let token = store.state.token
        let clientPrivateKey = ''
        // 开发环境下运行
        if (process.env.NODE_ENV === 'development') {
          clientPrivateKey = store.state.clientPrivateKey
        }
        // 生产环境下运行
        if (process.env.NODE_ENV === 'production') {
          /* eslint-disable */
          clientPrivateKey = plus.storage.getItem('clientPrivateKey')
          /* eslint-enable */
        }
        let serverPublicKey = store.state.serverPublicKey
        // token解密
        let decryptor = new JSEncrypt()
        decryptor.setPrivateKey(clientPrivateKey)
        let deToken = decryptor.decrypt(token)
        // token加密
        decryptor.setPublicKey(serverPublicKey)
        let enToken = decryptor.encrypt(deToken)
        config.headers['Access-Token'] = enToken
        // sign
        if (config.params) {
          let param = config.params
          let sign = ''
          for (let item of Object.keys(param)) {
            sign += `${item}=${param[item]}&`
          }
          sign += deToken
          sign = md5(sign)
          config.headers['Sign'] = sign
        } else {
          let sign = ''
          sign += deToken
          sign = md5(sign)
          config.headers['Sign'] = sign
        }
      }
    }
    if (config.showLoading) {
      if (config.loadTxt) {
        loading.show({
          txt: config.loadTxt
        })
        loadCount++
      } else {
        loadCount++
        loading.show()
      }
    }
    return config
  },
  err => {
    if (loadCount > 0) {
      loading.hide()
      loadCount--
    }
    return Promise.reject(err)
  }
)

// 响应时
axios.interceptors.response.use(
  response => {
    let session = response.headers['session-id']
    if (session) {
      store.commit(types.SET_SESSIONID, session)
    }
    if (loadCount > 0) {
      loading.hide()
      loadCount--
    }
    return response.data
  },
  err => {
    if (loadCount > 0) {
      loading.hide()
      loadCount--
    }
    // console.log('响应时err：' + JSON.stringify(err))
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权，请登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = `请求地址异常`
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器内部错误'
          break
        case 501:
          err.message = '服务未实现'
          break
        case 502:
          err.message = '网关错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }
    } else {
      if (err.message === '请求中断') {
        err.message = '请求中断'
      } else {
        err.message = '网络超时，请检查网络'
      }
    }
    // console.log(err)
    // 此处留存错误日志，错误统一输出
    if (err.message === '请求中断') {
      err.message = ''
    } else {
      err.message = 'System error, please try again later'
    }
    return Promise.reject(err) // 返回接口返回的错误信息
  }
)

export default {
  get (url, params, showLoading = true, loadTxt = 'Loading...') {
    const CancelToken = axios.CancelToken
    let cancel = ''
    window.localStorage.setItem('cancel', true)
    let cancelToken = new CancelToken(c => {
      cancel = c
    })
    Vue.prototype.cancelAjax = function () {
      // 切换页面强行中断请求 router.beforeEach中用到
      if (cancel) {
        window.localStorage.setItem('cancel', false)
        cancel('请求中断')
      }
    }
    if (!url) return
    return axios({
      method: 'get',
      url: url,
      params,
      timeout: 10000,
      showLoading,
      loadTxt,
      cancelToken: cancelToken
    })
  },
  post (url, data, showLoading = true, loadTxt = 'Loading...') {
    const CancelToken = axios.CancelToken
    let cancel = ''
    window.localStorage.setItem('cancel', true)
    let cancelToken = new CancelToken(c => {
      cancel = c
    })
    Vue.prototype.cancelAjax = function () {
      // 切换页面强行中断请求 router.beforeEach中用到
      if (cancel) {
        window.localStorage.setItem('cancel', false)
        cancel('请求中断')
      }
    }
    if (!url) return
    return axios({
      method: 'post',
      url: url,
      params: data,
      timeout: 10000,
      showLoading,
      loadTxt,
      cancelToken: cancelToken
    })
  }
}
