<template>
  <div class="options-button">
    <img src="/img/settings.svg" v-on:click="options">
  </div>
</template>

<script>
export default {
  name: 'OptionsButton',
  methods: {
    options: function() {
      this.onClick();
    }
  },
  props: {
    onClick: Function
  }
}
</script>

<style scoped>
.options-button {
  position: absolute;
  top: 0;
  right: 0;

  display: none;
}

article:hover .options-button {
  cursor: pointer;
  display: block;
}

.options-button:hover {
  cursor: pointer;
  display: block;
}

img {
  width: 1.5rem;
  height: 1.5rem;
  background: rgb(255, 255, 255, 75%);
  border-radius: 1.5rem;
  padding: 5px;
}
</style>
