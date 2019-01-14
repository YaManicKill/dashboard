<template><component :is="currentView"></component>
</template>

<script>
import Dashboard from './dashboard/Dashboard.vue'
import Options from './options/Options.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/index.html', component: Dashboard },
  { path: '/options', component: Options },
  { path: '/index.html#/options', component: Options },
  { path: '*', component: Dashboard }
];

export default {
  name: 'router-view',  
  data() {
    return {  
      currentView: {}  
    }
  },
  created() {
    this.currentView = routes.find(
      route => route.path === window.location.pathname + window.location.hash
    ).component;
  }
};
</script>