<template>
  <div>
    <Header :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="day.title" :backgroundColor="this.day.color.hsl" :textColor="this.day.color.hslInverted"></Header>
    <Body :text="day.text" :textColor="this.day.color.hslInverted" center="true"></Body>
    <Footer :navButtons="navButtons"></Footer>
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
      setDay: false,
      date: new Date(),
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
      /*
      //is specific day selected
      this.setDay = this.$route.params.year !== undefined && this.$route.params.month !== undefined && this.$route.params.day !== undefined

      //get date
      if(this.$route.params.year !== undefined && this.$route.params.month !== undefined && this.$route.params.day !== undefined) this.date = new Date(parseInt(this.$route.params.year), parseInt(this.$route.params.month)-1, parseInt(this.$route.params.day), 0, 0, 0, 0);

      //change header
      if(this.setDay) {
        this.headerSubtitle = this.date.toLocaleDateString("de-de")
      }

       */

      let data = JSON.parse(atob(this.$route.params.data))
      let dataTitle = data.a
      let dataText = data.b

      // set day
      this.day._data = this.data
      this.day.date = this.date

      this.day.random = Random(this.$route.params.data)

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