<template>
  <div id="app">
    <Header :text="headerText"></Header>
    <DayContainer :title="day.title" :text="day.text"></DayContainer>
  </div>
</template>

<script>
import DayContainer from "@/components/DayContainer";
import Header from "@/components/Header";
import axios from "axios";
import {Day} from "../js/day";

export default {
  name: 'App',
  components: {
    Header,
    DayContainer,
  },

  data() {
    return {
      data: {"days": [],"any":[]},
      dayTextList: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      headerText: "what's the day?",
      day: new Day()
    }
  },

  methods: {
    start: function () {
      this.day.set(new Date(), this.data)

      //set color
      document.querySelector(':root').style.setProperty('--uiColorPrimary', this.day.colorHsl);
      document.querySelector(':root').style.setProperty('--uiColorSecondary', this.day.colorHslInverted);
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

<style lang="scss">
@import "@/sass/app.scss";
</style>