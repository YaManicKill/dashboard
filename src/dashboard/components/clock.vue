<template>
  <div>
    <span class="clock">{{ displayTime }}</span>
  </div>
</template>

<script>

function padTime(time) {
  return String(time).padStart(2, "0")
}

export default {
  name: 'clock',
  data () {
    return {
      time: new Date()
    }
  },
  computed: {
      minutes: function () { return padTime(this.time.getMinutes()) },
      hours: function () { return padTime(this.time.getHours()) },

      date: function () { return padTime(this.time.getDay()) },
      month: function () { return padTime(this.time.getMonth() + 1) },
      year: function () { return this.time.getFullYear() },

      displayTime: function () { return `${this.hours}:${this.minutes}` },
      displayDate: function () { return `${this.date} ${this.month} ${this.year}`}
  },
  created: function created() {
    const that = this;
    this.ticker = setInterval(function ticker() {
      that.time = new Date();
    }, 10000);
  }
}
</script>

<style scoped>
.clock {
  font-size: 8rem;
}
</style>
