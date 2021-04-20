<template>
  <div>
    <div class="embedHeader" :style="{ backgroundColor: this.currentDay.color.hsl, color: this.currentDay.color.hslInverted }">
      <div class="headerTitle" ref="headerTitle" :style="{ fontSize: this.titleFontSizeFormatted }">what's the day?</div>
      <div class="embedHeaderTextContainer" :style="{ height: headerHeightFormatted, fontSize: this.headerFontSizeFormatted }">
        <div class="embedHeaderText">{{this.currentDay.titleStriped}}</div>
      </div>
    </div>
    <div class="embedBody" :style="{ color: this.currentDay.color.hslSecondary, height: bodyHeightFormatted, fontSize: this.bodyFontSizeFormatted }">
      <div class="embedBodyText">
        {{this.currentDay.textStriped}}
      </div>
    </div>
    <div class="embedFooterContainer">
      <a href="https://day.maiker.de" target="_blank" class="embedFooter" ref="embedFooter">
        visit <b>day.maiker.de</b> for more
      </a>
    </div>
  </div>
</template>

<script>
import {Day} from "../js/day";
import axios from "axios";

export default {
  name: "Embed",

  data() {
    return {
      day: 0,
      month: 0,
      year: 0,
      data: {"days": [],"any":[]},
      date: new Date(),
      currentDay: new Day(),
      headerHeight: 0,
      bodyHeight: 0,
      titleFontSize: 0,
      headerFontSize: 0,
      bodyFontSize: 0,
    }
  },

  computed: {
    headerHeightFormatted: function () {
      return `${this.headerHeight}px`
    },
    bodyHeightFormatted: function () {
      return `${this.bodyHeight}px`
    },
    titleFontSizeFormatted: function () {
      return `${this.titleFontSize}px`
    },
    headerFontSizeFormatted: function () {
      return `${this.headerFontSize}px`
    },
    bodyFontSizeFormatted: function () {
      return `${this.bodyFontSize}px`
    },
  },

  methods: {
    start: function () {
      //get start of day
      if(process.env.VUE_APP_ALWAYS_USE_START_OF_DAY === "true" && !this.setDay){
        let date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth()+1
        this.day = date.getDate()
      }

      //get date
      if(this.year !== undefined && this.month !== undefined && this.day !== undefined) this.date = new Date(this.year, this.month-1, this.day, 0, 0, 0, 0);

      //start day
      this.currentDay.set(this.date, this.data)

      document.querySelector('body').style.setProperty('overflow', 'hidden');

      window.onresize = this.resize;
      this.resize()
    },
    resize() {
      this.headerHeight = this.currentDay.textStriped !== "" ? (window.innerHeight / 2) - (this.$refs.headerTitle.clientHeight) : window.innerHeight  - (this.$refs.headerTitle.clientHeight)
      this.bodyHeight = this.currentDay.textStriped !== "" ? (window.innerHeight / 2) - (this.$refs.headerTitle.clientHeight * 1.5) : 0
      this.titleFontSize = Math.max(Math.min((window.innerWidth * (window.innerHeight / 2)) / 5000, 46), 32) - 12;
      this.headerFontSize = Math.max(Math.min(window.innerWidth / 30, 42), 16);
      this.bodyFontSize = Math.max(Math.min(window.innerWidth / 40, 19), 16);
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
@import "@/sass/embed.scss";
</style>