<template>
  <div>
    <router-view></router-view>
    <div class="floatingActionButtonContainer">
      <ThemeSwitcher></ThemeSwitcher>
      <ShareButton></ShareButton>
    </div>
  </div>
</template>

<script>
import ThemeSwitcher from "./components/ThemeSwitcher";
import ShareButton from "./components/ShareButton";
export default {
  name: "App",
  components: {ShareButton, ThemeSwitcher},
}
</script>

<style scoped>

</style>