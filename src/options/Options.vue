<template>
  <div class="wrapper">
    <main>
      <h1>McDash Options page</h1>

      <!-- TODO: We want to be able to run purely extension client-side, so allow user to put their keys in here instead -->
      <p>You need to have a server set, to get certain information that we can't save locally.</p>
      <label>Server: </label>
      <input id="server" type="text" v-model="url" />
      <button id="permissions" v-on:click="updateServer">Save server</button>
    </main>
  </div>
</template>

<script>
export default {  
  name: 'app',
  data() {
    const url = JSON.parse(localStorage.getItem("url") || "\"http://localhost:8081/\""); // TODO: Probably remove the default (or change it) for v1

    return {
      url
    }
  },
  methods: {
    updateServer: function () {
      let url = this.url;
      const log = console;
      if (!url.endsWith("/")) {
          url += "/";
      }
      window.chrome.permissions.request({
          permissions: ['tabs'],
          origins: [url]
      }, function(granted) {
          if (granted) {
              localStorage.setItem("url", JSON.stringify(url))
              log.log('Set the url.');
              window.chrome.runtime.sendMessage({message: "changeServer", url});
          } else {
              log.log("boo");
          }
      });
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
</style>
