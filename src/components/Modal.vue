<template>
  <div class="modalContainer" v-if="visible">
    <div class="modal">
      <div class="modalHeader">
        <span>
          <span class="modalTitle">{{title}}</span>
          <span class="modalSubtitle" v-if="subtitle" v-html="subtitle"></span>
        </span>
        <i class="mdi mdi-close modalExit" v-on:click="emitClose" aria-label="Close modal"></i>
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

  props: ["show","title","subtitle"],

  data() {
    return {
      visible: false
    }
  },

  watch: {
    show: function (){
      if(this.show){
        this.open()
      }else{
        this.close()
      }
    }
  },

  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;

    },
    emitClose() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>