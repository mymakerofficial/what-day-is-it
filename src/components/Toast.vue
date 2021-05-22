<template>
  <div>
    <div class="toastContainer" v-if="show"><div class="container thin center"><div class="toast" ref="toast"><div class="toastTitle" v-if="title">{{title}}</div><div class="toastBody">{{text}}</div></div></div></div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "Toast",

  data() {
    return {
      show: false,
      animation: null
    }
  },

  props: ["title", "text", "time"],
  
  watch: {
    text: function () {
      if(this.text !== "")this.animate();
    }
  },

  methods: {
    animate: function () {
      this.show = true;

      anime.set(this.$refs.toast, {
        scale: 0.9,
        rotate:  2,
        translateY: 10,
        opacity: 0,
      })

      this.$nextTick(function () {
        if(this.animation) this.animation.pause();

        this.animation = anime({
          targets: this.$refs.toast,
          scale: [
            {value: 0.9, duration: 0},
            {value: 1, duration: 700},
            {value: 0.9, delay: this.time, duration: 700}
          ],
          rotate: [
            {value: 2, duration: 0},
            {value: 0, duration: 700},
            {value: 2, delay: this.time, duration: 700}
          ],
          translateY: [
            {value: 10, duration: 0},
            {value: 0, duration: 700},
            {value: 10, delay: this.time, duration: 700}
          ],
          opacity: [
            {value: 0, duration: 0},
            {value: 1, duration: 700},
            {value: 0, delay: this.time, duration: 700}
          ],
          easing: 'easeOutElastic(.6, 1)',
          autostart: true,
          complete: () => {this.show = false}
        })
      });
    }
  },
}
</script>

<style scoped>

</style>