<template>
  <div>
    <Header :headerTitle="pageTitle"></Header>
    <div class="container">
      <h6>Text inputs support markdown! <a target="_blank" href="https://www.markdownguide.org/cheat-sheet/#basic-syntax">guide</a></h6>
      <h5>Title</h5>
      <textarea v-model="title" ref="inputTitle"></textarea>
      <div><span v-if="title.length == 0" class="badge">no valid input</span></div>
      <br><br>
      <h5>Text (optional)</h5>
      <textarea v-model="text" ref="inputText"></textarea>
      <br><br>
      <h5>Date (optional) (y/m/d)</h5>
      <input type="checkbox" v-model="usesDate">
      <label>use date</label>
      <br><br>
      <input v-model="year" ref="inputYear">
      <input v-model="month" ref="inputMonth">
      <input v-model="day" ref="inputDay">
      <div><span v-if="!dateValid && usesDate" class="badge">no valid input</span></div>
      <br><br>
      <h5>URL</h5>
      <a target="_blank" :href="url">{{url}}</a>
      <h6>(this page is still under construction)</h6>
      <Footer :navButtons="navButtons"></Footer>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import {stripHtml} from "string-strip-html";

function matchExact(r, str) {
  let match = str.match(r);
  return match && str === match[0];
}

export default {
  name: "CustumDayEditor",
  components: {Footer, Header},

  data() {
    return {
      pageTitle: "make your own day",
      title: "",
      text: "",
      year: "0",
      month: "0",
      day: "0",
      usesDate: false,
    }
  },

  computed: {
    encodedTitle: function () {
      return encodeURIComponent(stripHtml(this.title).result);
    },
    encodedText: function () {
      return encodeURIComponent(stripHtml(this.text).result);
    },
    dateValid: function () {
      return matchExact(/[0-9][0-9][0-9][0-9]/g, this.year) && matchExact(/(0[1-9]|1[012])|[1-9]/gm, this.month) && matchExact(/(0[1-9]|[12]\d|3[01])|[1-9]/g, this.day)
    },
    encodedDate: function () {
      if(this.dateValid && this.usesDate) return `${this.year}/${('0'+(this.month)).slice(-2)}/${('0'+(this.day)).slice(-2)}`
      return ''
    },
    url: function () {
      let date = (this.encodedDate === '' ? '' : '/') + this.encodedDate
      let title = (this.encodedTitle === '' ? '' : '/') + this.encodedTitle
      let text = (this.encodedText === '' ? '' : '/') + this.encodedText
      let valid = this.encodedTitle !== ''
      if(valid) return `https://day.maiker.de/c${date}${title}${text}`
      return ''
    },
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "about", path: "/about", display: true}
      ]
    }
  },
}
</script>

<style scoped>

</style>