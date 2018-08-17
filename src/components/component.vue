<template>
  <article v-bind:style="styles">
    <h1 v-if="title">{{ title }}</h1>
    <div><slot></slot></div>
  </article>
</template>

<script>
export default {
  name: 'parent',
  props: {
    title: String,
    rows: Number
  },
  computed: {
    styles: function () {
      const styles = {};
      if (this.rows) {
        styles["grid-row-end"] = `span ${this.rows}`;
      }
      return styles;
    }
  }
}
</script>

<style scoped>
article{
  overflow-y: auto;
}
</style>
