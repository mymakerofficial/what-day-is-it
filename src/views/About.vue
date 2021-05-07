<template>
  <div>
    <Header :headerTitle="headerTitle" :title="title" :backgroundColor="this.currentDay.color.hsl" :textColor="this.currentDay.color.hslInverted"></Header>
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
      //start day
      this.currentDay.set(new Date(), this.data)
    },
    loadData(){
      // load about text
      axios.get(`/data/about.md`).then(response => {
        this.text = response.data
        //load days
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