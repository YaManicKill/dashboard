import View from './View.vue';
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Dashboard from './dashboard/Dashboard.vue'
import './registerServiceWorker'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    layout: Dashboard.defaultLayout,
    extension: location.protocol === "chrome-extension:"
  },
  mutations: {
    setLayout (state, layout) {
      state.layout = layout;
    }
  }
})

new Vue({
  render: h => h(View),
  store
}).$mount('#app')
