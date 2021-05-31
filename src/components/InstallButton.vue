<template>
  <div>
    <button class="flat" style="margin: 32px" v-if="show" v-on:click="install"><i class="mdi mdi-download"></i> Install this website!</button>
  </div>
</template>

<script>
export default {
  name: "InstallButton",

  data() {
    return {
      show: false,
      deferredPrompt: null
    }
  },
  
  methods: {
    install: function () {
      this.deferredPrompt.prompt();

      //const { outcome } = await deferredPrompt.userChoice;
      // Optionally, send analytics event with outcome of user choice
      //console.log(`User response to the install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      //this.deferredPrompt = null;
    }
  },

  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      //e.preventDefault();

      this.deferredPrompt = e;

      this.show = true;
    });
  }
}
</script>

<style scoped>

</style>