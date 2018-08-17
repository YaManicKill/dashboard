<template>
  <parent rows="2">
    <div slot>
      <ul>
        <li v-for="item in Array(100).fill(i++)" v-bind:key="item">{{ item }}</li>
      </ul>
    </div>
  </parent>
</template>

<script>
  
import parent from './component.vue';

export default {
  extends: parent,
  name: 'list',
  components: {
    parent
  },
  data () {
    return {
      time: new Date()
    }
  },
}
</script>
