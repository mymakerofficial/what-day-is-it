<template>
  <div>
    <div class="footerContainer">
      <Things></Things>
      <div class="footer" ref="container">
        <div class="footerSection" id="footerButtons">
            <router-link v-for="button in this.buttons" :key="button.text" :to="{path: button.path}" class="navButton" ref="navButton">{{button.text}}</router-link>
        </div>
        <div class="footerSection">
          <div class="footerText">made with <i class="mdi mdi-heart"></i> by <b>My_Maker</b></div><div class="footerText" v-if="text" v-html="text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";
import Things from "./Things";

export default {
  name: "Footer",
  components: {Things},
  props: ["navButtons","text"],

  computed: {
    buttons: function () {
      return this.navButtons.filter(button => button.display)
    }
  },

  watch: {
    $route (){
      this.animate()
    }
  },

  methods: {
    animate: function () {
      this.$nextTick(function () {
        anime({
          targets: this.$refs.container,
          scale: [0.9,1],
          rotate: [2, 0],
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 700,
          easing: 'easeOutElastic(.6, 1)',
          autostart: true,
        })
      });

    }
  },

  mounted() {
    this.animate()
  }
}
</script>

<style scoped>

</style>