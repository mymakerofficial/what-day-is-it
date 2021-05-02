<template>
  <div>
    <div class="header" ref="header" v-show="display">
      <div class="headerTitle">{{headerTitle}}</div>
      <div class="headerSubtitle" v-if="headerSubtitle">{{headerSubtitle}}</div>
      <div class="dayTitle" ref="dayTitle" v-if="titleFormatted" v-html="titleFormatted"></div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";
import {markdown} from "../js/markdown";

export default {
  name: "Header",
  props: ["headerTitle","headerSubtitle","title","backgroundColor","textColor"],

  data() {
    return {
      display: false,
      loaded: false
    }
  },

  watch: {
    $route: function (){
      this.loaded = false;
      this.display = false;
    },
    title: function () {
      if(!this.loaded){
        this.animateIn();
        this.loaded = true;
      }
    },
    backgroundColor: function () {
      this.$refs.header.style.setProperty('--uiColorBackground', this.backgroundColor);
    },
    textColor: function () {
      this.$refs.header.style.setProperty('--uiColorText', this.textColor);
    }
  },

  computed: {
    titleFormatted: function () {
      return this.title ? markdown(this.title) : ""
    }
  },

  methods: {
    animateIn: function () {
      this.display = true;

      this.$nextTick(function () {
        anime({
          targets: this.$refs.header,
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

  mounted() {
    this.animateIn()
  }
}
</script>

<style scoped>

</style>