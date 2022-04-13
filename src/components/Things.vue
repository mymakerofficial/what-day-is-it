<template>
  <div>
    <LoadingSpinner :show="!loaded"></LoadingSpinner>
    <div class="containerThin" ref="container" v-if="display">
      <router-link :to="{path:'/'}" class="button" v-if="day" v-bind:class="{ inverted: this.$route.name === 'app' || this.$route.name === 'day' }">what's the day?</router-link>
      <router-link :to="{path: `/day/${thing.path}`}" class="button" v-bind:class="{ inverted: isCurrentThing(thing.path) }" v-for="thing in this.list" :key="thing.path">{{thing.fullName}}</router-link>
      <router-link :to="{path:'/things'}" class="button" v-if="!all">...</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import anime from "animejs";
import LoadingSpinner from "./LoadingSpinner";
import {Random} from "../js/random";
import {getDateFromDate} from "../js/date";

export default {
  name: "Things",
  components: {LoadingSpinner},

  props: ["showAll","showDay"],

  data() {
    return {
      things: [],
      loaded: false,
      display: false,
      length: 4,
      random: Random(getDateFromDate(new Date()).getTime())
    }
  },

  computed: {
    list: function () {
      if(this.all) return this.things
      return this.things.slice(0, this.length)
    },
    all: function () {
      return this.showAll === undefined ? true : Boolean(this.showAll)
    },
    day: function () {
      return this.showDay === undefined ? true : !this.showAll
    }
  },

  watch: {
    $route: function (){
      this.animate()
    }
  },

  methods: {
    isCurrentThing(path) {
      return this.$route.params.thing ? path === this.$route.params.thing : false
    },
    shuffle() {
      let temp = this.things
      let out = []
      let l = this.things.length
      for(let i = 0;i < l; i++){
        let j = Math.floor(this.random * temp.length)
        let t = temp[j]
        out.push(t)
        temp.splice(j, 1);
      }
      this.things = out
    },
    animate(){
      this.display = true;
      this.$nextTick(function () {
        let targets = this.$refs.container.children

        anime({
          targets: targets,
          scale: [0.9,1],
          rotate: [2, 0],
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 1000,
          round: 1000,
          delay: anime.stagger((200 / targets.length), {start: -100, easing: 'cubicBezier(0.225, 0.830, 0.405, 0.535)'}),
          easing: 'easeOutElastic(.6, .4)',
          autostart: true,
        })
      })
    },
    loadData(){
      // load database
      axios.get(`/data/things.json`).then(response => {
        this.things = response.data.things
        this.shuffle()
        this.animate()
        this.loaded = true;
      }).catch(error => {
        console.log(error)
        this.loaded = true;
      })
    },
  },

  created(){
    this.loadData()
  }
}
</script>

<style scoped>

</style>