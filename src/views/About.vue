<template>
  <div>
    <Header :headerTitle="headerTitle" :title="title"></Header>
    <Body :text="text" :navButtons="navButtons"></Body>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Body from "../components/Body";
import axios from "axios";
import Footer from "../components/Footer";

export default {
  name: "About",
  components: {Footer, Body, Header},

  data() {
    return {
      headerTitle: "about this",
      title: '#### a website that **maybe** tells you what day it is.',
      text: `All days are randomly generated from a predefined database of text's`
    }
  },

  computed: {
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "custom day", path: "/custom", display: true}
      ]
    }
  },

  methods: {
    start: function () {
      //set color
      document.querySelector(':root').style.setProperty('--uiColorPrimary', "#fe0058");
      document.querySelector(':root').style.setProperty('--uiColorSecondary', "#00ffa5");
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