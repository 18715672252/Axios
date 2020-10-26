/**
 * axios统一请求方法封装
 * @method this.httpRequest(options)
 * @param methods {string} 请求方法
 * @param url {string} 请求地址
 * @param data {object} 请求数据
 * @param showLoading {Boolean} 是否显示loading动画 default: true
 * @param loadTxt {string} loading显示文本 default: '加载中..'
 */
import axios from './fetch.js'

export default {
  // ajax请求
  async httpRequest (option = {}) {
    if (option.methods === 'GET' || option.methods === 'get') {
      return new Promise((resolve, reject) => {
        axios.get(option.url, option.data, option.showLoading, option.loadTxt)
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    } else if (option.methods === 'POST' || option.methods === 'post') {
      return new Promise((resolve, reject) => {
        axios.post(option.url, option.data, option.showLoading, option.loadTxt)
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    } else {
      console.log('method not allow!')
    }
  }
}
