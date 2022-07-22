import Vue from 'vue'

import TableContainer from './TableContainer';
import Pagination from './Pagination';
import XWButton from './XWButton';
import XWDialog from './XWDialog';
const install = function(Vue) {
  Vue.component('TableContainer', TableContainer)
  Vue.component('Pagination', Pagination)
  Vue.component('XWButton', XWButton)
  Vue.component('XWDialog', XWDialog)
}

Vue.use(install)
