<template>
  <div>
    <Header :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="day.title"></Header>
    <Body :text="day.text"></Body>
  </div>
</template>

<script>
import Header from "../components/Header";
import Body from "../components/Body";
import axios from "axios";
import {Day} from "../js/day";
import {Random} from "../js/random";
import {stripHtml} from "string-strip-html";

export default {
name: "Custom",
  components: {Body, Header},

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

  methods: {
    start: function () {
      console.log(this.$route)

      //is specific day selected
      this.setDay = this.$route.params.year !== undefined && this.$route.params.month !== undefined && this.$route.params.day !== undefined

      //get date
      if(this.$route.params.year !== undefined && this.$route.params.month !== undefined && this.$route.params.day !== undefined) this.date = new Date(parseInt(this.$route.params.year), parseInt(this.$route.params.month)-1, parseInt(this.$route.params.day), 0, 0, 0, 0);

      //change header
      if(this.setDay) {
        this.headerSubtitle = this.date.toLocaleDateString("de-de")
      }

      // set day
      this.day._data = this.data
      this.day.date = this.date

      this.day.random = Random(`${this.$route.params.title}${this.$route.params.text}`)

      if(this.$route.params.title !== undefined) {
        let titleContainsMarkdown = this.$route.params.title.split("").map((t) => ["#","*"].includes(t)).includes(true)
        this.day.title = (!titleContainsMarkdown ? "# " : "") + stripHtml(this.$route.params.title).result
      }
      if(this.$route.params.text !== undefined) this.day.text = stripHtml(this.$route.params.text).result

      this.day.createKeywords()
      this.day.replaceKeywords()

      console.log(this.day)

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

<style scoped>

</style>