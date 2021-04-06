<template>
  <div>
    <div class="dayBody">
      <div class="dayText" v-html="textFormatted" ref="dayText"></div>
    </div>
  </div>
</template>

<script>
const marked = require("marked");
import anime from 'animejs/lib/anime.es.js';
import Letterize from "letterizejs"

export default {
  name: "Body",

  props: ["text"],

  watch: {
    text: function () {
      this.$nextTick(function () {
        let originalDayTextHtml = this.$refs.dayText.innerHTML

        let targets = new Letterize({
          targets: ".dayText"
        })

        anime({
          targets: targets.listAll,
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 1000,
          delay: anime.stagger((100 / targets.listAll.length), {easing: 'cubicBezier(0.225, 0.830, 0.405, 0.535)'}),
          easing: 'easeOutElastic(.6, .4)',
          autostart: true,
          complete: () => {
            this.$refs.dayText.innerHTML = originalDayTextHtml
          }
        })
      });
    }
  },

  computed: {
    textFormatted: function () {
      return marked(this.text)
    },
  },
}
</script>

<style scoped>

</style>