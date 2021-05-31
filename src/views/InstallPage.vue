<template>
  <div>
    <Header headerTitle="install this website"></Header>
    <div class="container center">
      <p>You can install this website as an "app" on your device and access it without opening your browser. It even works offline!</p>
      <InstallButton></InstallButton>
      <h6><b>No button showing?</b> Your browser or device might not support Progressive Web App's. Don't worry, you can still use what's the day in your browser like normal.</h6>
    </div>
  </div>
</template>

<script>
import InstallButton from "../components/InstallButton";
import Header from "../components/Header";
export default {
  name: "InstallPage",
  components: {Header, InstallButton},

  data() {
    return {
      title: `install this page`
    }
  }
}
</script>

<style scoped>

</style>