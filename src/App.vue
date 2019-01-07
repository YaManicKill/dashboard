<template>
  <div class="wrapper">
    <main>
      <component 
        v-for="item in layout" 
        :key="item.id" 
        :is="item.name" 
        :style="getStyles(item)"></component>
    </main>
  </div>
</template>

<script>
import components from './components/index.js'

let id = 0;
const layout = Object.keys(components).map((name) => ({id: id++, name, ...components[name].defaults}))

export default {
  name: 'app',
  components,
  data() {
    return {
      layout,
      getStyles: (item) => {
        const styles = {};
        if (item.height > 1) {
          styles["grid-row-end"] = `span ${item.height}`;
        }
        if (item.width > 1) {
          styles["grid-column-end"] = `span ${item.width}`;
        }

        return styles;
      }
    }
  } 
}
</script>

<style>
body {
  margin: 0;
  background-image: url("https://source.unsplash.com/user/jasperboer/1920x1024/daily");
  background-position: center center;
  background-repeat: no-repeat;
}

.wrapper {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;

  display: grid;
  grid-template-rows: 100vh;
}

main {
  display: grid;
  padding-left: 0.5vw;
  grid-template-columns: repeat(4, calc((100vw - 4vw) / 4));
  grid-column-gap: 1vw;
  grid-template-rows: repeat(4, calc((100vh - 4vh) / 4));
  grid-row-gap: 1vh;
  grid-template-areas: ". . ." ". clock ." ". . .";
}

</style>
