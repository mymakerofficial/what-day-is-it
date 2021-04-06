<template>
  <div id="app">
    <Header :text="headerText" :title="currentDay.title"></Header>
    <Body :text="currentDay.text"></Body>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Body from "@/components/Body";
import axios from "axios";
import {Day} from "../js/day";

export default {
  name: 'App',
  components: {
    Header,
    Body
  },

  props: ["year","month", "day"],

  data() {
    return {
      data: {"days": [],"any":[]},
      date: new Date(),
      headerText: "what's the day?",
      currentDay: new Day()
    }
  },

  methods: {
    start: function () {
      if(this.year !== undefined && this.month !== undefined && this.day !== undefined) {
        this.date = new Date(this.year, this.month, this.day, 0, 0, 0, 0);
      }

      this.currentDay.set(this.date, this.data)

      //set color
      document.querySelector(':root').style.setProperty('--uiColorPrimary', this.currentDay.colorHsl);
      document.querySelector(':root').style.setProperty('--uiColorSecondary', this.currentDay.colorHslInverted);
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