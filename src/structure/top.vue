<template>
  <header>
    <div class="title">{{ name }}</div>
  </header>
</template>

<script>
export default {
  name: 'top',
  props: {
    name: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  display: grid;
  padding-top: 10px;
  grid-template-columns: 30vw;
}
</style>
