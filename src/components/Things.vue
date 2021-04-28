<template>
  <div>
    <div class="containerThin">
      <span>
        <a href="/"><button v-bind:class="{ inverted: this.$route.name === 'app' }">what's the day?</button></a>
      </span>
      <span v-for="thing in this.things" :key="thing.path">
        <a :href="'/day/' + thing.path"><button v-bind:class="{ inverted: isCurrentThing(thing.path) }">{{thing.fullName}}</button></a>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Things",

  data() {
    return {
      things: [],
    }
  },

  methods: {
    start: function () {

    },
    isCurrentThing(path) {
      return this.$route.params.thing ? path === this.$route.params.thing : false
    },
    loadData(){
      // load database
      axios.get(`/data/things.json`).then(response => {
        this.things = response.data.things
        this.start()
      }).catch(error => {
        console.log(error)
      })
    },
  },

  created() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>