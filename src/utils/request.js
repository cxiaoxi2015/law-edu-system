import axios from 'axios'
import {Toast} from 'vant'
import Vue from 'vue'

axios.defaults.isRetryRequest = false

const service = axios.create({
  baseURL: 'http://192.168.6.127:8088/officialdoc/',
  withCredentials: true
})

// 刷新token的请求方法
function getRefreshToken() {
  const params = {
    refreshToken: sessionStorage.getItem('receipt_refreshToken')
  }
  return service.get('tb-user/refreshToken', {params, headers: {'clientType': 'app'}})
}

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('receipt_accessToken')

    if (config.method == 'get') {
    }

    if (config.method == 'post') {

    }

    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const resConfig = response.config,
      res = response.data
    // 判断是否已经刷新过token
    if (!resConfig.isRetryRequest) {
      if (res.code === 'O_T_001') {
        // if (res.code == "O_T_001") {
        return getRefreshToken()
          .then((res) => {
            if (res.code === 'M0000') {
              const data = res.data
              console.log('重新请求')
              resConfig.isRetryRequest = true
              sessionStorage.setItem('receipt_accessToken', data.access_token)
              sessionStorage.setItem('receipt_refreshToken', data.refresh_token)
              resConfig.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('receipt_accessToken')
              return axios(resConfig)
            } else {
              Toast.fail('重新请求失败')
            }
          })
      }
    } else {
      Toast.fail('加载超时')
    }
    return res
  },
  error => {
    // console.log(!navigator.onLine)
    // console.log(error == 'Network Error')
    if (!navigator.onLine || error.message === 'Network Error') {
      Toast.fail('网络异常,请检查网络')
    }
    return Promise.reject(error)
  }
)

export default service
