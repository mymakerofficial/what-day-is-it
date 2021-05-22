<template>
  <transition name="slide">
    <div id="app">
      <Header ref="header" :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="currentDay.title" :backgroundColor="this.currentDay.color.hsl" :textColor="this.currentDay.color.hslInverted"></Header>
      <Body :text="currentDay.text" :textColor="this.currentDay.color.hslSecondary" center="true"></Body>
      <LoadingSpinner :show="loading"></LoadingSpinner>
      <ThemeSwitcher></ThemeSwitcher>
      <Footer :navButtons="navButtons" :text="footerText"></Footer>
    </div>
  </transition>
</template>

<script>
import Header from "@/components/Header";
import Body from "@/components/Body";
import axios from "axios";
import {Day, isSameDay} from "../js/day";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import {getDate} from "../js/date";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default {
  name: 'App',
  components: {
    ThemeSwitcher,
    LoadingSpinner,
    Footer,
    Header,
    Body
  },

  props: ["year","month", "day"],

  data() {
    return {
      setDay: false,
      loading: true,
      data: {"days": [],"any":[]},
      date: new Date(),
      headerTitle: "what's the day?",
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
    },
    headerSubtitle: function () {
      if(this.currentDay.date) return this.currentDay.date.toLocaleDateString("de-de")
      return ""
    }
  },

  methods: {
    start: function () {

      //is specific day selected
      this.setDay = this.year !== undefined && this.month !== undefined && this.day !== undefined

      //start day
      this.currentDay.set(this.setDay ? getDate(this.year, this.month, this.day) : new Date(), this.data)
    },
    loadData(){
      // load day text database
      axios.get(`/data/days.json`).then(response => {
        this.data = response.data
        this.loading = false
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
  },
}
</script>

<style lang="scss">
@import "@/sass/app.scss";
</style>