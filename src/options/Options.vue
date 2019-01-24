<template>
  <div class="wrapper">
    <main>
        <h1>McDash Options page</h1>

        <div class="layout">
          <textarea id="layout" type="text" v-model="layout"> </textarea>
        </div>

        <div v-if="this.$store.state.extension" class="extension">
          <!-- TODO: We want to be able to run purely extension client-side, so allow user to put their keys in here instead -->
          <p>You need to have a server set, to get certain information that we can't save locally.</p>
          <label>Server: </label>
          <input id="server" type="text" v-model="url" />
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
    const url = JSON.parse(localStorage.getItem("url") || "\"http://localhost:8081/\""); // TODO: Probably remove the default (or change it) for v1

    return {
      layout: this.$store.state.layout,
      url
    }
  },
  methods: {
    saveSettings: function () {
      if (this.$store.state.extension) {
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
                this.$store.commit("setUrl", url);
                log.log('Set the url.');
                window.chrome.runtime.sendMessage({message: "changeServer", url});
            } else {
                log.log("Permission wasn't granted for accessing url");
            }
        });
      }

      this.$store.commit("setLayout", this.layout);

      if (this.$store.state.extension) {
        window.location.href = "/index.html";
      } else {
        window.location.href = "/";
      }
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
