<template>
  <div>
    <Header :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="message.title" :backgroundColor="this.color.hsl" :textColor="this.color.hslInverted"></Header>
    <Body :text="message.text" :textColor="this.color.hslSecondaryLight" center="true"></Body>
    <ThemeSwitcher></ThemeSwitcher>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Body from "@/components/Body";
import axios from "axios";
import {Random, WeightedRandom} from "../js/random";
import Footer from "../components/Footer";
import {Color} from "../js/color";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default {
  name: "NotFound",
  components: {
    ThemeSwitcher,
    Footer,
    Header,
    Body
  },

  data() {
    return {
      setDay: false,
      data: {"messages": []},
      headerTitle: "404",
      headerSubtitle: "not found",
      message: {
        "title": "",
        "text": ""
      },
      color: new Color()
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
    }
  },

  methods: {
    start: function () {

      this.random = Random(window.location.pathname)

      this.color.originalHue = this.random * 360

      this.message = this.data.messages[WeightedRandom(this.random, this.data.messages.map((d) => d.weight))];

    },
    loadData(){
      // load day text database
      axios.get(`/data/not_found.json`).then(response => {
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