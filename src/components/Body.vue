<template>
  <div>
    <div class="dayText" :class="{ center: this.center }" ref="body" v-html="textFormatted" v-show="display" :style="{ '--uiColorText': this.textColor }"></div>
  </div>
</template>

<script>
import {markdown} from "../js/markdown";
import anime from 'animejs/lib/anime.es.js';

export default {
  name: "Body",
  props: ["text","textColorLight","textColorDark","center","noAnimation"],

  data() {
    return {
      display: false,
    }
  },
  
  watch: {
    $route: function (){
      this.display = false;
      if(this.noAnimation) this.display = true;
    },
    text: function () {
      this.animateIn();
    },
  },

  methods: {
    animateIn: function () {
      this.display = true;

      if(!this.noAnimation) {
        this.$nextTick(function () {
          anime({
            targets: this.$refs.body,
            scale: [0.9, 1],
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
    }
  },

  computed: {
    textFormatted: function () {
      return this.text ? markdown(this.text) : ""
    },
    textColor: {
      get() {
        return this.$store.state.theme === 'light' ? this.textColorLight : this.textColorDark;
      }
    }
  },

  mounted() {
    this.animateIn()
  }
}
</script>

<style scoped>

</style>