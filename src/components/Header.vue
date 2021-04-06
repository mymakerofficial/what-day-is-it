<template>
  <div>
    <div class="header">
      <div class="headerTitle">{{headerTitle}}</div>
      <div class="headerSubtitle" v-id="headerSubtitle">{{headerSubtitle}}</div>
      <div class="dayTitle" v-html="titleFormatted"></div>
    </div>
  </div>
</template>

<script>
import Letterize from "letterizejs";
import anime from "animejs";

const marked = require("marked");

export default {
  name: "Header",

  props: ["headerTitle","headerSubtitle","title"],

  watch: {
    title: function () {
      this.$nextTick(function () {
        let targets = new Letterize({
          targets: ".dayTitle"
        })

        anime({
          targets: targets.listAll,
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 1000,
          delay: anime.stagger((100 / targets.listAll.length), {easing: 'cubicBezier(0.225, 0.830, 0.405, 0.535)'}),
          easing: 'easeOutElastic(.6, .4)',
          autostart: true
        })
      });
    }
  },

  computed: {
    titleFormatted: function () {
      return marked(this.title)
    }
  },
}
</script>

<style scoped>

</style>