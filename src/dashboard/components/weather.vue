<template>
  <div class="weather">
    <weather-icon class="icon" :icon="icon" />
    <span> {{ weather.currently.summary }}</span>
  </div>
</template>

<script>

import WeatherIcon from 'vue-weathericons';

function getIcon(icon) {
  switch (icon) {    
      case 'error':
      case 'loading':
        return '';  // Don't set an icon when loading/error
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
  fetch(`https://api.darksky.net/forecast/${this.userData.key}/${this.userData.homeCoord}?units=uk2`)
    .then((res) => res.json())
    .then((weather) => this.weather = weather)
    .catch(() => this.weather = {currently: {summary: "Error with server", icon: "error"}});
}

export default {
  name: 'weather',
  components: {
    WeatherIcon
  },
  options () {
    return [
      {
        name: "key",
        type: "string",
        label: "Darksky Key"
      },
      {
        name: "homeCoord",
        type: "string",
        label: "Home coords"
      }
    ]
  },
  data () {
    return {
      weather: {
        currently: {
          summary: "Loading",
          icon: "loading"
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
  },
  props: {
    userData: Object
  }
}
</script>

<style scoped>
.weather {
  font-size: 2rem;
  align-self: start;
  justify-self: end;
}
</style>
