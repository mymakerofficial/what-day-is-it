<template>
  <div class="dayContainer">
    <div class="dayTitleContainer" v-if="titleFormated"><span v-html="titleFormated"></span></div>
    <div class="dayText" v-html="textFormated"></div>
  </div>
</template>

<script>

//import axios from 'axios'
const marked = require("marked");

export default {
  name: "DayContainer",

  props: ["title","text"],

  data() {
    return {
      day: null,
    }
  },

  computed: {
    titleFormated: function () {
      return marked(this.title)
    },
    textFormated: function () {
      return marked(this.text)
    },
  },
}
</script>

<style scoped>

</style>