<template>
  <div>
    <LoadingSpinner :show="!loaded"></LoadingSpinner>
    <div class="containerThin" ref="container" v-if="display">
      <router-link :to="{path:'/'}" class="button" v-bind:class="{ inverted: this.$route.name === 'app' }">what's the day?</router-link>
      <router-link :to="{path: `/day/${thing.path}`}" class="button" v-bind:class="{ inverted: isCurrentThing(thing.path) }" v-for="thing in this.things" :key="thing.path">{{thing.fullName}}</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import anime from "animejs";
import LoadingSpinner from "./LoadingSpinner";

export default {
  name: "Things",
  components: {LoadingSpinner},
  data() {
    return {
      things: [],
      loaded: false,
      display: false
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
        this.animate()
        this.loaded = true;
      }).catch(error => {
        console.log(error)
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