<template>
  <div>
    <Header :headerTitle="headerTitle"></Header>
    <LoadingSpinner :show="loading"></LoadingSpinner>
    <div class="forecastContainer">
      <div class="forecastTable" ref="table">
        <div class="row" v-for="day in this.days" :key="day.date.getTime()">
          <a :href="day.date - date !== 0 ? day.path : '/'"><div class="col date">{{`${day.date.toLocaleDateString("de-de")}`}}</div><div class="col title" :style="{ backgroundColor: day.color.hsl, color: day.color.hslInverted }">{{day.titleStriped}}<span class="badge border" :style="{display: day.titleEmptyStriped ? '' : 'none', color: day.color.hslInverted}">can't be displayed</span></div><div class="col text">{{ day.textStriped }}<span class="badge" :style="{display: day.textEmptyStriped ? '' : 'none'}">can't be displayed</span></div></a>
        </div>
      </div>
    </div>
    <div class="container center" v-if="oops">
      <div class="alert"><b>oops!</b> Something went wrong, no forecast today. :(</div>
    </div>
    <ThemeSwitcher></ThemeSwitcher>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import axios from "axios";
import {Day} from "../js/day";
import Header from "../components/Header";
import anime from "animejs";
import Footer from "../components/Footer";
import {getDateFromDate} from "../js/date";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default {
  name: "Forecast",
  components: {ThemeSwitcher, Footer, Header},
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
      days: [],
      oops: false
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
      try{
        this.date = getDateFromDate(new Date())

        let length = process.env.VUE_APP_FORECAST_DEFAULT_LENGHT

        if(this.$route.query.length){
          if(this.$route.query.length > 0 && this.$route.query.length <= 300) length = this.$route.query.length
        }

        // TODO this lags when the length is to long
        for(let i = 0;i < length;i++){
          let newDate = new Date(this.date.getTime() + 86400000 * i)
          let newDay = new Day(newDate, this.data)
          this.days.push(newDay)
        }

        this.loading = false;

        this.animate()
      }
      catch(err) {
        console.error(err)
        this.oops = true
      }
      console.log(this.days[4].textStriped)
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