<template>
  <span>
    <router-link class="button" :to="{path: path}" v-if="!loading"><i :class="icon"></i> {{text}}</router-link>
    <LoadingSpinner :show="loading" size="small"></LoadingSpinner>
  </span>
</template>

<script>
import {stripHtml} from "string-strip-html";
import {Day} from "../js/day";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import {getDate} from "../js/date";
import {Random} from "../js/random";

export default {
  name: "EditThisDayButton",
  components: {LoadingSpinner},
  data() {
    return {
      supportedPages: ["app","day","custom_day"],
      day: new Day(),
      data: {},
      loading: true,
    }
  },

  computed: {
    pageIsSupported: function () {
      return this.supportedPages.includes(this.$route.name);
    },
    text: function () {
      return this.pageIsSupported ? "Customize this day!" : "Make your own day!"
    },
    icon: function () {
      return this.pageIsSupported ? "mdi mdi-pencil-circle" : "mdi mdi-plus-circle"
    },
    encodedData: function () {
      return btoa(JSON.stringify({
        a: stripHtml(this.day.title).result,
        b: stripHtml(this.day.text).result,
        s: this.day.random,
        c: this.day.color.originalHue
      }))
    },
    path: function () {
      return `/custom?data=${this.encodedData}`
    }
  },

  methods: {
    start() {
      switch(this.$route.name) {
        case "app":
          this.day.set(new Date(), this.data)
          break;
        case "day":
          this.day.set(getDate(this.$route.params.year, this.$route.params.month, this.$route.params.day), this.data)
          break;
        case "custom_day":
          var data = JSON.parse(atob(decodeURIComponent(this.$route.params.data)))

          this.day.set(new Date(), this.data)

          this.day.random = Random(data.s)

          this.day.title = stripHtml(data.a).result
          this.day.text = stripHtml(data.b).result

          if(data.c) {
            this.day.color.originalHue = data.c
          }else {
            this.day.color.originalHue = this.day.random * 360
          }

          this.day.createKeywords()
          this.day.replaceKeywords()
          break;
      }
      this.loading = false
    },
    loadData(){
      if(["app","day","custom_day"].includes(this.$route.name)) {
        axios.get(`/data/days.json`).then(response => {
          this.data = response.data
          this.start()
        }).catch(error => {
          console.log(error)
        })
      }else{
        this.loading = false;
      }
    }
  },

  created(){
    this.loadData()
  }
}
</script>

<style scoped>

</style>