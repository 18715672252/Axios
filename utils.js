// 错误处理
import * as types from '@/store/mutation-types'
import store from '@/store/index'
import messageBox from 'base/messageBox/messageBox.js'
import router from '@/router/index'
import errorCode from './errorCode'
export const errHandle = (err) => {
  let code = err.errorCode.split('.')
  if (code.length === 1) {
    code = code[0]
  } else {
    code = code[1]
  }
  let error = err
  error.message = errorCode[code]
  if (!error.message) {
    error.message = err.msg
    return error
  } else {
    if (code.indexOf('ACCESS_DENIED') !== -1 || code.indexOf('SESSION_ID_NOT_EXIST') !== -1) {
      // 异地登录
      store.commit(types.SET_USERINFO, {})
      store.commit(types.SET_SERVERPUBLICKEY, '')
      store.commit(types.SET_CLIENTPRIVATEKEY, '')
      store.commit(types.SET_TOKEN, '')
      store.commit(types.SET_SESSIONID, '')
      store.commit(types.SET_ORDERINFO, {})
      store.commit(types.SET_SHOWCHARGING, false)
      store.commit(types.SET_NAVSHOW, false)
      router.push('/login')
      messageBox({
        message: 'Logged out. Another device has logged in to this account.',
        type: 'alert'
      })
      return error
    } else if (code.indexOf('SERVICE_UNAVAILABLE') !== -1) {
      store.commit(types.SET_SYSTEMSTATUS, true)
      store.commit(types.SET_SYSTEMERRORTXT, err.msg)
      return error
    } else if (code.indexOf('USER_LOCKED') !== -1) {
      return error
    } else if (code.indexOf('SESSION_DISABLED_STATE') !== -1) {
      // 用户锁定
      store.commit(types.SET_USERINFO, {})
      store.commit(types.SET_SERVERPUBLICKEY, '')
      store.commit(types.SET_CLIENTPRIVATEKEY, '')
      store.commit(types.SET_TOKEN, '')
      store.commit(types.SET_SESSIONID, '')
      store.commit(types.SET_ORDERINFO, {})
      store.commit(types.SET_SHOWCHARGING, false)
      store.commit(types.SET_NAVSHOW, false)
      router.push('/login')
      messageBox({
        message: errorCode[code],
        type: 'alert'
      })
      return error
    } else {
      return error
    }
  }
}

// 函数去抖
export function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 请求拦截器参数判断
export function requestJudge (url) {
  if (url.indexOf('awardServerPublicKey') === -1 && url.indexOf('queryDeviceDetails') === -1 && url.indexOf('sendFeedbackEmail') === -1 && url.indexOf('queryDeviceList') === -1 && url.indexOf('sendSmsVerifyCode') && url.indexOf('verifySmsCode') && url.indexOf('sendLoginVerifyCode') === -1 && url.indexOf('sendRegisterVerifyCode') === -1) {
    return true
  } else {
    return false
  }
}

export function addZero (time) {
  if (+time < 10) {
    return `0${time}`
  } else {
    return time
  }
}

export function timeLayout (time) {
  // let orderTime = new Date(`${time.date.year}/${time.date.month}/${time.date.day} ${time.time.hour}:${time.time.minute}:${time.time.second} GMT`)
  // let month = orderTime.toDateString().split(' ')[1]
  // return `${orderTime.getDate()} ${month} ${orderTime.getFullYear()} ${addZero(orderTime.getHours())}:${addZero(orderTime.getMinutes())}`
  let dateTime = `${time.date.year}/${time.date.month}/${time.date.day} ${time.time.hour}:${time.time.minute}:${time.time.second}`
  dateTime = new Date(dateTime).getTime()
  dateTime = dateTime + (10 * 60 * 60 * 1000)
  dateTime = new Date(dateTime)
  return `${dateTime.getDate()}/${addZero(dateTime.getMonth() + 1)}/${addZero(dateTime.getFullYear())} ${addZero(dateTime.getHours())}:${addZero(dateTime.getMinutes())}`
}

export function orderTimeLayout (time) {
  // let orderTime = new Date(`${time.date.year}/${time.date.month}/${time.date.day} ${time.time.hour}:${time.time.minute}:${time.time.second} GMT`)
  // let month = orderTime.toDateString().split(' ')[1]
  // return `${addZero(orderTime.getHours())}:${addZero(orderTime.getMinutes())} ${orderTime.getDate()}/${month}/${orderTime.getFullYear()}`
  let dateTime = `${time.date.year}/${time.date.month}/${time.date.day} ${time.time.hour}:${time.time.minute}:${time.time.second}`
  dateTime = new Date(dateTime).getTime()
  dateTime = dateTime + (10 * 60 * 60 * 1000)
  dateTime = new Date(dateTime)
  return `${addZero(dateTime.getHours())}:${addZero(dateTime.getMinutes())} ${dateTime.getDate()}/${addZero(dateTime.getMonth() + 1)}/${addZero(dateTime.getFullYear())}`
}
