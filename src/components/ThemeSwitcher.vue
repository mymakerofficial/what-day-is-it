<template>
  <div class="themeSwitcher" v-on:click="switchTheme"><i :class="`mdi ${icon}`"></i></div>
</template>

<script>
export default {
  name: "ThemeSwitcher",

  data() {
    return {
      icon: ''
    }
  },

  methods: {
    switchTheme() {
      document.changeTheme(localStorage.theme === 'light' ? ' dark' : 'light')
      this.setIcon()
    },
    setIcon() {
      this.icon = localStorage.theme === 'light' ? 'mdi-lightbulb-on' : 'mdi-lightbulb-outline';
    }
  },

  mounted() {
    this.setIcon()
  }
}
</script>

<style scoped>

</style>