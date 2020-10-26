import messageBox from 'base/messageBox/messageBox.js'
import Toast from 'base/toast/toast.js'
import loading from 'base/loading/loading.js'

import AwesomePicker from 'vue-awesome-picker'
import { Cookie, Local, Session } from 'js/utils/storage.js'

import singlePicker from 'base/picker/singlePicker.js'
import HeaderNav from 'base/headerNav/headerNav'
import InputBox from 'base/form/inputBox'
import InputBtn from 'base/form/btn'
import TextBox from 'base/form/textBox'
import Scroll from 'base/scroll/scroll'
import RFont from 'base/font/font'
const components = Vue => {
  Vue.use(AwesomePicker)
  Vue.component('HeaderNav', HeaderNav)
  Vue.component('InputBox', InputBox)
  Vue.component('InputBtn', InputBtn)
  Vue.component('TextBox', TextBox)
  Vue.component('Scroll', Scroll)
  Vue.component('RFont', RFont)
  // 本地存储操作
  Vue.prototype.Cookie = Cookie
  Vue.prototype.Local = Local
  Vue.prototype.Session = Session
  // 模态框
  Vue.prototype.$messageBox = messageBox
  Vue.prototype.$toast = Toast
  Vue.prototype.$loading = loading
  Vue.prototype.$singlePicker = singlePicker
}

export default components
