<template>
  <div class="wrapper">
    <main>
        <h1>McDash Options page</h1>

        <div class="layout">
          <textarea id="layout" type="text" v-model="layout"> </textarea>
        </div>
        <div class="save">
        <button id="permissions" v-on:click="saveSettings">Save settings</button>
        </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'options',
  data() {

    return {
      layout: this.$store.state.layout
    }
  },
  methods: {
    saveSettings: function () {
      this.$store.commit("setLayout", this.layout);
      window.location.href = "/index.html";
    }
  }
}
</script>

<style scoped>

main {
  --columns: 4;
  --rows: 4;
}

h1 {
  grid-area: 1 / 1 / span 1 / span 2;
}

.extension {
  grid-area: 1 / 4;
}

.layout {
  grid-area: 2 / 1;
  align-self: start;
  justify-self: start;
  width: 100%;
  height: 100%;
}

.layout textarea {
  width: 100%;
  height: 100%;
}

.save {
  grid-area: 4 / 1;
  align-self: center;
  justify-self: center;
}
</style>
