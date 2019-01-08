<template>
  <article :style="{gridArea: name}">
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: 'parent',
  props: {
    name: String
  }
}
</script>

<style scoped>
article {
  overflow-y: auto;
  display: grid;
  align-items: center;
  justify-items: center;
}
</style>
