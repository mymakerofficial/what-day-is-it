<template>
  <div>
    <LoadingSpinner :show="!loaded"></LoadingSpinner>
    <div class="container" :class="{ center: this.center }" ref="body" v-html="textFormatted" v-show="display"></div>
  </div>
</template>

<script>
import {markdown} from "../js/markdown";
import anime from 'animejs/lib/anime.es.js';
import LoadingSpinner from "./LoadingSpinner";

export default {
  name: "Body",
  components: {LoadingSpinner},
  props: ["text","textColor","center"],

  data() {
    return {
      display: false,
      loaded: false,
    }
  },


  watch: {
    $route: function (){
      this.loaded = false;
      this.display = false;
    },
    text: function () {
      if(!this.loaded){
        this.animateIn();
        this.loaded = true;
      }
    },
    textColor: function () {
      this.$refs.body.style.setProperty('--uiColorText', this.textColor);
    },
  },

  methods: {
    animateIn: function () {
      this.display = true;

      this.$nextTick(function () {
        anime({
          targets: this.$refs.body,
          scale: [0.9,1],
          rotate: [2, 0],
          translateY: [-70, 0],
          opacity: [0, 1],
          duration: 700,
          round: 1000,
          easing: 'easeOutElastic(.6, 1)',
          autostart: true,
        })
      });
    }
  },

  computed: {
    textFormatted: function () {
      return this.text ? markdown(this.text) : ""
    },
  },

  mounted() {
    this.animateIn()
  }
}
</script>

<style scoped>

</style>