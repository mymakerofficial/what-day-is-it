<template>
  <div>
    <div class="footerContainer">
      <div class="footer" ref="container">
        <div class="footerSection" id="footerButtons">
            <a v-for="button in this.buttons" :key="button.text" :href="button.path" class="navButton" ref="navButton">{{button.text}}</a>
        </div>
        <div class="footerSection">
          <div class="footerText">made with ❤ by <b>My_Maker</b></div><div class="footerText" v-if="text" v-html="text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "Footer",

  props: ["navButtons","text"],

  computed: {
    buttons: function () {
      return this.navButtons.filter(button => button.display)
    }
  },

  watch: {
    navButtons: function () {
      this.animateButtons()
    }
  },

  methods: {
    animateButtons: function() {
      this.$nextTick(function () {
        let targets = this.$refs.navButton

        anime({
          targets: targets,
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 1000,
          delay: anime.stagger((200 / targets.length), {start: 300, easing: 'cubicBezier(0.225, 0.830, 0.405, 0.535)'}),
          easing: 'easeOutElastic(.6, .4)',
          autostart: true,
        })
      });
    },
    animateContainer: function () {
      this.$nextTick(function () {
        anime({
          targets: this.$refs.container,
          rotate: [2, 0],
          translateY: [30, 0],
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
    this.animateContainer()
  }
}
</script>

<style scoped>

</style>