// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import vueGooglemap from 'vue2-googlemap'
import 'babel-polyfill'
import * as types from '@/store/mutation-types'
import fastClick from 'fastclick'
import { onPlusReady } from 'js/utils/plus'
import { queryTokenStatus } from 'js/service/user'
// 通用组件
import common from 'js/utils/components.js'
// vconsole
import vConsole from 'js/utils/vConsole.js'
// rem布局
import 'js/utils/rem.js'
// 样式重置及基础样式
import 'stylus/index.styl'
Vue.config.productionTip = false
Vue.use(common) /* 引入全局组件 */
Vue.use(Vuex)
Vue.use(vueGooglemap)
vueGooglemap.initGooglemap({
  key: 'AIzaSyD5eICYYQoca4DanKzpNZNs3zUpYGp9dGc',
  language: 'en',
  v: '3.37'
})
Vue.use(vConsole)
fastClick.prototype.focus = function (targetElement) {
  let length
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}
fastClick.attach(document.body)
Vue.mixin({
  data () {
    return {
      plusReady: false
    }
  },
  methods: {
    onPlusReady: onPlusReady,
    goBack () {
      if (this.Local.get('cancel')) {
        Vue.prototype.cancelAjax()
      }
      if (this.$route.name !== 'homepage') {
        this.$router.goBack()
      }
    }
  },
  created () {
    onPlusReady(() => {
      this.plusReady = true
    }, this)
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeDestroy () {
    /* eslint-disable */
    plus.key.removeEventListener('backbutton', this.goBack, false)
  },
  created() {
    if (store.state.token) {
      queryTokenStatus()
    }
    this.Local.set('cancel', false)
    onPlusReady(() => {
      plus.key.addEventListener('backbutton', this.goBack, false)
      setTimeout(() => {
        // let logdata = {
        //   params: [{
        //     'value': '01',
        //     'type': 'val'
        //   },
        //   {
        //     'value': 'app created',
        //     'type': 'val'
        //   }]
        // }
        // window.plus.pluginbase.PluginBaseFunction({
        //   method: 'pushLog(Dstring,Dstring)',
        //   data: JSON.stringify(logdata)
        // })
        let data = {
          "params": [{
            "value": "network",
            "type": "val"
            }]
        }
        window.plus.pluginbase.PluginBaseFunction({
          clsName: "listenerCenter",
          method: "registerListener(Dstring)",
          data: JSON.stringify(data),
          async: true,
          success: function(event) {
            let u = navigator.userAgent
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            let netWork = null
            if (isAndroid) {
              netWork = JSON.parse(event)
            }
            if (isiOS) {
              netWork = event
            }
            if (netWork.state + '' === '-1') {
              store.commit(types.SET_NETWORKERROR, 'Network disconnected')
            } else {
              store.commit(types.SET_NETWORKERROR, '')
            }
          }
        })
      }, 5000)
    }, this)
    // 禁止右键
    document.oncontextmenu = function () {
      return false
    }
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isAndroid) {
      store.commit(types.SET_SYSTEM, 'Android')
    } else if (isiOS) {
      store.commit(types.SET_SYSTEM, 'Ios')
    }
  },
  mounted () {
    store.commit(types.SET_BODYHEIGHT, document.documentElement.clientHeight)
    window.onresize = () => {
      return (() => {
        if (store.state.system === 'Android') {
          if (document.documentElement.clientHeight * 1.1 < store.state.bodyHeight) {
            if (this.heightTimer) {
              window.clearInterval(this.heightTimer)
            }
            this.heightTimer = setInterval(() => {
              if (document.documentElement.clientHeight * 1.1 >= store.state.bodyHeight) {
                store.commit(types.SET_RESIZESTATUS, false)
                window.clearInterval(this.heightTimer)
              }
            }, 1000)
            store.commit(types.SET_RESIZESTATUS, true)
          } else {
            setTimeout(() => {
              store.commit(types.SET_RESIZESTATUS, false)
              window.clearInterval(this.heightTimer)
            }, 300)
          }
        }
      })()
    }
  }
})
