<template>
  <div class="wrapper">
    <main v-bind:style="{'grid-template-areas': this.$store.state.layout}">
      <Block 
        v-for="item in layout" 
        :key="item.id"
        :class="item.name + '-container'"
        :name="item.name"
        :item="item"
        :style="getStyles(item)">
        </Block>
        
      <OptionsButton></OptionsButton>
    </main>
  </div>
</template>

<script>
import components from './components'
import Block from './block/Block'
import OptionsButton from './block/OptionsButton'
let id = 0;
const layout = Object.keys(components).map((name) => ({id: id++, name, ...components[name].defaults, ...components[name]}))

export default {
  name: 'dashboard',
  components: {
    ...components,
    Block, OptionsButton
  },
  defaultLayout: '"countdown . weather" ". clock ." ". . ."',
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
