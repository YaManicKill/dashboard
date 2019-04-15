import View from './View.vue';
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Dashboard from './dashboard/Dashboard.vue'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    layout: Dashboard.defaultLayout,
    components: {

    }
  },
  mutations: {
    setLayout (state, layout) {
      state.layout = layout;
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
