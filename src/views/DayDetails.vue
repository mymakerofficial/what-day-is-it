<template>
  <div>
    <Header :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="title" :backgroundColor="this.currentDay.color.hsl" :textColor="this.currentDay.color.hslInverted"></Header>
    <div class="container">
      <h4>Properties</h4>
      <table style="width:100%">
        <thead>
          <tr>
            <th>property</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>title</b> (original)</td>
            <td>{{this.currentDay.dayData.title}}</td>
          </tr>
          <tr>
            <td><b>title</b> (Markdown)</td>
            <td>{{this.currentDay.title}}</td>
          </tr>
          <tr>
            <td><b>title</b> (HTML)</td>
            <td>{{this.currentDay.titleFormatted}}</td>
          </tr>
          <tr>
            <td><b>title</b> (stripped)</td>
            <td>{{this.currentDay.titleStriped}}</td>
          </tr>
          <tr>
            <td><b>text</b> (original)</td>
            <td>{{this.currentDay.dayData.text}}</td>
          </tr>
          <tr>
            <td><b>text</b> (Markdown)</td>
            <td>{{this.currentDay.text}}</td>
          </tr>
          <tr>
            <td><b>text</b> (HTML)</td>
            <td>{{this.currentDay.textFormatted}}</td>
          </tr>
          <tr>
            <td><b>text</b> (stripped)</td>
            <td>{{this.currentDay.textStriped}}</td>
          </tr>
          <tr>
            <td><b>author</b></td>
            <td>{{this.currentDay.author}}</td>
          </tr>
          <tr>
            <td><b>authors</b></td>
            <td>["{{this.currentDay.authors.join('", "')}}"]</td>
          </tr>
          <tr>
            <td><b>hasAuthor</b></td>
            <td>{{this.currentDay.hasAuthor}}</td>
          </tr>
          <tr>
            <td><b>titleEmptyStriped</b></td>
            <td>{{this.currentDay.titleEmptyStriped}}</td>
          </tr>
          <tr>
            <td><b>textEmptyStriped</b></td>
            <td>{{this.currentDay.textEmptyStriped}}</td>
          </tr>
          <tr>
            <td><b>weight</b></td>
            <td>{{this.currentDay.dayData.weight}}</td>
          </tr>
          <tr>
            <td><b>date</b></td>
            <td>{{this.currentDay.date}}</td>
          </tr>
          <tr>
            <td><b>dayIndex</b></td>
            <td>{{this.currentDay.dayIndex}}</td>
          </tr>
          <tr>
            <td><b>path</b></td>
            <td><a :href="this.currentDay.path">{{this.currentDay.path}}</a></td>
          </tr>
          <tr>
            <td><b>random</b></td>
            <td>{{this.currentDay.random}}</td>
          </tr>
        </tbody>
      </table>
      <h4>Colors</h4>
      <table style="width:100%">
        <thead>
          <tr>
            <th>property</th>
            <th>hue</th>
            <th>hsl</th>
            <th>hex</th>
            <th>color</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>original</b></td>
            <td>{{this.currentDay.color.originalHue}}</td>
            <td><span class="badge">n/a</span></td>
            <td><span class="badge">n/a</span></td>
            <td><span class="colorPreview" :style="{ backgroundColor: `hsl(${this.currentDay.color.originalHue},100%,50%)` }"></span></td>
          </tr>
          <tr>
            <td><b>color</b></td>
            <td>{{this.currentDay.color.hue}}</td>
            <td>{{this.currentDay.color.hsl}}</td>
            <td>{{this.currentDay.color.hex}}</td>
            <td><span class="colorPreview" :style="{ backgroundColor: this.currentDay.color.hsl }"></span></td>
          </tr>
          <tr>
            <td><b>color inverted</b></td>
            <td>{{this.currentDay.color.hueInverted}}</td>
            <td>{{this.currentDay.color.hslInverted}}</td>
            <td>{{this.currentDay.color.hexInverted}}</td>
            <td><span class="colorPreview" :style="{ backgroundColor: this.currentDay.color.hslInverted }"></span></td>
          </tr>
          <tr>
            <td><b>color secondary</b></td>
            <td>{{this.currentDay.color.hueSecondary}}</td>
            <td>{{this.currentDay.color.hslSecondary}}</td>
            <td>{{this.currentDay.color.hexSecondary}}</td>
            <td><span class="colorPreview" :style="{ backgroundColor: this.currentDay.color.hslSecondary }"></span></td>
          </tr>
        </tbody>
      </table>
      <h4>Keywords</h4>
      <table style="width:100%">
        <thead>
          <tr>
            <th>scope</th>
            <th>replace</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="keyword in this.currentDay.keywords" :key="keyword.scope">
            <td><b>{{`\u007B\u007B${keyword.scope}\u007D\u007D`}}</b></td>
            <td>{{keyword.replace}} <span v-if="findColor(keyword.replace) !== null" class="badge">colors found: <span v-for="color in findColor(keyword.replace)" :key="color"><span class="colorPreview" :style="{ backgroundColor: color }"></span></span></span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import axios from "axios";
import {Day} from "../js/day";
import Footer from "../components/Footer";
export default {
  name: "DayDetails",

  components: {Footer, Header},

  props: ["year","month", "day"],

  data() {
    return {
      headerTitle: "day details",
      headerSubtitle: null,
      title: "#### ***This is how we made this day!***",
      date: new Date(),
      currentDay: new Day()
    }
  },

  computed: {
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "go to day", path: this.currentDay.path, display: true},
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
    findColor(string){
      try {
        let colors = string.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)|(^(?:[0-9a-fA-F]{3}){1,2}$)/g)
        if(colors) colors = colors.map((c) =>  c.match(/^([0-9a-fA-F]{3}){1,2}$/g) ? `#${c}` : c)
        return colors;
      }
      catch (e) {
        return null
      }
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