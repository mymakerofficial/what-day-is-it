<template>
  <div>
    <dic class="footerContainer">
      <div class="footer">
        <div class="footerSection">
            <a v-for="button in this.navButtons" :key="button.text" :href="button.path" class="navButton" :style="{display: button.display ? '' : 'none'}">{{button.text}}</a>
        </div>
        <div class="footerSection">
          <div class="footerText">made with &#60;3 <span class="mdi mdi-heart"></span> by <b>My_Maker</b></div><div class="footerText" v-if="text" v-html="text"></div>
        </div>
      </div>
    </dic>
  </div>
</template>

<script>
export default {
  name: "DayFooter",

  props: ["navButtons","text"]
}
</script>

<style scoped>

</style>