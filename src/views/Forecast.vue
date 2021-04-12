<template>
  <div>
    <Header :headerTitle="headerTitle"></Header>
    <div class="dayBody">
      <div class="forecastTable" ref="table">
        <div class="row" v-for="day in this.days" :key="day.date.getTime()">
          <a :href="day.date - date !== 0 ? day.path : '/'"><div class="col date">{{`${day.date.toLocaleDateString("de-de")}`}}</div><div class="col title" :style="{ backgroundColor: day.colorHsl, color: day.colorHslInverted }">{{ day.titleStriped !== "" ? day.titleStriped : "n/a" }}</div><div class="col text">{{ day.textStriped }}</div></a>
        </div>
      </div>
    </div>
    <DayFooter :navButtons="navButtons"></DayFooter>
  </div>
</template>

<script>
import axios from "axios";
import {Day} from "../js/day";
import Header from "../components/Header";
import anime from "animejs";
import DayFooter from "../components/Footer";

export default {
  name: "Forecast",
  components: {DayFooter, Header},
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

  computed: {
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "custom day", path: "/custom", display: true},
        {text: "about", path: "/about", display: true}
      ]
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

      this.animate()
    },
    animate() {
      this.$nextTick(function () {
        anime({
          targets: this.$refs.table.children,
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 500,
          delay: anime.stagger(40, {start: 100}),
          easing: 'easeOutElastic(.6, 1)',
          autostart: true,
        })
      });
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