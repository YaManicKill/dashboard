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
    extension: location.protocol === "chrome-extension:",
    baseUrl: "/",
    components: {

    }
  },
  mutations: {
    setLayout (state, layout) {
      state.layout = layout;
    },
    setUrl (state, url) {
      state.url = url;
    },
    updateComponent (state, {name, options}) {
      state.components[name] = {
        ...state.components[name],
        ...options
      };
    }
  }
})

new Vue({
  render: h => h(View),
  store
}).$mount('#app')
