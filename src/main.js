import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import Dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/fr'
Dayjs.extend(localizedFormat)
Dayjs.locale('fr')

Object.defineProperties(Vue.prototype, {
  $dayjs: {
      get() {
          return Dayjs
      }
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
