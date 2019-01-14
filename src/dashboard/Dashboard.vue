<template>
  <div class="wrapper">
    <main v-bind:style="{'grid-template-areas': this.$store.state.layout}">
      <parent 
        v-for="item in layout" 
        :key="item.id"
        :class="item.name + '-container'"
        :name="item.name"
        :style="getStyles(item)">
        <div :is="item.name"
          :baseUrl="baseUrl"></div>
        </parent>
    </main>
  </div>
</template>

<script>
import components from './components/index.js'
import parent from './components/parent'

let baseUrl = "/";

if (window.chrome && window.chrome.runtime && window.chrome.storage) {
  // If we are in the chrome extension, we can't get the data from the server in /, we need a base URL, which is set in localstorage settings
  baseUrl = JSON.parse(localStorage.getItem("url") || `"${baseUrl}"`);
}

let id = 0;
const layout = Object.keys(components).map((name) => ({id: id++, name, ...components[name].defaults}))

components['parent'] = parent;

export default {
  name: 'dashboard',
  components,
  defaultLayout: '"countdown . weather" ". clock ." ". . ."',
  data() {
    return {
      baseUrl,
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
  --columns: 3;
  --rows: 3;

  --column-width: calc((100vw - calc(var(--columns) * 1vw)) / var(--columns));
  --row-width: calc((100vh - calc(var(--rows) * 1vh)) / var(--rows));

  display: grid;
  padding: 0.5vw;
  grid-template-columns: repeat(var(--columns), var(--column-width));
  grid-column-gap: 1vw;
  grid-template-rows: repeat(var(--rows), var(--row-width));
  grid-row-gap: 1vh;
}

</style>
