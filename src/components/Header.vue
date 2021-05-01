<template>
  <div>
    <div class="header" ref="header">
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

  watch: {
    $route (){
      this.animateIn()
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

  listeners: {
    animateOut: function () {
      this.animateOut()
    }
  },

  methods: {
    animateIn: function () {
      this.$nextTick(function () {
        anime({
          targets: this.$refs.header,
          scale: [0.9,1],
          rotate: [2, 0],
          translateY: [-70, 0],
          opacity: [0, 1],
          duration: 700,
          delay: 500,
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