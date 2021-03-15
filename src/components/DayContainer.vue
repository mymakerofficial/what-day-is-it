<template>
  <div v-html="dayHTML"></div>
</template>

<script>

const marked = require("marked");

export default {
  name: "DayContainer",

  data() {
    return {
      dayText: "# Its *some day*",
    }
  },

  computed: {
    dayHTML: function () {
      return marked(this.dayText)
    },
  },
}
</script>

<style scoped>

</style>