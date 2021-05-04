<template>
  <div>
    <Header :headerTitle="pageTitle"></Header>
    <div class="container">
      <input :value="url" style="width: 100%">
      <router-link target=”_blank” :to="{path: path}"><i class="mdi mdi-open-in-new"></i></router-link>
    </div>
    <div class="dayEditorContainer">
      <div class="dayEditorHalf">
        <input type="date" id="start" name="trip-start" class="dayDateInput" v-show="false">
        <textarea v-model="title" ref="inputTitle" class="dayTextInput" :style="{ height: headerHeight }"></textarea>
        <textarea v-model="text" ref="inputText" class="dayTextInput" :style="{ height: bodyHeight }"></textarea>
      </div>
      <div class="dayEditorHalf">
        <div class="header" ref="header" :style="{ '--uiColorBackground': backgroundColor, '--uiColorText': textColor }">
          <div class="headerTitle">your own day!</div>
          <div class="headerSubtitle" v-show="false">01.01.2021</div>
          <div class="dayTitle" ref="dayTitle" v-if="titleFormatted" v-html="titleFormatted"></div>
        </div>
        <div class="body" ref="body">
          <div class="dayText" ref="body" v-html="textFormatted"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <Footer :navButtons="navButtons"></Footer>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import {stripHtml} from "string-strip-html";
import {markdown} from "../js/markdown";

export default {
  name: "CustumDayEditor",
  components: {Footer, Header},

  data() {
    return {
      pageTitle: "make your own day",
      title: "# The Day",
      text: "it really do be",
      year: "0",
      month: "0",
      day: "0",
      usesDate: false,
      backgroundColor: "",
      textColor: "",
      headerHeight: "300px",
      bodyHeight: "300px"
    }
  },

  computed: {
    titleFormatted: function () {
      return this.title ? markdown(this.title) : ""
    },
    textFormatted: function () {
      return this.title ? markdown(this.text) : ""
    },
    encodedData: function () {
      return btoa(JSON.stringify({
        a: stripHtml(this.title).result,
        b: stripHtml(this.text).result
      }))
    },
    path: function () {
      return `/c/${this.encodedData}`
    },
    url: function () {
      return `${document.location.origin}${this.path}`
    },
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "markdown guide", path: "/markdown", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "about", path: "/about", display: true}
      ]
    }
  },

  methods: {
    setup() {
      this.backgroundColor = "hsl(313,100%,50%)"
      this.textColor = "hsl(133,100%,50%)"

    }
  },

  beforeRouteLeave (to, from , next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  },

  mounted() {
    this.setup()
  }
}
</script>

<style scoped>

</style>