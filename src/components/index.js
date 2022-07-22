import Vue from 'vue'

import TableContainer from './TableContainer';
import Pagination from './Pagination';
import LawButton from './LawButton';
import LawDialog from './LawDialog';
const install = function(Vue) {
  Vue.component('TableContainer', TableContainer)
  Vue.component('Pagination', Pagination)
  Vue.component('LawButton', LawButton)
  Vue.component('LawDialog', LawDialog)
}

Vue.use(install)
