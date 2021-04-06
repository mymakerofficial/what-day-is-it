<template>
  <div>
    <div class="header">
      <div class="headerTitle">the day forecast:</div>
    </div>
    <div class="dayBody">
      <div class="forecastTable">
        <div class="row" v-for="day in this.days" :key="day.date.getTime()">
          <a :href="day.path"><div class="col date">{{`${day.date.toLocaleDateString("de-de")}`}}</div><th class="col title" :style="{ backgroundColor: day.colorHsl, color: day.colorHslInverted }">{{ day.titleStriped !== "" ? day.titleStriped : "n/a" }}</th><th class="col text">{{ day.textStriped !== "" ? day.textStriped : "n/a" }}</th></a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import {Day} from "../js/day";

export default {
  name: "Forecast",

  data() {
    return {
      setDay: false,
      year: undefined,
      month: undefined,
      day: undefined,
      data: {"days": [],"any":[]},
      date: new Date(),
      days: []
    }
  },

  methods: {
    start: function () {

      //is specific day selected
      this.setDay = this.year !== undefined && this.month !== undefined && this.day !== undefined

      //get start of day
      if(!this.setDay){
        let date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth()+1
        this.day = date.getDate()
      }

      //get date
      if(this.year !== undefined && this.month !== undefined && this.day !== undefined) this.date = new Date(this.year, this.month-1, this.day, 0, 0, 0, 0);

      for(let i = 0;i < process.env.VUE_APP_FORECAST_DEFAULT_LENGHT;i++){
        let newDate = new Date(this.date.getTime() + 86400000 * i)
        let newDay = new Day(newDate, this.data)
        this.days.push(newDay)
      }
    },
    loadData(){
      // load day text database
      axios.get(`/data/days.json`).then(response => {
        this.data = response.data
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