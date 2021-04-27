<template>
  <div>
    <Header :headerTitle="headerTitle" :title="title" :style="{ backgroundColor: this.color.hsl, color: this.color.hslInverted }"></Header>
    <Body :text="text"></Body>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import {Color} from "../js/color";
import axios from "axios";
import {Random, WeightedRandom} from "../js/random.js";

export default {
  name: "ThingOfTheDay",
  components: {Footer, Body, Header},

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
          this.setThing()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    setThing(){
      //get start of day
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth()+1
      this.day = date.getDate()

      //get date
      if(this.year !== undefined && this.month !== undefined && this.day !== undefined) this.date = new Date(this.year, this.month-1, this.day, 0, 0, 0, 0);

      this.random = Random(this.date)

      this.headerTitle = this.thing.fullName;
      this.color.originalHue = this.random * 360;
      this.message = this.messages[WeightedRandom(this.random, this.messages.map((d) => d.weight))]
    },
    loadData(){
      // load database
      axios.get(`/data/things.json`).then(response => {
        this.things = response.data.things
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