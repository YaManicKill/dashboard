<template>
  <div class="wrapper">
    <top name="McDashboard"></top>
    <main>
    
    </main>
    <bottom></bottom>
  </div>
</template>

<script>
import top from './structure/top.vue'
import bottom from './structure/bottom.vue'

export default {
  name: 'app',
  components: {
    top, bottom
  }
}
</script>

<style>
body {
  display: grid;
  grid-template-columns: 10vw 80vw 10vw;
  grid-template-areas: ". wrapper .";
  margin: 0;
}

.wrapper {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  grid-area: wrapper;
  display: grid;
  grid-template-rows: 10vh 80vh 10vh;
}

main {
  display: grid;
  grid-template-columns: calc(100%/3) calc(100%/3) calc(100%/3);
  grid-template-rows: calc(100%/3) calc(100%/3) calc(100%/3);
  grid-template-areas: ". . ." ". clock ." ". . .";
}

</style>
