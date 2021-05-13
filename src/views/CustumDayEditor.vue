<template>
  <div>
    <Header :headerTitle="pageTitle"></Header>
    <div class="container center">
      <input :value="url" style="width: 50%;display: inline-block">
      <router-link target=”_blank” :to="{path: path}"><i class="mdi mdi-open-in-new" style="margin: 24px;font-size: 1.5em"></i></router-link>
    </div>
    <LoadingSpinner :show="!loaded"></LoadingSpinner>
    <div class="dayEditorContainer" v-if="loaded">
      <div class="dayEditorHalf">
        <div class="textareaContainer">
          <div class="label">title</div>
          <textarea v-model="title" ref="inputTitle" class="dayTextInput" :style="{ height: headerHeight }"></textarea>
          <div class="textareaFooter right"><i class="mdi mdi-language-markdown"></i></div>
        </div>
        <div class="textareaContainer">
          <div class="label">text</div>
          <textarea v-model="text" ref="inputText" class="dayTextInput" :style="{ height: bodyHeight }"></textarea>
          <div class="textareaFooter right"><i class="mdi mdi-language-markdown"></i></div>
        </div>
        <!--<div class="textareaContainer">
          <div class="label">date</div>
          <input type="date" class="dayDateInput">
        </div>-->
        <div class="textareaContainer">
          <div class="label">seed</div>
          <input type="text" v-model="seed">
        </div>
      </div>
      <div class="dayEditorHalf">
        <div class="header" ref="header" :style="{ '--uiColorBackground': this.color.hsl, '--uiColorText': this.color.hslInverted }">
          <div class="headerTitle">what's the day?</div>
          <div class="headerSubtitle" v-show="false">01.01.2021</div>
          <div class="dayTitle" ref="dayTitle" v-if="titleFormatted" v-html="titleFormatted"></div>
        </div>
        <div class="body" :style="{ '--uiColorText': this.color.hslSecondary }">
          <div class="dayText" ref="body" v-html="textFormatted"></div>
        </div>
      </div>
    </div>
    <div class="container center">
      <button v-on:click="randomize">randomize <i class="mdi mdi-dice-5"></i></button>
    </div>
    <div class="container">
      <Footer :navButtons="navButtons"></Footer>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import {stripHtml} from "string-strip-html";
import {markdown} from "../js/markdown";
import {Color} from "../js/color";
import {Random} from "../js/random";
import {getDateFromDate} from "../js/date";
import {Day} from "../js/day";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

export default {
  name: "CustumDayEditor",
  components: {LoadingSpinner, Footer, Header},

  data() {
    return {
      pageTitle: "make your own day",
      title: "# The Day",
      text: "it really do be",
      usesDate: false,
      data: {"days": [],"any":[]},
      date: new Date(),
      color: new Color(Random(getDateFromDate(new Date()).getTime()) * 360),
      headerHeight: "300px",
      bodyHeight: "300px",
      day: new Day(),
      loaded: false,
      seed: getDateFromDate(new Date()).getTime()
    }
  },

  computed: {
    titleFormatted: function () {
      return this.title ? markdown(this.day.title) : ""
    },
    textFormatted: function () {
      return this.title ? markdown(this.day.text) : ""
    },
    encodedData: function () {
      return btoa(JSON.stringify({
        a: stripHtml(this.title).result,
        b: stripHtml(this.text).result,
        s: this.seed
      }))
    },
    path: function () {
      return `/c/${this.encodedData}`
    },
    url: function () {
      return `${document.location.origin}${this.path}`
    },
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "markdown guide", path: "/markdown", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "about", path: "/about", display: true}
      ]
    }
  },

  watch: {
    title: function (){
      this.update();
    },
    text: function () {
      this.update();
    },
    seed: function () {
      this.update();
    },
  },

  methods: {
    start() {
      this.day = new Day(this.date, this.data)
      this.title = this.day.title;
      this.text = this.day.text;

      this.update();
    },
    update() {
      if(this.loaded){
        //this.headerHeight = `${this.$refs.header.scrollHeight - 37}px`
        //this.bodyHeight = `${this.$refs.body.scrollHeight + 64}px`

        this.day.title = this.title
        this.day.text = this.text

        this.day.random = Random(this.seed)
        this.day.color.originalHue = this.day.random * 360

        this.color = this.day.color

        this.day.createKeywords()
        this.day.replaceKeywords()
      }
    },
    randomize() {
      this.seed = getDateFromDate(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))).getTime()

      let day = new Day(new Date, this.data)

      day.random = Random(this.seed)

      day.setDayData()
      day.createKeywords()
      day.replaceKeywords()

      this.title = day.dayData.title !== null ? day.dayData.title : `# {{current_day_text}}`;
      this.text = day.dayData.text !== null  ? day.dayData.text : "";

      this.update();
    },
    loadData(){
      // load day text database
      axios.get(`/data/days.json`).then(response => {
        this.data = response.data
        this.loaded = true
        this.start()
      }).catch(error => {
        console.log(error)
      })
    }
  },

  beforeRouteLeave (to, from , next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
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

<style scoped>

</style>