export const onPlusReady = function (callback, context = this) {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    if (window.plus) {
      // console.log('isAndroid onPlusReady中plus存在')
      callback.call(context)
    } else {
      // console.log('isAndroid onPlusReady中plus不存在')
      document.addEventListener('plusready', callback.bind(context))
      document.addEventListener(
        'plusready',
        function () {
          let _BARCODE = 'pluginbase'
          let B = window.plus.bridge
          let pluginbase = {
            PluginBaseFunction: function (obj) {
              let clsName = obj.clsName
              let method = obj.method
              let type = obj.type
              let data = obj.data
              let dataType = obj.dataType
              let callFrom = obj.callFrom
              let logData = obj.logData
              let async = obj.async
              let ifModified = obj.ifModified
              let timeout = obj.timeout
              let charset = obj.charset
              let success = obj.success
              let error = obj.error
              let successCallback = typeof success !== 'function' ? null : function (args) { success(args) }
              let errorCallback = typeof error !== 'function' ? null : function (code) { error(code) }
              if (async) {
                let callbackID = B.callbackId(successCallback, errorCallback)
                return B.exec(_BARCODE, 'PluginBaseFunction', [
                  charset,
                  timeout,
                  clsName,
                  method,
                  type,
                  ifModified,
                  data,
                  dataType,
                  callFrom,
                  logData,
                  callbackID
                ])
              } else {
                return B.execSync(_BARCODE, 'PluginBaseFunctionSync', [
                  charset,
                  timeout,
                  clsName,
                  method,
                  type,
                  ifModified,
                  data,
                  dataType,
                  callFrom,
                  logData
                ])
              }
            }
          }
          window.plus.pluginbase = pluginbase
        }, true)
    }
  } else if (isiOS) {
    if (window.plus) {
      callback.call(context)
    } else {
      document.addEventListener('plusready', callback.bind(context))
    }
    document.addEventListener(
      'plusready',
      function () {
        let _BARCODE = 'pluginbase'
        let B = window.plus.bridge
        let pluginbase = {
          PluginBaseFunction: function (obj) {
            let clsName = obj.clsName
            let method = obj.method
            let type = obj.type
            let data = obj.data
            let dataType = obj.dataType
            let callFrom = obj.callFrom
            let logData = obj.logData
            let async = obj.async
            let ifModified = obj.ifModified
            let timeout = obj.timeout
            let charset = obj.charset
            let success = obj.success
            let error = obj.error
            let successCallback = typeof success !== 'function' ? null : function (args) { success(args) }
            let errorCallback = typeof error !== 'function' ? null : function (code) { error(code) }
            if (async) {
              let callbackID = B.callbackId(successCallback, errorCallback)
              return B.exec(_BARCODE, 'PluginBaseFunction', [
                charset,
                timeout,
                clsName,
                method,
                type,
                ifModified,
                data,
                dataType,
                callFrom,
                logData,
                callbackID
              ])
            } else {
              return B.execSync(_BARCODE, 'PluginBaseFunctionSync', [
                charset,
                timeout,
                clsName,
                method,
                type,
                ifModified,
                data,
                dataType,
                callFrom,
                logData
              ])
            }
          }
        }
        window.plus.pluginbase = pluginbase
      }, true)
  }
}
