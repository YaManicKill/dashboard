<template>
  <parent v-bind="$props">
    <div slot>
      <ul>
        <li v-for="(item, index) in Array(100).fill('test')" v-bind:key="index">{{ item }}-{{ index }}</li>
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
      time: new Date(),
      i: 0
    }
  },
  defaultProps: {
    rows: 5
  }
}
</script>
