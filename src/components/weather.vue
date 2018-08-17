<template>
  <parent>
    <div>
      <weather-icon class="icon" :icon="icon" />
      <span> {{ weather.currently.summary }}</span>
    </div>
  </parent>
</template>

<script>

import parent from './component.vue';
import WeatherIcon from 'vue-weathericons';

function getIcon(icon) {
  switch (icon) {      
    case 'clear-day':
        return 'day-sunny'
      case 'clear-night':
        return 'night-clear'
      case 'rain':
        return 'rain'
      case 'snow':
      case 'sleet':
        return 'snow'
      case 'wind':
        return 'cloudy-windy'
      case 'fog':
        return 'fog'
      case 'cloudy':
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
      default:
        return 'cloud'
  }
}

function updateWeather() {
  fetch('http://localhost:8081/weather')
    .then((res) => res.json())
    .then((weather) => this.weather = weather);
}

export default {
  extends: parent,
  name: 'weather',
  components: {
    parent, WeatherIcon
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
  computed: {
    icon: function () {return getIcon(this.weather.currently.icon)}
  },
  created: function created() {
    updateWeather.bind(this)();
    this.updater = setInterval(updateWeather.bind(this), 1000 * 60 * 10);
  }
}
</script>

<style scoped>
.wi {
  font-size: 2em;
}
span {

  font-size: 2em;
}

</style>
