<template>
  <article :style="{gridArea: name}">
    <OptionsButton v-bind="{onClick: showOptions}" v-if="options.length > 0"></OptionsButton>
    <div v-if="!optionsMode" :is="item.name" :userData="userData"></div>
    <OptionsCard v-if="optionsMode" v-bind="{options, onSubmit, userData}"></OptionsCard>
  </article>
</template>

<script>
import OptionsButton from './OptionsButton';
import OptionsCard from './OptionsCard';
import components from '../components'

export default {
  name: 'Block',
  data () {
    const userData = this.$store.state.components[this.item.name];
    return {
      optionsMode: false,
      userData: {
        weekOnly: false,
        inclusive: false,
        ...userData
      }
    }
  },
  computed: {
    options: function () {
      return this.item.options ? this.item.options() : []
    }
  },
  methods: {
    showOptions: function () {
      this.optionsMode = true
    },
    onSubmit: function (options) {
      if (options !== null) {
        this.$store.commit("updateComponent", {name: this.item.name, options});
        this.userData = Object.assign({}, this.userData, options);
      }
      this.optionsMode = false;
    }
  },
  props: {
    name: String,
    item: Object
  },
  components: {
    ...components,
    OptionsButton,
    OptionsCard
  }
}
</script>

<style scoped>
article {
  overflow-y: auto;
  display: grid;
  align-items: center;
  justify-items: center;
  position: relative;

  padding: 1.5rem;
}
</style>
