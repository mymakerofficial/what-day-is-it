<template>
  <div class="themeSwitcher" v-on:click="switchTheme"><i :class="`mdi ${icon}`"></i></div>
</template>

<script>
export default {
  name: "ThemeSwitcher",

  computed: {
    icon: {
      get() {
        return this.$store.state.theme === 'light' ? 'mdi-lightbulb-on' : 'mdi-lightbulb-outline';
      }
    }
  },

  methods: {
    switchTheme() {
      this.$store.commit('updateTheme', this.$store.state.theme === 'light' ? 'dark' : 'light')
    }
  },

  mounted() {
    this.setIcon()
  }
}
</script>

<style scoped>

</style>