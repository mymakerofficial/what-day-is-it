<template>
  <div class="floatingActionButton" id="share-button"><i :class="`mdi mdi-share-variant`"></i><span> Share</span></div>
</template>

<script>
export default {
  name: "ShareButton",

  computed: {
    shareData: {
      get() {
        return {
          url: this.$store.state.shareUrl,
          title: this.$store.state.pageTitle
        }
      }
    }
  },

  created() {
    this.$nextTick(() => {
      document.getElementById("share-button").addEventListener('click', async () => {
        try {
          await navigator.share(this.shareData)
        } catch(err) {
          console.log(err)
        }
      });
    })
  }
}
</script>

<style scoped>

</style>