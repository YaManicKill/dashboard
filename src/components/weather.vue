<template>
  <parent>
    <div>
      {{ weather.currently.summary }}
    </div>
  </parent>
</template>

<script>

import parent from './component.vue';

function updateWeather() {
  fetch('http://localhost:8081/weather')
    .then((res) => res.json())
    .then((weather) => this.weather = weather);
}

export default {
  extends: parent,
  name: 'weather',
  components: {
    parent
  },
  data () {
    return {
      weather: {
        currently: {
          summary: "Loading"
        }
      }
    }
  },
  created: function created() {
    updateWeather.bind(this)();
    this.updater = setInterval(updateWeather.bind(this), 1000 * 60 * 10);
  }
}
</script>