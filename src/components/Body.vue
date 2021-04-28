<template>
  <div>
    <div class="dayBody">
      <div class="dayText" v-html="textFormatted" ref="dayText"></div>
    </div>
  </div>
</template>

<script>
import {markdown} from "../js/markdown";
import anime from 'animejs/lib/anime.es.js';
import Letterize from "letterizejs"

export default {
  name: "Body",

  props: ["text"],

  watch: {
    text: function () {
      this.Animate()
    }
  },

  methods: {
    Animate() {
      this.$nextTick(function () {
        if(this.text && this.$refs.dayText){
          let originalDayTextHtml = this.$refs.dayText.innerHTML

          let targets = new Letterize({
            targets: ".dayText"
          })

          anime({
            targets: [this.$refs.dayText, targets.listAll],
            translateY: [10, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger((100 / targets.listAll.length), {start: 400, easing: 'cubicBezier(0.225, 0.830, 0.405, 0.535)'}),
            easing: 'easeOutElastic(.6, .4)',
            autostart: true,
            complete: () => {
              if(this.$refs.dayText)this.$refs.dayText.innerHTML = originalDayTextHtml
            }
          })
        }
      });
    }
  },

  computed: {
    textFormatted: function () {
      return this.text ? markdown(this.text) : ""
    },
  },

  mounted() {
    //this.Animate()
  }
}
</script>

<style scoped>

</style>