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
  let domain;
  if (location.protocol === "chrome-extension:") {
    domain = window.VAR_DOMAIN;
  }
  fetch(domain ? `${domain}/weather` : '/weather')
    .then((res) => res.json())
    .then((weather) => this.weather = weather);
}

export default {
  name: 'weather',
  components: {
    WeatherIcon
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
.weather {
  font-size: 2rem;
  align-self: start;
  justify-self: end;
  margin-top: 1rem;
  margin-right: 1rem;
}
</style>
