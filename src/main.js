import View from './View.vue';
import Vue from 'vue'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  render: h => h(View)
}).$mount('#app')
