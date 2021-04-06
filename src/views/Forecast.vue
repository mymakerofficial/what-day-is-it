<template>
  <div>
    <Header :headerTitle="headerTitle"></Header>
    <div class="dayBody">
      <div class="forecastTable">
        <div class="row" v-for="day in this.days" :key="day.date.getTime()">
          <a :href="day.path"><div class="col date">{{`${day.date.toLocaleDateString("de-de")}`}}</div><div class="col title" :style="{ backgroundColor: day.colorHsl, color: day.colorHslInverted }">{{ day.titleStriped !== "" ? day.titleStriped : "n/a" }}</div><div class="col text">{{ day.textStriped }}</div></a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import {Day} from "../js/day";
import Header from "../components/Header";

export default {
  name: "Forecast",
  components: {Header},
  data() {
    return {
      setDay: false,
      year: undefined,
      month: undefined,
      day: undefined,
      data: {"days": [],"any":[]},
      headerTitle: "the day forecast",
      date: new Date(),
      days: []
    }
  },

  methods: {
    start: function () {

      console.log(this.$route)

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

      let length = process.env.VUE_APP_FORECAST_DEFAULT_LENGHT

      if(this.$route.query.length){
        if(this.$route.query.length > 0 && this.$route.query.length < 120) length = this.$route.query.length
      }

      for(let i = 0;i < length;i++){
        let newDate = new Date(this.date.getTime() + 86400000 * i)
        let newDay = new Day(newDate, this.data)
        this.days.push(newDay)
      }

      //set color
      //document.querySelector(':root').style.setProperty('--uiColorPrimary', this.days[0].colorHsl);
      //document.querySelector(':root').style.setProperty('--uiColorSecondary', this.days[0].colorHslInverted);
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