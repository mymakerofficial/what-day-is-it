<template>
  <div>
    <Header :headerTitle="headerTitle" :title="title" :style="{ backgroundColor: this.currentDay.colorHsl, color: this.currentDay.colorHslInverted }"></Header>
    <Body :text="text" :navButtons="navButtons"></Body>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Body from "../components/Body";
import axios from "axios";
import Footer from "../components/Footer";
import {Day} from "../js/day";

export default {
  name: "About",
  components: {Footer, Body, Header},

  data() {
    return {
      headerTitle: "about this",
      title: '#### A website that **maybe** tells you what day it is.',
      text: '',
      data: {"days": [],"any":[]},
      date: new Date(),
      currentDay: new Day(),
    }
  },

  computed: {
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "custom day", path: "/custom", display: true}
      ]
    }
  },

  methods: {
    start: function () {
      //get start of day
      if(process.env.VUE_APP_ALWAYS_USE_START_OF_DAY === "true" && !this.setDay){
        let date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth()+1
        this.day = date.getDate()
      }

      //get date
      if(this.year !== undefined && this.month !== undefined && this.day !== undefined) this.date = new Date(this.year, this.month-1, this.day, 0, 0, 0, 0);


      //start day
      this.currentDay.set(this.date, this.data)
    },
    loadData(){
      // load day text database
      axios.get(`/data/about.md`).then(response => {
        this.text = response.data
        axios.get(`/data/days.json`).then(response => {
          this.data = response.data
          this.start()
        }).catch(error => {
          console.log(error)
        })
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