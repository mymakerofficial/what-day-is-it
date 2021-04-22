<template>
  <div id="app">
    <Header :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="currentDay.title" :style="{ backgroundColor: this.currentDay.color.hsl, color: this.currentDay.color.hslInverted }"></Header>
    <Body :text="currentDay.text" :style="{ color: this.currentDay.color.hslSecondary }"></Body>
    <Footer :navButtons="navButtons" :text="footerText"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Body from "@/components/Body";
import axios from "axios";
import {Day, isSameDay} from "../js/day";
import Footer from "../components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    Body
  },

  props: ["year","month", "day"],

  data() {
    return {
      setDay: false,
      data: {"days": [],"any":[]},
      date: new Date(),
      headerTitle: "what's the day?",
      headerSubtitle: null,
      currentDay: new Day()
    }
  },

  computed: {
    detailsPath: function () {
      return this.currentDay.path + "/details"
    },
    footerText: function () {
      return this.currentDay.hasAuthor ? `this day was brought to you by <b>${this.currentDay.authors.join(", ")}</b>` : null
    },
    navButtons: function () {
      return [
        {text: "today", path: "/", display: !isSameDay(this.currentDay.date, new Date())},
        {text: "day details", path: this.detailsPath, display: true},
        {text: "day forecast", path: "/forecast", display: true},
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
      if(process.env.VUE_APP_ALWAYS_USE_START_OF_DAY === "true" && !this.setDay){
        let date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth()+1
        this.day = date.getDate()
      }

      //get date
      if(this.year !== undefined && this.month !== undefined && this.day !== undefined) this.date = new Date(this.year, this.month-1, this.day, 0, 0, 0, 0);

      //change header
      if(this.setDay) {
        this.headerSubtitle = this.date.toLocaleDateString("de-de")
      }

      //start day
      this.currentDay.set(this.date, this.data)
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