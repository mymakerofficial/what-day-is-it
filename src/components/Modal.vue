<template>
  <div class="modalContainer" v-if="show">
    <div class="modal">
      <div class="modalHeader">
        <span>Markdown Guide</span>
        <i class="mdi mdi-close modalExit" v-on:click="close"></i>
      </div>
      <div class="modalBody">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",

  data() {
    return {
      show: true
    }
  },

  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
}
</script>

<style scoped>

</style>