<template>
  <article>
    <h1 v-if="title">{{ title }}</h1>
    <div><slot></slot></div>
  </article>
</template>

<script>
export default {
  name: 'parent',
  props: {
    title: String
  }
}
</script>

<style scoped>
article{
  overflow-y: auto;
  display: grid;
  align-content: center;
}
</style>
