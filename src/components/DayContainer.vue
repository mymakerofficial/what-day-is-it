<template>
  <div class="dayContainer"  v-html="dayHTML"></div>
</template>

<script>

import axios from 'axios'
const marked = require("marked");

export default {
  name: "DayContainer",

  data() {
    return {
      days: [],
      dayText: "# *Monday*\n > mano fuente mas democracia fútbol cerebro",
    }
  },

  computed: {
    currentDayTexts: function () {
      return this.days[new Date().getDay()]
    },
    dayHTML: function () {
      return marked(this.dayText)
    },
  },

  methods: {
    start(){
      this.dayText = this.currentDayTexts[Math.random()*this.currentDayTexts.length]
    },
    loadData(){
      axios.get(`/data/days.json`).then(response => {
        this.days = response.data.days
        this.start()
      }).catch(error => {
        console.log(error)
      })
    },
  },

  created() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>