<template>
  <div>
    <div class="header" ref="header" v-show="show" :style="{ '--uiColorBackground': this.backgroundColor, '--uiColorText': this.textColor }">
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
  props: ["headerTitle","headerSubtitle","title","backgroundColor","textColor","noAnimation"],

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

        if(this.title.split(' ').includes('trans') || this.title.split(' ').includes('transgender')){
          this.backgroundColor = "linear-gradient(180deg, #5BCEFA 20%, #F5A9B8 20%, 40%, #FFFFFF 40%, 60%, #F5A9B8 60%, 80%, #5BCEFA 80%)"
          this.textColor = "hsl(240, 4%, 16%)"
        }
      }
    }
  },

  computed: {
    titleFormatted: function () {
      return this.title ? markdown(this.title) : ""
    },
    show: function () {
      if(this.noAnimation) return true
      return this.display && (this.title || this.headerTitle)
    }
  },

  methods: {
    animateIn: function () {
      this.display = true;

      if(!this.noAnimation){
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


      this.$store.commit('updatePageTitle', this.headerTitle)
    }
  },

  mounted() {
    this.animateIn()
  }
}
</script>

<style scoped>

</style>