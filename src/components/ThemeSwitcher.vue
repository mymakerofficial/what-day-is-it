<template>
  <div class="floatingActionButton" v-on:click="switchTheme"><i :class="`mdi ${icon}`"></i></div>
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
}
</script>

<style scoped>

</style>