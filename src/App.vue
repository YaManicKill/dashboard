<template>
  <div class="wrapper">
    <main>
      <clock />
      <list />
    </main>
  </div>
</template>

<script>
import clock from './components/clock'
import list from './components/long-list'

export default {
  name: 'app',
  components: {
    clock, list
  }
}
</script>

<style>
body {
  margin: 0;
}

.wrapper {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: grid;
  grid-template-rows: 100vh;
}

main {
  display: grid;
  padding-left: 0.5vw;
  grid-template-columns: repeat(4, calc((100vw - 4vw) / 4));
  grid-column-gap: 1vw;
  grid-template-rows: repeat(4, calc((100vh - 4vh) / 4));
  grid-row-gap: 1vw;
  grid-template-areas: ". . ." ". clock ." ". . .";
}

</style>
