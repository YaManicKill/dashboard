<template>
  <div class="countdown">
    <span>{{ workDays }} workdays left on current project</span>
  </div>
</template>

<script>

export default {
  name: 'countdown',
  data () {
    return {
      today: new Date(),
      future: new Date("2019-03-04")
    }
  },
  computed: {
      days: function () {return Math.round((this.future-this.today)/(1000*60*60*24)) },
      weeks: function() {return this.days / 7},
      weekendDays: function() {return Math.round(this.weeks * 2)},
      weekDays: function() {return this.days - this.weekendDays},
      workDays: function() {return this.weekDays - 4}
  },
  created: function created() {
    const that = this;
    this.dayChecker = setInterval(function ticker() {
      that.today = new Date();
    }, 60000);
  }
}
</script>

<style scoped>
.countdown {
  font-size: 2rem;
  align-self: start;
  justify-self: start;
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>
