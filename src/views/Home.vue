<template>
  <transition name="slide">
    <div id="app">
      <Header ref="header" :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="currentDay.title" :backgroundColor="this.currentDay.color.hsl" :textColor="this.currentDay.color.hslInverted"></Header>
      <Body :text="currentDay.text" :textColorLight="this.currentDay.color.hslSecondaryLight" :textColorDark="this.currentDay.color.hslSecondaryDark" center="true"></Body>
      <div class="container thin center" v-if="this.currentDay.noData"><div class="toastTitle">So empty</div><div class="toastBody">It looks like there is no data this far back.</div></div>
      <div class="container thin center" v-if="this.currentDay.invalidDate"><div class="toastTitle">Invalid Date</div><div class="toastBody">This day does not exist.</div></div>
      <LoadingSpinner :show="loading"></LoadingSpinner>
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
import {getDate, getDateFromDate} from "../js/date";
import {Color} from "../js/color";
import {Random} from "../js/random";

export default {
  name: 'Home',
  components: {
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
      //start day
      this.currentDay.set(getDate(this.year, this.month, this.day), this.data)

      this.$store.commit('updateShareUrl', `https://day.maiker.de${this.currentDay.path}`)
    },
    offline: function () {
      this.currentDay = {
        title: `#### :mdi-cloud-off-outline: you are offline`,
        text: ` `,
        color: new Color(Math.round(Random(getDateFromDate(new Date()).getTime()) * 360))
      }
    },
    loadData(){
      // load day text database
      axios.get(`/data/days.json`).then(response => {
        this.data = response.data
        this.loading = false
        this.start()
      }).catch(error => {
        console.log(error)
        this.offline();
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