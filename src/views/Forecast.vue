<template>
  <div>
    <Header :headerTitle="headerTitle"></Header>
    <LoadingSpinner :show="loading"></LoadingSpinner>
    <div class="forecastContainer">
      <div class="forecastTable" ref="table">
        <div class="row" v-for="day in this.days" :key="day.date.getTime()">
          <a :href="day.date - date !== 0 ? day.path : '/'"><div class="col date">{{`${day.date.toLocaleDateString("de-de")}`}}</div><div class="col title" :style="{ backgroundColor: day.color.hsl, color: day.color.hslInverted }">{{day.titleStriped}}<span class="badge border" :style="{display: day.titleStriped === '' ? '' : 'none', color: day.color.hslInverted}">can't be displayed</span></div><div class="col text">{{ day.textStriped }}<span class="badge" :style="{display: day.textEmptyStriped ? '' : 'none'}">can't be displayed</span></div></a>
        </div>
      </div>
    </div>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import axios from "axios";
import {Day} from "../js/day";
import Header from "../components/Header";
import anime from "animejs";
import Footer from "../components/Footer";

export default {
  name: "Forecast",
  components: {Footer, Header},
  data() {
    return {
      loading: true,
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
        if(this.$route.query.length > 0 && this.$route.query.length <= 300) length = this.$route.query.length
      }

      for(let i = 0;i < length;i++){
        let newDate = new Date(this.date.getTime() + 86400000 * i)
        let newDay = new Day(newDate, this.data)
        this.days.push(newDay)
      }

      //set color
      //document.querySelector(':root').style.setProperty('--uiColorPrimary', this.days[0].colorHsl);
      //document.querySelector(':root').style.setProperty('--uiColorSecondary', this.days[0].colorHslInverted);

      this.loading = false;

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

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadData()
    })
  },

  beforeRouteUpdate(to, from, next) {
    this.loadData()
    next()
  }

}
</script>

<style scoped>

</style>