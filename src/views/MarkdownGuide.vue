<template>
  <div>
    <Header :headerTitle="headerTitle" :title="title" :backgroundColor="this.currentDay.color.hsl" :textColor="this.currentDay.color.hslInverted"></Header>
    <div class="container">
      <h4>Basics</h4>
      <table style="width:100%">
        <thead>
          <tr>
            <th>Element</th>
            <th>Markdown Syntax</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b><a href="https://www.markdownguide.org/basic-syntax/#headings">Heading</a></b></td>
            <td>
              # H1<br>
              ## H2<br>
              ### H3<br>
              ...<br>
              ###### H6<br>
            </td>
          </tr>
          <tr>
            <td><b><a href="https://www.markdownguide.org/basic-syntax/#bold">Bold</a></b></td>
            <td>**bold text**</td>
            <td><b>bold text</b></td>
          </tr>
          <tr>
            <td><b><a href="https://www.markdownguide.org/basic-syntax/#italic">Italic</a></b></td>
            <td>*italic text*</td>
            <td><i>italic text</i></td>
          </tr>
          <tr>
            <td><b><a href="https://www.markdownguide.org/extended-syntax/#strikethrough">Strikethrough</a></b></td>
            <td>~~this is wrong~~</td>
            <td><s>this is wrong</s></td>
          </tr>
          <tr>
            <td><b>Underline</b></td>
            <td>_important_</td>
            <td><u>important</u></td>
          </tr>
          <tr>
            <td>
              <b><a href="https://www.markdownguide.org/extended-syntax/#emoji">Emoji</a></b><br>
              <a href="http://s.maiker.de/emojilist">list of all emoji shortcodes</a><br>
              Find emojis on <a href="https://emojipedia.org">emojipedia.org</a><br>
            </td>
            <td>:heart:</td>
            <td>❤️</td>
          </tr>
        </tbody>
      </table>
      <h4>Media</h4>
      <table style="width:100%">
        <thead>
          <tr>
            <th>Element</th>
            <th>Markdown Syntax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b><a href="https://www.markdownguide.org/basic-syntax/#links">Link</a></b></td>
            <td>[title](https://www.example.com)</td>
          </tr>
          <tr>
            <td><b><a href="https://www.markdownguide.org/basic-syntax/#images-1">Image</a></b></td>
            <td>![alt text](example.jpg)</td>
          </tr>
          <tr>
            <td><b>Video</b></td>
            <td>![alt text](example.mp4)</td>
          </tr>
          <tr>
            <td><b>Audio</b></td>
            <td>![alt text](example.mp3)</td>
          </tr>
          <tr>
            <td><b><a href="https://github.com/CenterForOpenScience/markdown-it-video#youtube">YouTube</a></b></td>
            <td>@[youtube](dQw4w9WgXcQ)</td>
          </tr>
        </tbody>
      </table>
      <h4>Code</h4>
      <table style="width:100%">
        <thead>
        <tr>
          <th>Element</th>
          <th>Markdown Syntax</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><b><a href="https://www.markdownguide.org/basic-syntax/#code">Code</a></b></td>
          <td>`code`</td>
        </tr>
        <tr>
          <td>
            <b><a href="https://www.markdownguide.org/extended-syntax/#fenced-code-blocks">Fenced Code Block</a></b><br>
            <i>(supports syntax highlighting)</i>
          </td>
          <td>
            ```json<br>
            {<br>
            "title": "Friday",<br>
            "text": "Invented in 1768 by greek scientist Ivan Friday.",<br>
            "author": null,<br>
            }<br>
            ```<br>
          </td>
        </tr>
        </tbody>
      </table>
      <h4>Lists</h4>
      <table style="width:100%">
        <thead>
          <tr>
            <th>Element</th>
            <th>Markdown Syntax</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b><a href="https://www.markdownguide.org/basic-syntax/#ordered-lists">Ordered List</a></b></td>
            <td>
              1. First item<br>
              2. Second item<br>
              3. Third item<br>
            </td>
            <td>
              <ol>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ol>
            </td>
          </tr>
          <tr>
            <td><b><a href="https://www.markdownguide.org/basic-syntax/#unordered-lists">Unordered List</a></b></td>
            <td>
              - First item<br>
              - Second item<br>
              - Third item<br>
            </td>
            <td>
              <ul>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <h4>Other</h4>
      <table style="width:100%">
        <thead>
        <tr>
          <th>Element</th>
          <th>Markdown Syntax</th>
          <th>Output</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td><b><a href="https://www.markdownguide.org/extended-syntax/#tables">Table</a></b></td>
            <td>
              | Header | Title |<br>
              | -------- | -------- |<br>
              | Paragraph | Text |<br>
              | Paragraph | Text |<br>
            </td>
          </tr>
          <tr>
            <td><b><a href="https://www.markdownguide.org/basic-syntax/#blockquotes-1">Blockquote</a></b></td>
            <td>> blockquote</td>
            <td><blockquote>blockquote</blockquote></td>
          </tr>
          <tr>
            <td><b><a href="https://materialdesignicons.com/">Material Design Icons</a></b></td>
            <td>:mdi-account:</td>
            <td><i class="mdi mdi-account"></i></td>
          </tr>
          <tr>
            <td><b>Superscript</b></td>
            <td>29^th^</td>
            <td>29<sup>th</sup></td>
          </tr>
          <tr>
            <td><b>Marked</b></td>
            <td>==marked==</td>
            <td><mark>marked</mark></td>
          </tr>
          <tr>
            <td><b>Spoiler</b></td>
            <td>!!spoiler!!</td>
            <td><span class="spoiler">spoiler</span></td>
          </tr>
        </tbody>
      </table>
      <h4>Formatting</h4>
      <table style="width:100%">
        <thead>
        <tr>
          <th>Element</th>
          <th>Syntax</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><b>New Line</b></td>
          <td>\n</td>
        </tr>
        <tr>
          <td><b>Tab</b></td>
          <td>\t</td>
        </tr>
        </tbody>
      </table>
    </div>
    <Footer :navButtons="navButtons"></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import {Day} from "../js/day";
import axios from "axios";

export default {
  name: "MarkdownGuide",
  components: {Footer, Header},

  data() {
    return {
      headerTitle: "Markdown Guide",
      title: '#### **_Markdown_** makes your text look **good**!',
      data: {"days": [],"any":[]},
      date: new Date(),
      currentDay: new Day(),
    }
  },

  computed: {
    navButtons: function () {
      return [
        {text: "today", path: "/", display: true},
        {text: "day forecast", path: "/forecast", display: true},
        {text: "custom day", path: "/custom", display: true},
        {text: "about", path: "/about", display: true}
      ]
    }
  },

  methods: {
    start: function () {
      //get start of day
      if(process.env.VUE_APP_ALWAYS_USE_START_OF_DAY === "true" && !this.setDay){
        let date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth()+1
        this.day = date.getDate()
      }

      //get date
      if(this.year !== undefined && this.month !== undefined && this.day !== undefined) this.date = new Date(this.year, this.month-1, this.day, 0, 0, 0, 0);


      //start day
      this.currentDay.set(this.date, this.data)
    },
    loadData(){
      // load day text database
      axios.get(`/data/days.json`).then(response => {
        this.data = response.data
        this.start()
      }).catch(error => {
        console.log(error)
      })
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadData()
    })
  },

  beforeRouteUpdate(to, from, next) {
    this.loadData()
    next()
  }
}
</script>

<style scoped>

</style>