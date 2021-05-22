<template>
  <div>
    <div class="loadingContainer" v-if="show" ref="container"><span class="loadingSpinner"></span><span class="loadingSpinner"></span><span class="loadingSpinner"></span></div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "LoadingSpinner",

  props: ["show"],

  data() {
    return {
      animation: null
    }
  },

  watch: {
    $route: function (){
      this.setup()
    },
    show: function (){
      if(this.show){
        this.animation.restart()
      }else {
        this.animation.pause()
      }
    }
  },

  methods: {
    setup: function () {
      this.$nextTick(function () {
        if(this.$refs.container){
          this.animation = anime({
            targets: this.$refs.container.children,
            rotate: [0, 0, () => {
              return anime.random(-6, 6)
            }, 0],
            translateY: [0, 8, -10, 0],
            scaleX: [1, 1.2, 0.9, 1],
            scaleY: [1, 0.8, 1.1, 1],
            duration: 1400,
            delay: anime.stagger(100, {start: -100}),
            easing: 'spring(1, 80, 10, 0)',
            autostart: true,
            loop: true,
          })
        }
      })
    }
  },

  mounted() {
    this.setup()
  }

}
</script>

<style scoped>

</style>