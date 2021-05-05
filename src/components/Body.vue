<template>
  <div>
    <div class="container" :class="{ center: this.center }" ref="body" v-html="textFormatted" v-show="display" :style="{ '--uiColorText': this.textColor }"></div>
  </div>
</template>

<script>
import {markdown} from "../js/markdown";
import anime from 'animejs/lib/anime.es.js';

export default {
  name: "Body",
  props: ["text","textColor","center"],

  data() {
    return {
      display: false,
    }
  },


  watch: {
    $route: function (){
      this.display = false;
    },
    text: function () {
      this.animateIn();
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