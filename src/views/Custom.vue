<template>
  <div>
    <Header :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="day.title" :backgroundColor="this.day.color.hsl" :textColor="this.day.color.hslInverted"></Header>
    <Body :text="day.text" :textColor="this.day.color.hslSecondary" center="true"></Body>
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

export default {
name: "Custom",
  components: {Footer, Body, Header},

  data() {
    return {
      headerTitle: "what's the day?",
      headerSubtitle: null,
      data: {"days": [],"any":[]},
      day: new Day()
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
      let data = JSON.parse(atob(this.$route.params.data))
      let dataTitle = data.a
      let dataText = data.b
      let seed = data.s

      // set day
      this.day._data = this.data
      this.day.date = this.date

      this.day.random = Random(seed)

      if(dataTitle !== undefined) {
        this.day.title = (!dataTitle.match("[#|*|{}]") ? "# " : "") + stripHtml(dataTitle).result
      }
      this.day.text = stripHtml(dataText).result

      this.day.color.originalHue = this.day.random * 360

      this.day.createKeywords()
      this.day.replaceKeywords()
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