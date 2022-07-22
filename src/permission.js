// import router from './router/index'
// import axios from 'axios'
// import {sendUserCodeAndCorpId, getTokenByCode} from '@/api'
// import Vue from 'vue'
// import {closeLoading, sendInfoToJava, closeMicroApp} from '@/utils/mt-utils'
//
// // Vue.use(Toast);
//
// function GetQueryString(name) {
//   // console.log(window.location.hash)
//   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
//     context = ''
//   let r
//   if (window.location.hash != '#/') {
//     r = window.location.hash.split('?')[1].match(reg)// 获取url中"?"符后的字符串并正则匹配
//   } else {
//     r = window.location.search.split('?')[1].match(reg) // 获取url中"?"符后的字符串并正则匹配
//   }
//   if (r != null) {
//     context = r[2]
//   }
//   reg = null
//   r = null
//   return context == null || context == '' || context == 'undefined' ? '' : context
// }
//
// router.beforeEach(async(to, from, next) => {
//   if (!sessionStorage.getItem('receipt_accessToken')) {
//     // next()
//     const userCode = GetQueryString('userCode'),
//       corpId = GetQueryString('corpId')
//     sessionStorage.setItem('corpId', corpId)
//     console.log(userCode, corpId)
//     const data = {
//       code: userCode
//     }
//     // // 获取Token
//     await axios.get('http://192.168.5.41/api/oauth/getTokenByCode', {
//       params: data,
//       headers: {'clientType': 'app'}
//     }).then(res => {
//       console.log(res)
//       if (res.data && res.data.code == 'M0000') {
//         sessionStorage.setItem('receipt_accessToken', res.data.data.access_token)
//         sessionStorage.setItem('receipt_refreshToken', res.data.data.refresh_token)
//         // 通过
//         sendUserCodeAndCorpId(data).then(res => {
//           if (res.code === 'M0000') {
//             const userList = res.data.corpUsers.filter((item) => {
//                 return item.corpId == corpId
//               }),
//               userId = userList[0].id,
//               accountId = userList[0].accountId,
//               accessToken = res.data.access_token
//             // refreshToken = res.data.refresh_token
//             sessionStorage.setItem('userId', userId)
//             sessionStorage.setItem('accountId', accountId)
//             sessionStorage.setItem('receipt_accessToken', accessToken)
//             closeLoading()
//             // Vue.ls.set('schedule_refreshToken', refreshToken)
//             next()
//           } else {
//             Toast('请重新进入')
//             setTimeout(() => {
//               closeMicroApp()
//               // sendInfoToJava('close')
//             }, 1000)
//           }
//         })
//       } else {
//         Toast('免登失败,请退出重试')
//         setTimeout(() => {
//           closeMicroApp()
//           // sendInfoToJava('close')
//         }, 1000)
//       }
//     }).catch(err => {
//       Toast(err)
//     })
//     // const tokenObj = getToken()
//     // Vue.ls.set('schedule_accessToken', tokenObj.token)
//   } else {
//     // Toast('有token')
//     next()
//   }
//
//   // NProgress.done()
// })
//
// router.afterEach(() => {
//   // finish progress bar
// })
