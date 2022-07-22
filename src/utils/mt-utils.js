import wnsdk from '@tjmt/wnsdk'
import {Toast} from 'vant'
import moment from 'moment/moment'
import Vue from 'vue'

/**
 * 获取手机系统
 * @returns {string}
 * 安卓: 'android'     IOS: 'ios'
 */
export function getSystem() {
  const u = navigator.userAgent,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    isiOS = /iphone/gi.test(navigator.userAgent) // ios终端
  if (isAndroid) {
    return 'android'
  }
  if (isiOS) {
    return 'ios'
  }
}

/**
 * mt 提供的发送消息的方法
 * 目前使用： close（关闭当前webview）
 * @param name(String) 发送的消息String
 */
export function sendInfoToJava(name) {
  var u = navigator.userAgent, app = navigator.appVersion,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // 如果输出结果是true就判定是android终端或者uc浏览器
  // var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //根据输出结果true或者false来判断ios终端
  const isIOS = /iphone/gi.test(navigator.userAgent) // ios终端
  //! !双叹号一般用来将后面的表达式转换为布尔型的数据（boolean）
  if (isAndroid) {
    window.WebView.showInfoFromJs(name)
  }
  if (isIOS) {
    window.webkit.messageHandlers.sendInfoToJava.postMessage(name)
  }
}

// /**
//  * 关闭从原生APP进入后的进度条
//  */
// export function closeLoading() {
//   Toast('123')
//   wnsdk
//     .ui
//     .closeLoadingBar()
// }

/**
 * 关闭从原生APP进入后的进度条
 */
export function closeLoading() {
  const sys = getSystem(),
    obj = {
      status: 0
    }
  if (sys == 'android') {
    window.WebView.loading(JSON.stringify(obj))
  }
  if (sys == 'ios') {
    window.webkit.messageHandlers.loading.postMessage(obj)
  }
  // wnsdk
  //   .ui
  //   .closeLoadingBar()
}

/**
 * 转发
 */
export function transmit(data) {
  wnsdk.im.appLinkTransmit(data || {
    title: '张三的',
    url: 'https://zx-zgiot-002.oss-cn-qingdao.aliyuncs.com/dev-image/11e880e7b27843049d75653b750ca8a3.png',
    prompt: '来自于我的',
    content: '此链接属于……\n2019-07-08',
    success: function(result) {
      // Toast(JSON.stringify(result))
    },
    error: function(error) {
      // Toast(JSON.stringify(error))
    }
  })
}

/**
 * 架构选人
 */
export function choosePerson(selected = [], editSelect = []) {
  selected.push(Vue.ls.get('accountId'))
  return new Promise((resolve, reject) => {
    wnsdk
      .util
      .chooseAddressBook({
        id: Vue.ls.get('corpId'),
        type: 2,
        editSelect: editSelect,
        selected: selected,
        success: (result) => {
          const data = result.data
          data.forEach(item => {
            item.id = item.corpUserId
          })

          resolve(data)
          // Toast({
          //   duration: 3000,
          //   message: JSON.stringify(result.data)
          // })
        },
        error: (error) => {
          Toast(JSON.stringify(error))
        }
      })
  })
}

/**
 * 关闭微应用
 */
export function closeMicroApp() {
  wnsdk
    .page
    .closeMicroApp()
}

/**
 * 获取位置信息
 */
export function getLocation() {
  return new Promise((resolve, reject) => {
    wnsdk
      .device
      .location({
        success: (result) => {
          resolve(result)
        },
        error: (error) => {
          Toast(JSON.stringify(error.msg))
        }
      })
  })
}

/**
 * 获取位置信息
 */
export function requestLocationLimit() {
  return new Promise((resolve, reject) => {

  })
}

/**
 * 预览
 */
export function preView(type, url, name) {
  wnsdk
    .media
    .multimediaPreview({
      type,
      url,
      name
    })
}
