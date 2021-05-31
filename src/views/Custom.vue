<template>
  <div>
    <Header :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="day.title" :backgroundColor="this.day.color.hsl" :textColor="this.day.color.hslInverted"></Header>
    <Body :text="day.text" :textColorLight="this.day.color.hslSecondaryLight" :textColorDark="this.day.color.hslSecondaryDark" center="true"></Body>
    <ThemeSwitcher></ThemeSwitcher>
    <Footer :navButtons="navButtons" text="This is a custom day and was not made by the creators of this website."></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Body from "../components/Body";
import axios from "axios";
import {Day} from "../js/day";
import {Random} from "../js/random";
import {stripHtml} from "string-strip-html";
import Footer from "../components/Footer";
import ThemeSwitcher from "../components/ThemeSwitcher";
import {Color} from "../js/color";
import {getDateFromDate} from "../js/date";

export default {
name: "Custom",
  components: {ThemeSwitcher, Footer, Body, Header},

  data() {
    return {
      headerTitle: "what's the day?",
      headerSubtitle: null,
      data: {"days": [],"any":[]},
      day: new Day(),
      date: new Date()
    }
  },

  computed: {
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "custom day", path: "/custom", display: true},
        {text: "about", path: "/about", display: true}
      ]
    }
  },

  methods: {
    start: function () {
      // get data
      let data = JSON.parse(atob(decodeURIComponent(this.$route.params.data)))
      let dataTitle = data.a
      let dataText = data.b
      let seed = data.s

      // set day
      this.day._data = this.data
      this.day.date = this.date

      this.day.random = Random(seed)

      /*
      if(dataTitle !== undefined) {
        this.day.title = (!dataTitle.match("[#|*|{}]") ? "# " : "") + stripHtml(dataTitle).result
      }
       */
      this.day.title = stripHtml(dataTitle).result
      this.day.text = stripHtml(dataText).result

      this.day.color.originalHue = this.day.random * 360

      this.day.createKeywords()
      this.day.replaceKeywords()
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
  }
}
</script>

<style scoped>

</style>