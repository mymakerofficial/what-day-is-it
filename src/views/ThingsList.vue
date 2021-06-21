<template>
  <div>
    <Header headerTitle="thing's of the day"></Header>
    <div class="container thin center">
      <Things :showAll="true"></Things>
    </div>
    <ThemeSwitcher></ThemeSwitcher>
    <Footer :navButtons="navButtons" :displayThings="false"></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import Things from "../components/Things";
import ThemeSwitcher from "../components/ThemeSwitcher";
export default {
  name: "ThingsList",
  components: {ThemeSwitcher, Things, Header, Footer},

  computed: {
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "about", path: "/about", display: true}
      ]
    }
  },

}
</script>

<style scoped>

</style>