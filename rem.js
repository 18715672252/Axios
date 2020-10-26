;(function (win, doc) {
  // let userFont = getComputedStyle(doc.documentElement, false)['fontSize']
  // //      取整后与默认16px的比例系数
  // let xs = parseFloat(userFont) / 16
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let refresh = function () {
    let w = docEl.clientWidth
    // let dpr = win.devicePixelRatio || 1
    // let setFont = 100 * (w / 750)
    // console.log('setFont1: ' + setFont)
    // setFont = setFont / xs
    // console.log('setFont2: ' + setFont)
    // // docEl.style.fontSize = 100 * (w / 750) + 'px'
    docEl.style.fontSize = 100 * (w / 750) + 'px'
    function setBodyFontSize () {
      if (doc.body) {
        doc.body.style.fontSize = '16px'
      } else {
        doc.addEventListener('DOMContentLoaded', refresh)
      }
    }
    setBodyFontSize()
  }
  refresh()

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, refresh, false)
})(window, document)
