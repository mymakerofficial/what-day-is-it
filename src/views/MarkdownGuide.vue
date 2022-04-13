<template>
  <div>
    <Header :headerTitle="headerTitle" :title="title" :backgroundColor="this.color.hsl" :textColor="this.color.hslInverted"></Header>
    <div class="container">
      <MarkdownGuideContent></MarkdownGuideContent>
    </div>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import {Day} from "../js/day";
import MarkdownGuideContent from "../components/MarkdownGuideContent";
import {Color} from "../js/color";
import {Random} from "../js/random";
import {getDateFromDate} from "../js/date";

export default {
  name: "MarkdownGuide",
  components: {MarkdownGuideContent, Footer, Header},

  data() {
    return {
      headerTitle: "Markdown Guide",
      title: '#### **_Markdown_** makes your text look **good**!',
      data: {"days": [],"any":[]},
      date: new Date(),
      currentDay: new Day(),
      color: new Color(Random(getDateFromDate(new Date()).getTime()) * 360)
    }
  },

  computed: {
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "about", path: "/about", display: true}
      ]
    }
  }
}
</script>

<style scoped>

</style>