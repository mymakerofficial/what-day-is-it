<template>
  <div>
    <div>
      <a v-for="button in this.buttons" :key="button.text" :href="button.path" class="navButton">{{button.text}}</a>
    </div>
  </div>

</template>

<script>
export default {
  name: "NavButtons",

  props: ["buttons"]
}
</script>

<style scoped>

</style>