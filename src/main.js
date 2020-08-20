import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'

Vue.config.productionTip = false
Vue.prototype.$socket = io('https://20efbc397e62.ngrok.io')

new Vue({
  render: h => h(App),
}).$mount('#app')
