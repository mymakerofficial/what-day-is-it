<template>
  <div>
    <div class="footerContainer">
      <Things v-show="things" :showAll="false"></Things>
      <div class="footer" ref="container">
        <div class="footerSection" v-if="dayDate">
          <!--<div v-if="dayDifference !== 0"><small>you are <b>{{ Math.abs(dayDifference) }}</b> days in the {{ dayDifference >= 0 ? "future" : "past" }}</small></div>-->
          <router-link class="button" :to="{path: this.previousDayPath}"><i class="mdi mdi-arrow-left"></i> previous day [n]</router-link>
          <small v-if="dayDifference !== 0 && dayDifference < 7">{{ (!(dayDifference >= 0) ? "" : "+") + dayDifference }}</small>
          <router-link class="button" :to="{path: this.nextDayPath}" v-if="allowNextDayLink">next day [m] <i class="mdi mdi-arrow-right"></i></router-link>
          <small v-else>[you can only look ahead one week]</small>
        </div>
        <div class="footerSection">
          <EditThisDayButton></EditThisDayButton>
          <InstallButton></InstallButton>
        </div>
        <div class="footerSection" id="footerButtons">
            <router-link v-for="button in this.buttons" :key="button.text" :to="{path: button.path}" class="navButton" ref="navButton">{{button.text}}</router-link>
        </div>
        <div class="footerSection">
          <div class="footerText">made with <i class="mdi mdi-heart"></i> by <b><a href="https://maiker.de">My_Maker</a></b></div><div class="footerText" v-if="text" v-html="text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";
import Things from "./Things";
import InstallButton from "./InstallButton";
import EditThisDayButton from "./EditThisDayButton";
import {Day} from "@/js/day";
import {getDateFromDate} from "@/js/date";

export default {
  name: "Footer",
  components: {EditThisDayButton, InstallButton, Things},
  props: ["text", "navButtons", "displayThings", "dayDate"],

  data() {
    return {
      navEvent: null,
    };
  },

  computed: {
    buttons: function () {
      return this.navButtons.filter(button => button.display)
    },
    things: function () {
      return this.displayThings === undefined ? true : this.displayThings
    },
    previousDayPath: function () {
      if(!this.dayDate) return "/";
      return Day.getPathFromDate(this.addDays(this.dayDate, -1))
    },
    nextDayPath: function () {
      if(!this.dayDate) return "/";
      return Day.getPathFromDate(this.addDays(this.dayDate, 1))
    },
    allowNextDayLink: function () {
      if(!this.dayDate) return false;
      return this.addDays(getDateFromDate(new Date()), 7) > this.dayDate;
    },
    dayDifference: function () {
      return (this.dayDate - getDateFromDate(new Date())) / 86400000
    }
  },

  watch: {
    $route (){
      this.animate()
    }
  },

  methods: {
    animate() {
      this.$nextTick(function () {
        anime({
          targets: this.$refs.container,
          scale: [0.9,1],
          rotate: [2, 0],
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 700,
          easing: 'easeOutElastic(.6, 1)',
          autostart: true,
        })
      });
    },
    addDays(dateTime, count_days = 0){
      return new Date(new Date(dateTime).setDate(new Date(dateTime).getDate() + count_days));
    },
  },

  mounted() {
    this.animate()

    this.navEvent = (e) => {
      if(!this.dayDate) return;

      if(e.key.toLowerCase() === "n") {
        this.$router.push(this.previousDayPath)
      } else if(e.key.toLowerCase() === "m") {
        if (this.allowNextDayLink) this.$router.push(this.nextDayPath)
      }
    }

    document.addEventListener("keyup", this.navEvent)
  },

  beforeDestroy() {
    document.removeEventListener("keyup", this.navEvent)
  }
}
</script>

<style scoped>

</style>