<template>
  <div>
    <div class="header" :style="{ backgroundColor: backgroundColor, color: textColor }">
      <div class="headerTitle">{{headerTitle}}</div>
      <div class="headerSubtitle" v-if="headerSubtitle">{{headerSubtitle}}</div>
      <div class="dayTitle" ref="dayTitle" v-if="titleFormatted" v-html="titleFormatted"></div>
    </div>
  </div>
</template>

<script>
import Letterize from "letterizejs";
import anime from "animejs";
import marked from "marked";

export default {
  name: "Header",
  props: ["headerTitle","headerSubtitle","title","backgroundColor","textColor","navButtons"],

  watch: {
    title: function () {
      this.titleAnimate()
    },
    headerTitle: function () {
      this.headerTitleAnimate()
    },
    headerSubtitle: function () {
      this.headerSubtitleAnimate()
    }
  },

  computed: {
    titleFormatted: function () {
      return this.title ? marked(this.title) : ""
    }
  },

  methods: {
    titleAnimate: function() {
      this.$nextTick(function () {
        let originalDayTitleHtml = this.$refs.dayTitle.innerHTML

        let targets = new Letterize({
          targets: ".dayTitle"
        })

        anime({
          targets: targets.listAll,
          translateY: [40, 0],
          translateX: [anime.stagger(-20, {grid: [targets.listAll.length, 1], from: 'center', axis: 'x'}), 0],
          rotate: [anime.stagger(5, {grid: [targets.listAll.length, 1], from: 'center', axis: 'x'}), 0],
          opacity: [0, 1],
          duration: 1000,
          delay: anime.stagger((400 / targets.listAll.length), {start: 300, from: 'center', easing: 'cubicBezier(0.720, 0.120, 0.580, 0.585)'}),
          easing: 'easeOutElastic(.6, 1)',
          autostart: true,
          complete: () => {
            this.$refs.dayTitle.innerHTML = originalDayTitleHtml
          }
        })
      });
    },
    headerTitleAnimate: function () {
      this.$nextTick(function () {
        let targets = new Letterize({
          targets: ".headerTitle"
        })

        anime({
          targets: targets.listAll,
          translateY: [50, 0],
          translateX: [anime.stagger(-10, {grid: [targets.listAll.length, 1], from: 'center', axis: 'x'}), 0],
          rotate: [anime.stagger(20, {grid: [targets.listAll.length, 1], from: 'center', axis: 'x'}), 0],
          opacity: [0, 1],
          duration: 1000,
          delay: anime.stagger(20, {start: 100, from: 'center', easing: 'cubicBezier(0.720, 0.120, 0.580, 0.585)'}),
          easing: 'easeOutElastic(.6, 1)',
          autostart: true,
        })
      });
    },
    headerSubtitleAnimate: function () {
      this.$nextTick(function () {
        let targets = new Letterize({
          targets: ".headerSubtitle"
        })

        anime({
          targets: targets.listAll,
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 1000,
          delay: anime.stagger(20, {start: 200, from: 'center', easing: 'cubicBezier(0.690, 0.240, 0.420, 0.750)'}),
          easing: 'easeOutElastic(.6, 1)',
          autostart: true,
        })
      });
    }
  },

  mounted() {
    this.headerTitleAnimate()
    this.titleAnimate()
    this.headerSubtitleAnimate()
  }
}
</script>

<style scoped>

</style>