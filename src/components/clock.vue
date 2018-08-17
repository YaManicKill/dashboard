<template>
  <parent v-bind="$props">
    <div slot>
    <span class="clock">{{ displayTime }}</span>
    <br />
    <span class="date">{{ displayDate }}</span>
    </div>
  </parent>
</template>

<script>
  
import parent from './component.vue';

function padTime(time) {
  return String(time).padStart(2, "0")
}

export default {
  extends: parent,
  name: 'clock',
  components: {
    parent
  },
  data () {
    return {
      time: new Date()
    }
  },
  computed: {
      seconds: function () { return padTime(this.time.getSeconds()) },
      minutes: function () { return padTime(this.time.getMinutes()) },
      hours: function () { return padTime(this.time.getHours()) },

      date: function () { return padTime(this.time.getDay()) },
      month: function () { return padTime(this.time.getMonth() + 1) },
      year: function () { return this.time.getFullYear() },

      displayTime: function () { return `${this.hours}:${this.minutes}:${this.seconds}` },
      displayDate: function () { return `${this.date} ${this.month} ${this.year}`}
  },
  created: function created() {
    const that = this;
    this.ticker = setInterval(function ticker() {
      that.time = new Date();
    }, 100);
  }
}
</script>

<style scoped>
.clock {
  font-size: 3em;
}
</style>
