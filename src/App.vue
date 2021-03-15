<template>
  <div id="app">
    <DayContainer></DayContainer>
  </div>
</template>

<script>
import DayContainer from "@/components/DayContainer";

export default {
  name: 'App',
  components: {
    DayContainer,
  }
}
</script>

<style lang="scss">
@import "@/sass/app.scss";
</style>