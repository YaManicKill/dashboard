<template><component :is="currentView"></component>
</template>

<script>
import App from './App.vue'
import Options from './options/Options.vue'

const routes = [
  { path: '/', component: App },
  { path: '/index.html', component: App },
  { path: '/options', component: Options },
  { path: '/index.html#/options', component: Options },
  { path: '*', component: App }
];

export default {
  name: 'router-view',  
  data() {  
    return {  
      currentView: {}  
    }
  },
  created() {
    console.log(window.location.pathname);
    console.log(window.location.hash);
    this.currentView = routes.find(
      route => route.path === window.location.pathname + window.location.hash
    ).component;
  }
};
</script>