import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let isCollapse
try {
  isCollapse = sessionStorage.getItem('isCollapse') || ''
} catch (e) {}

export default new Vuex.Store({
  state: {
    isCollapse
  },
  getters: {
    isCollapse: state => {
      if (state.isCollapse) {
        return eval(state.isCollapse)
      }
    }
  },
  mutations: {
    TOGGLE_COLLAPSE(state, collapse) {
      state.isCollapse = collapse
      try {
        sessionStorage.setItem('isCollapse', collapse)
      } catch (e) {}
    }
  },
  actions: {
  },
  modules: {
  }
})
