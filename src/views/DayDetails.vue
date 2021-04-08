<template>
  <div>
    <Header :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="title" :backgroundColor="this.currentDay.colorHsl" :textColor="this.currentDay.colorHslInverted"></Header>
    <div class="detailsBody">
      <h4>Properties</h4>
      <table>
        <tr>
          <th>property</th>
          <th>value</th>
        </tr>
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
        <tr>
          <td><b>colorHex</b></td>
          <td>{{this.currentDay.colorHex}}<span class="colorPreview" :style="{ backgroundColor: this.currentDay.colorHsl }"></span></td>
        </tr>
        <tr>
          <td><b>colorHexInverted</b></td>
          <td>{{this.currentDay.colorHexInverted}}<span class="colorPreview" :style="{ backgroundColor: this.currentDay.colorHslInverted }"></span></td>
        </tr>
        <tr>
          <td><b>colorHsl</b></td>
          <td>{{this.currentDay.colorHsl}}<span class="colorPreview" :style="{ backgroundColor: this.currentDay.colorHsl }"></span></td>
        </tr>
        <tr>
          <td><b>colorHslInverted</b></td>
          <td>{{this.currentDay.colorHslInverted}}<span class="colorPreview" :style="{ backgroundColor: this.currentDay.colorHslInverted }"></span></td>
        </tr>
        <tr>
          <td><b>colorHue</b></td>
          <td>{{this.currentDay.colorHue}}<span class="colorPreview" :style="{ backgroundColor: this.currentDay.colorHsl }"></span></td>
        </tr>
        <tr>
          <td><b>colorHueInverted</b></td>
          <td>{{this.currentDay.colorHueInverted}}<span class="colorPreview" :style="{ backgroundColor: this.currentDay.colorHslInverted }"></span></td>
        </tr>
      </table>
      <h4>Keywords</h4>
      <table>
        <tr>
          <th>scope</th>
          <th>replace</th>
        </tr>
        <tr v-for="keyword in this.currentDay.keywords" :key="keyword.scope">
          <td><b>{{`\u007B\u007B${keyword.scope}\u007D\u007D`}}</b></td>
          <td>{{keyword.replace}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import axios from "axios";
import {Day} from "../js/day";
export default {
  name: "DayDetails",

  components: {Header},

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

      //set color
      document.querySelector('.header').style.setProperty('--uiColorPrimary', this.currentDay.colorHsl);
      document.querySelector('.header').style.setProperty('--uiColorSecondary', this.currentDay.colorHslInverted);

      console.log(this.currentDay)
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