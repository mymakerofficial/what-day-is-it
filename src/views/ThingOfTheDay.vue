<template>
  <div>
    <Header :headerTitle="headerTitle" :title="title" :backgroundColor="this.color.hsl" :textColor="this.color.hslInverted"></Header>
    <Body :text="text" center="true" :textColorLight="this.color.hslSecondaryLight" :textColorDark="this.color.hslSecondaryDark"></Body>
    <LoadingSpinner :show="loading"></LoadingSpinner>
    <ThemeSwitcher></ThemeSwitcher>
    <Footer :navButtons="navButtons" :text="footerText"></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import {Color} from "../js/color";
import axios from "axios";
import {Random, WeightedRandom} from "../js/random.js";
import LoadingSpinner from "../components/LoadingSpinner";
import {getDateFromDate} from "../js/date";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default {
  name: "ThingOfTheDay",
  components: {ThemeSwitcher, LoadingSpinner, Footer, Body, Header},

  data() {
    return {
      random: 0,
      headerTitle: "",
      things: [],
      thing: {},
      messages: [],
      message: {},
      date: new Date(),
      color: new Color(0),
      loading: true,
    }
  },

  computed: {
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "about", path: "/about", display: true}
      ]
    },
    footerText: function () {
      return this.message.author ? `this <b>${this.thing.fullName}</b> was brought to you by <b>${this.message.author}</b><br>` : "" + this.thing.source && this.thing.sourceText ? `source: <b><a href="${this.thing.source}">${this.thing.sourceText}</a></b>` : ""
    },
    title: function () {
      return this.message.title
    },
    text: function () {
      return this.message.text
    }
  },

  methods: {
    start: function () {
      this.thing = this.things.find(t => t.path === this.$route.params.thing)

      if(this.thing){
        axios.get(this.thing.data).then(response => {
          this.messages = response.data.messages
          this.loading = false
          this.setThing()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    setThing(){
      this.random = Random(getDateFromDate(new Date()).getTime())

      this.headerTitle = this.thing.fullName;
      this.color.originalHue = this.random * 360;
      this.message = this.messages[WeightedRandom(this.random, this.messages.map((d) => d.weight))]
    },
    offline: function () {
      this.currentDay = {
        title: `#### :mdi-cloud-off-outline: you are offline`,
        text: ` `,
        color: new Color(Math.round(Random(getDateFromDate(new Date()).getTime()) * 360))
      }
    },
    loadData(){
      this.loading = true
      // load database
      axios.get(`/data/things.json`).then(response => {
        this.things = response.data.things
        this.start()
      }).catch(error => {
        console.log(error)
        this.offline()
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