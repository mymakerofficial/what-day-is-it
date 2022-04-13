<template>
  <div>
    <Header :headerTitle="headerTitle" :title="title" :backgroundColor="this.color.hsl" :textColor="this.color.hslInverted"></Header>
    <Body :text="text" :navButtons="navButtons"></Body>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Body from "../components/Body";
import axios from "axios";
import Footer from "../components/Footer";
import {Random} from "../js/random";
import {getDateFromDate} from "../js/date";
import {Color} from "../js/color";

export default {
  name: "About",
  components: {Footer, Body, Header},

  data() {
    return {
      headerTitle: "about this",
      title: '#### A website that **maybe** tells you what day it is.',
      text: '',
      data: {"days": [],"any":[]},
      date: new Date(),
      color: new Color(Random(getDateFromDate(new Date()).getTime()) * 360)
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
    loadData(){
      // load about text
      axios.get(`/data/about.md`).then(response => {
        this.text = response.data
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