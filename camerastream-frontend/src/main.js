// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import axios from './backend/vue-axios'
import VueNativeSock from 'vue-native-websocket'
import('../node_modules/vuetify/dist/vuetify.min.css')
import('../node_modules/material-icons/iconfont/material-icons.css')

Vue.use(Vuetify)
Vue.use(VueNativeSock, 'ws://localhost:8001', {store: store})
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
