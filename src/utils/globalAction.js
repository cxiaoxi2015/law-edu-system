/**
 * 全局方法
 */

import Vue from 'vue'
const install = function(Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $clearForm: {
      get() {
        return formName => {
          if (this[formName]) {
            for (let key in this[formName]) {
              this[formName][key] = ''
            }
          }
          this.$refs[formName].resetFields()
        }
      }
    }
  })
}

Vue.use(install)
