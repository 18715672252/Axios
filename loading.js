/**
 * 使用方法
 * 显示，默认显示文本‘加载中’，可配置
 * @method loading.show(options)
 * @param {string} txt 传入的提示文本
 * 隐藏
 * @method loading.hide()
 */

import Vue from 'vue'
import LoadingComponent from './loading.vue'

let LoadingConstructor = Vue.extend(LoadingComponent)

let initComponent
let loading = {}
let loadingCount = 0
loading.show = (option = {}) => {
  if (loadingCount === 0) {
    initComponent = new LoadingConstructor()
    if (option.txt) {
      initComponent.loadingTxt = option.txt
    }
    initComponent.$mount()
    document.querySelector(option.container || 'body').appendChild(initComponent.$el)
  }
  loadingCount++
}

loading.hide = () => {
  if (loadingCount <= 0) return
  loadingCount--
  if (loadingCount === 0) {
    initComponent.$el.parentNode.removeChild(initComponent.$el)
  }
}
export default loading
