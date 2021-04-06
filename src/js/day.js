import {Random, WeightedRandom} from "./random";
import {Keyword} from "./keywords";

const hsl = require('hsl-to-hex')
const marked = require("marked");
import { stripHtml } from "string-strip-html";

const dayTextList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

class Day {
    date;
    randomInput;
    random = 0;
    title = "";
    text = "";
    author = "";
    keywords = [];

    constructor(date, data) {this.set(date, data)}

    set(date, data) {
        if(date != null && data != null) {
            this.date = date;// get Date from unix timestamp

            // generate randomness
            if(process.env.VUE_APP_ALWAYS_USE_START_OF_DAY === "true"){
                this.randomInput = this.date.getTime()
            }else{
                this.randomInput = Math.floor((this.date.getTime() + process.env.VUE_APP_DAY_OFFSET) / process.env.VUE_APP_DAY_DURATION)
            }
            this.random = Random(this.randomInput)

            // select day data
            let dayData
            if(WeightedRandom(this.random, [2, 1])){
                dayData = data.days[this.dayIndex][WeightedRandom(this.random, data.days[this.dayIndex].map((d) => d.weight))]
            }else{
                dayData = data.any[WeightedRandom(this.random, data.any.map((d) => d.weight))];
            }

            this.title = dayData.title
            this.text = dayData.text
            this.author = dayData.author

            //create keywords
            this.createKeywords()

            // replace null
            if (this.title == null) this.title = `# {{current_day_text}}`
            if (this.text == null) this.text = ""

            // replace keywords
            this.keywords.forEach((k) => {
                this.title = k.replaceInString(this.title)
                this.text = k.replaceInString(this.text)
            })
        }
    }

    createKeywords() {
        this.keywords.push(new Keyword("current_day_text", dayTextList[this.dayIndex]))
        this.keywords.push(new Keyword("current_day_index_start_mo", `${(this.dayIndex-1)%6}`))
        this.keywords.push(new Keyword("random_day_text", dayTextList[Math.floor(this.random*6)]))
        this.keywords.push(new Keyword("random_float", `${this.random}`))
        this.keywords.push(new Keyword("random_float2", `${Math.round(this.random*100)/100}`))
        this.keywords.push(new Keyword("random_binary", `${Math.round(this.random)}`))
        this.keywords.push(new Keyword("random_bool", `${!!Math.round(this.random)}`))
        this.keywords.push(new Keyword("current_color_hsl", this.colorHsl))
        this.keywords.push(new Keyword("current_color_inverted_hsl", this.colorHslInverted))
        this.keywords.push(new Keyword("current_color_hex", this.colorHex.substring(1)))
        this.keywords.push(new Keyword("current_color_inverted_hex", this.colorHexInverted.substring(1)))
    }

    get titleStriped() {return stripHtml(marked(this.title)).result }
    get textStriped() {return stripHtml(marked(this.text)).result }

    get path() {return `/${this.date.getFullYear()}/${('0'+(this.date.getMonth()+1)).slice(-2)}/${('0'+this.date.getDate()).slice(-2)}`}

    get dayIndex() {return this.date != null ? this.date.getDay() : 0}
    get colorHue() {return this.random * 360;}
    get colorHsl() {return `hsl(${this.colorHue},100%,50%)`}
    get colorHex() {return hsl(this.colorHue,100,50)}
    get colorHueInverted() {return (this.colorHue + 180) % 360;}
    get colorHslInverted() {return `hsl(${this.colorHueInverted},100%,50%)`}
    get colorHexInverted() {return hsl(this.colorHueInverted,100,50)}
}

export {Day}