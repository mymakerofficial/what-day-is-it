<template>
  <div>
    <Toast :title="toast.title" :text="toast.text" :time="toast.time"></Toast>
    <Header :headerTitle="pageTitle"></Header>
    <div class="container center">
      <div class="textareaContainer">
        <input :value="url" v-on:change="urlChange" ref="urlInput">
        <div class="textareaFooter center space">
          <button v-on:click="share" v-show="canShare">share</button>
          <button v-on:click="copy">copy</button>
          <router-link target=”_blank” :to="{path: path}"><button>open in new tab</button></router-link>
          <button v-on:click="randomize">randomize</button>
        </div>
      </div>
    </div>
    <LoadingSpinner :show="!loaded"></LoadingSpinner>
    <div class="dayEditorContainer" v-if="loaded">
      <div class="dayEditorHalf">
        <div class="textareaContainer">
          <div class="label">title</div>
          <textarea v-model="title" ref="inputTitle" class="dayTextInput" :style="{ height: headerHeight }" :maxlength="maxTitleLength"></textarea>
          <div class="textareaFooter right"><span class="text">{{title.length}} / {{maxTitleLength}}</span></div>
        </div>
        <div class="textareaContainer">
          <div class="label">text</div>
          <textarea v-model="text" ref="inputText" class="dayTextInput" :style="{ height: bodyHeight }" :maxlength="maxTextLength"></textarea>
          <div class="textareaFooter right"><span class="text">{{text.length}} / {{maxTextLength}}</span></div>
        </div>
        <!--<div class="textareaContainer">
          <div class="label">date</div>
          <input type="date" class="dayDateInput">
        </div>
        <div class="textareaContainer">
          <div class="label">hue</div>
          <input type="number" v-model="color.originalHue" min="0" max="360">
        </div>-->
        <div class="textareaContainer">
          <div class="label">seed</div>
          <input type="text" v-model="seed">
        </div>
      </div>
      <div class="dayEditorHalf">
        <div class="header" ref="header" :style="{ '--uiColorBackground': this.color.hsl, '--uiColorText': this.color.hslInverted }">
          <div class="headerTitle">what's the day?</div>
          <div class="headerSubtitle" v-show="false">01.01.2021</div>
          <div class="dayTitle" ref="dayTitle" v-if="titleFormatted" v-html="titleFormatted"></div>
        </div>
        <div class="body" :style="{ '--uiColorText': textColorSecondary }">
          <div class="dayText" ref="body" v-html="textFormatted"></div>
        </div>
      </div>
    </div>
    <ThemeSwitcher></ThemeSwitcher>
    <div class="container center">
      <div class="alert"><b>PROTIP!</b> All text input support full <button v-on:click="showMarkdownGuide">markdown</button> and you can make use of <button v-on:click="showKeywords">keywords</button></div>
    </div>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import {stripHtml} from "string-strip-html";
import {markdown} from "../js/markdown";
import {Color} from "../js/color";
import {Random} from "../js/random";
import {getDate, getDateFromDate} from "../js/date";
import {Day} from "../js/day";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import ThemeSwitcher from "../components/ThemeSwitcher";

String.prototype.trim = function (length) {
  return this.length > length ? this.substring(0, length) : this;
}

export default {
  name: "CustumDayEditor",
  components: {ThemeSwitcher, LoadingSpinner, Footer, Header, Toast},

  data() {
    return {
      pageTitle: "make your own day!",
      title: "# The Day",
      text: "it really do be",
      usesDate: false,
      data: {"days": [],"any":[]},
      date: new Date(),
      color: new Color(Math.round(Random(getDateFromDate(new Date()).getTime()) * 360)),
      headerHeight: "300px",
      bodyHeight: "300px",
      day: new Day(),
      loaded: false,
      seed: getDateFromDate(new Date()).getTime(),
      toast: {title: "", text: "", time: 1000},
      maxTitleLength: 400,
      maxTextLength: 1200,
    }
  },

  computed: {
    titleFormatted: function () {
      return this.day.title ? markdown(this.day.title) : ""
    },
    textFormatted: function () {
      return this.day.title ? markdown(this.day.text) : ""
    },
    encodedData: function () {
      return btoa(JSON.stringify({
        a: stripHtml(this.title).result,
        b: stripHtml(this.text).result,
        s: this.seed
      }))
    },
    path: function () {
      return `/c/${encodeURIComponent(this.encodedData)}`
    },
    url: function () {
      return `${document.location.origin}${this.path}`;
    },
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "markdown guide", path: "/markdown", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "about", path: "/about", display: true}
      ]
    },
    canShare: function () {
      return navigator.canShare
    },
    textColorSecondary: {
      get() {
        return this.$store.state.theme === 'light' ? this.color.hslSecondaryLight : this.color.hslSecondaryDark;
      }
    }
  },

  watch: {
    title: function (){
      this.update();
    },
    text: function () {
      this.update();
    },
    seed: function () {
      this.update();
    }
  },

  methods: {
    start() {
      this.day = new Day(this.date, this.data)
      this.title = this.day.title;
      this.text = this.day.text;

      this.update();
    },
    update() {
      if(this.loaded){
        //this.headerHeight = `${this.$refs.header.scrollHeight - 37}px`
        //this.bodyHeight = `${this.$refs.body.scrollHeight + 64}px`

        if(this.title.length >= this.maxTitleLength || this.text.length >= this.maxTextLength){
          this.toast.title = ""
          this.toast.text = ""
          this.toast.time = 3000
          this.$nextTick(function () {
            this.toast.title = "hold on there!"
            this.toast.text = "Your text is very long. Days should be shorter."
          });
        }else{
          this.day.title = this.title === "" ? `# {{current_day_text}}` : this.title
          this.day.text = this.text

          this.day.random = Random(this.seed)
          this.day.color.originalHue = Math.round(this.day.random * 360)

          this.color = this.day.color

          this.day.createKeywords()
          this.day.replaceKeywords()
        }
      }
    },
    urlChange() {
      if(this.$refs.urlInput.value !== this.url){
        try{
          let value = this.$refs.urlInput.value.split('/');
          if(value.length === 5 && (value[3] === "c" || value[3] === "custom")){
            let data = JSON.parse(atob(decodeURIComponent(value.slice(-1)[0])))
            let dataTitle = data.a
            let dataText = data.b
            let seed = data.s

            this.title = dataTitle
            this.text = dataText
            this.seed = seed

            this.update();

            this.toast.title = ""
            this.toast.text = ""
            this.toast.time = 2000
            this.$nextTick(function () {
              this.toast.title = "yaaayy!"
              this.toast.text = "You imported a day that you can now edit"
            });
          }else if(value.length === 6) {
            this.importDayByDate(value[3], value[4], value[5])
          }else{
            this.toast.title = ""
            this.toast.text = ""
            this.toast.time = 2000
            this.$nextTick(function () {
              this.toast.title = "hmmm"
              this.toast.text = "This link doesnt look right."
            });
          }
        }
        catch (e) {
          this.toast.title = ""
          this.toast.text = ""
          this.toast.time = 2000
          this.$nextTick(function () {
            this.toast.title = "ooops!"
            this.toast.text = "Could not decode your day."
          });
        }
      }
    },
    importDayByDate(y, m, d){
      this.seed = getDateFromDate(getDate(y, m, d)).getTime()

      let day = new Day(getDate(y, m, d), this.data)

      this.title = day.dayData.title !== null ? day.dayData.title : `# {{current_day_text}}`;
      this.text = day.dayData.text !== null  ? day.dayData.text : "";

      this.update()

      this.toast.title = ""
      this.toast.text = ""
      this.toast.time = 2000
      this.$nextTick(function () {
        this.toast.title = "yaaayy!"
        this.toast.text = "You imported a day that you can now edit"
      });
    },
    randomize() {
      this.seed = getDateFromDate(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))).getTime()

      let day = new Day(new Date, this.data)

      day.random = Random(this.seed)

      day.setDayData()
      day.createKeywords()
      day.replaceKeywords()

      this.title = day.dayData.title !== null ? day.dayData.title : `# {{current_day_text}}`;
      this.text = day.dayData.text !== null  ? day.dayData.text : "";

      this.update();
    },
    share(){
      const shareData = {
        title: "what's the day?",
        text: "A website that maybe tells you what day it is.",
        url: this.url,
      }

      try {
        navigator.share(shareData)
      } catch(err) {
        this.toast.title = ""
        this.toast.text = ""
        this.toast.time = 1000
        this.$nextTick(function () {
          this.toast.text = "could not share"
        });
      }
    },
    copy(){
      this.$refs.urlInput.select();
      document.execCommand("copy");
      if (window.getSelection) {window.getSelection().removeAllRanges();}
      else if (document.selection) {document.selection.empty();}

      this.toast.title = ""
      this.toast.text = ""
      this.toast.time = 1000
      this.$nextTick(function () {
        this.toast.title = "copied!"
        this.toast.text = "The link was copied to you clipboard."
      });
    },
    showMarkdownGuide(){
      this.toast.title = ""
      this.toast.text = ""
      this.toast.time = 2000
      this.$nextTick(function () {
        this.toast.title = "ehm this is embarrassing (‘-’*)"
        this.toast.text = "I didnt program this one yet."
      });
    },
    showKeywords(){
      this.toast.title = ""
      this.toast.text = ""
      this.toast.time = 2000
      this.$nextTick(function () {
        this.toast.title = "ehm this is embarrassing (‘-’*)"
        this.toast.text = "I didnt program this one yet."
      });
    },
    loadData(){
      // load day text database
      axios.get(`/data/days.json`).then(response => {
        this.data = response.data
        this.loaded = true
        this.start()
      }).catch(error => {
        console.log(error)
      })
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

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadData()
    })
  },

  beforeRouteUpdate(to, from, next) {
    this.loadData()
    next()
  },
}
</script>

<style scoped>

</style>
