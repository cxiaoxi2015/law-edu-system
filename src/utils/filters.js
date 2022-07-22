import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function(value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('date', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)
})

Vue.filter('getYear', function(dataStr, pattern = 'YYYY年') {
  return moment(dataStr).format(pattern)
})

Vue.filter('getMonthAndDay', function(dataStr, pattern = 'MM月DD日') {
  return moment(dataStr).format(pattern)
})

/**
 * 2018-05-15 09:30:00   =>   2018/05/15 09:30
 */
Vue.filter('dateTime', function(dataStr, pattern = 'YYYY/MM/DD HH:mm') {
  return moment(dataStr).format(pattern)
})

/**
 * 2018-05-15 09:30:00   =>   05/15 09:30
 */
Vue.filter('monthDateTime', function(dataStr, pattern = 'MM/DD HH:mm') {
  return moment(dataStr).format(pattern)
})

/**
 * 2018-05-15 09:30:00   =>   2018/05/15 周二
 */
Vue.filter('YearMonthDayWeek', function(dataStr, pattern = 'L ddd') {
  return moment(dataStr).format(pattern)
})

/**
 * 2018-05-15 09:30:00   =>  2019年8月28日星期三上午10点24分

 */
Vue.filter('YearMonthDayWeekTime', function(dataStr, pattern = 'LLLL') {
  return moment(dataStr).format(pattern)
})

/**
 * 2018-05-15 09:30:00   =>   2018/05/15 周二
 */
Vue.filter('time', function(dataStr, pattern = 'LT') {
  return moment(dataStr).format(pattern)
})

/**
 * 2018-05-15 09:30:00   =>   05
 */
Vue.filter('dateToMoment', function(dataStr, pattern = 'M月') {
  return moment(dataStr).format(pattern)
})

/**
 * 2018-05-15 09:30:00   =>   15
 */
Vue.filter('dateToDay', function(dataStr, pattern = 'D') {
  return moment(dataStr).format(pattern)
})
/**
 * 2018-05-15 09:30:00   =>   9:00
 */
Vue.filter('hour', function(dataStr, pattern = 'HH:mm') {
  return moment(dataStr).format(pattern)
})

/**
 * 2018-05-15 09:30:00   =>   2018/05/15 周二
 */
Vue.filter('YearMonthDayWeekTimeWeek', function(dataStr, pattern = 'YYYY/MM/DD dddd HH:mm') {
  return moment(dataStr).format(pattern)
})


/**
 * 2018-05-15 09:30:00   =>   2018/05/15 周二
 */
Vue.filter('DateWeek', function(dataStr, pattern = 'YYYY/MM/DD HH:mm  dddd') {
  return moment(dataStr).format(pattern)
})


/**
 * 2018-05-15 09:30:00   =>   2018/05/15 周二
 */
Vue.filter('MonthDayHM', function(dataStr, pattern = 'MM/D HH:mm') {
  return moment(dataStr).format(pattern)
})

