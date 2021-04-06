<template>
  <div>
    <Header :headerTitle="headerTitle" :headerSubtitle="headerSubtitle" :title="message.title"></Header>
    <Body :text="message.text"></Body>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Body from "@/components/Body";
import axios from "axios";
import {Random, WeightedRandom} from "../js/random";

export default {
  name: "NotFound",
  components: {
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
      }
    }
  },

  methods: {
    start: function () {

      this.random = Random(window.location.pathname)

      console.log(this.data.messages)
      this.message = this.data.messages[WeightedRandom(this.random, this.data.messages.map((d) => d.weight))];

      //set color
      document.querySelector(':root').style.setProperty('--uiColorPrimary', `hsl(${this.random * 360},100%,50%)`);
      document.querySelector(':root').style.setProperty('--uiColorSecondary', `hsl(${(this.random * 360 + 180) % 360},100%,50%)`);
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

  created() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>