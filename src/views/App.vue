<template>
  <div id="app">
    <Header></Header>
    <DayContainer :title="day.title" :text="day.text"></DayContainer>
  </div>
</template>

<script>
import DayContainer from "@/components/DayContainer";
import Header from "@/components/Header";
import axios from "axios";
const replaceString = require('replace-string');
const stringHash = require("string-hash");

export default {
  name: 'App',
  components: {
    Header,
    DayContainer,
  },

  data() {
    return {
      random: 0,
      data: {"days": [],"any":[]},
      dayTextList: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      keywords: [{scope:"test",replace:"test"}],
      day: {
        "title":"# {{current_day_text}}",
        "text":"> loading...",
        "author":"My_Maker"
      }
    }
  },

  methods: {
    start(){
      this.generateRandom()
      this.generateKeywords()

      if(!Math.round(this.random*1.2)){
        let list = this.data.days[new Date().getDay()]
        this.day = list[Math.floor(this.random*list.length)]
      }else{
        this.day = this.data.any[Math.floor(this.random*this.data.any.length)]
      }

      // replace null
      if(this.day.title == null) this.day.title = `# {{current_day_text}}`
      if(this.day.text == null) this.day.text = ""

      // replace keywords
      this.keywords.forEach((v) => {
        this.day.title = replaceString(this.day.title, `{{${v.scope}}}`, v.replace)
        this.day.text = replaceString(this.day.text, `{{${v.scope}}}`, v.replace);
      })
    },
    generateKeywords() {
      this.keywords.push({scope: "current_day_text",replace: this.dayTextList[new Date().getDay()]})
    },
    generateRandom() {
      let date = new Date()
      let time = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
      time = `${Math.floor(date.getTime() / 30000)}`
      let random = stringHash(time) / 4294967295 // hash time and make it a value between 0 and 1
      console.log(time, random)
      this.random = random
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