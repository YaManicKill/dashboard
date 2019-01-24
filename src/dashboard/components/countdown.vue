<template>
  <div class="countdown">
    <span v-if="date">{{ daysUntil }} days left</span>
    <span v-if="!date">No date set for countdown</span>
  </div>
</template>

<script>

export default {
  name: 'countdown',
  options () {
    return [
      {
        name: "date",
        type: "date",
        label: "Date"
      },
      {
        name: "inclusive",
        type: "checkbox",
        label: "Include Start/End Day"
      },
      {
        name: "week only",
        type: "checkbox",
        label: "Exclude Weekends"
      }
    ]
  },
  data () {
    return {
      today: new Date()
    }
  },
  computed: {
      date: function () {return this.userData.date},
      weekOnly: function () {return this.userData.weekOnly === "true"},
      inclusive: function () {return this.userData.inclusive === "true"},
      future: function () {return new Date(this.date)},
      days: function () {return Math.round((this.future-this.today)/(1000*60*60*24)) },
      weeks: function() {return this.days / 7},
      weekendDays: function() {return Math.round(this.weeks * 2)},
      weekDays: function() {return this.weekOnly ? this.days - this.weekendDays : this.days},
      daysUntil: function() {return this.inclusive ? this.weekDays : this.weekDays - 2}
  },
  created: function created() {
    const that = this;
    this.dayChecker = setInterval(function ticker() {
      that.today = new Date();
    }, 60000);
  },
  props: {
    userData: Object
  }
}
</script>

<style scoped>
.countdown {
  font-size: 2rem;
  align-self: start;
  justify-self: start;
}
</style>
