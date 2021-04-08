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
    dayData = {};

    constructor(date, data) {this.set(date, data)}

    set(date, data) {
        if(date != null && data != null) {
            this.date = date;// get Date from unix timestamp
            this._data = data

            // generate randomness
            if(process.env.VUE_APP_ALWAYS_USE_START_OF_DAY === "true"){
                this.randomInput = this.date.getTime()
            }else{
                this.randomInput = Math.floor((this.date.getTime() + process.env.VUE_APP_DAY_OFFSET) / process.env.VUE_APP_DAY_DURATION)
            }
            this.random = Random(this.randomInput)

            // select day data
            if(WeightedRandom(this.random, [2, 1])){
                this.dayData = this._data.days[this.dayIndex][WeightedRandom(this.random, this._data.days[this.dayIndex].map((d) => d.weight))]
            }else{
                this.dayData = this._data.any[WeightedRandom(this.random, this._data.any.map((d) => d.weight))];
            }

            this.title = this.dayData.title
            this.text = this.dayData.text
            this.author = this.dayData.author

            //create keywords
            this.createKeywords()

            this.replaceKeywords()
        }
    }

    replaceKeywords() {
        // replace null
        if (this.title == null) this.title = `# {{current_day_text}}`
        if (this.text == null) this.text = ""

        // replace keywords
        this.keywords.forEach((k) => {
            this.title = k.replaceInString(this.title)
            this.text = k.replaceInString(this.text)
        })
    }

    createKeywords() {
        //days
        this.keywords.push(new Keyword("current_day_text", dayTextList[this.dayIndex]))
        this.keywords.push(new Keyword("current_day_index_start_mo", `${(this.dayIndex-1)%6}`))
        this.keywords.push(new Keyword("random_day_text", dayTextList[Math.floor(this.random*6)]))
        this.keywords.push(new Keyword("current_date_formatted", this.date.toLocaleDateString("de-de")))
        this.keywords.push(new Keyword("current_date_year", `${this.date.getFullYear()}`))
        this.keywords.push(new Keyword("current_date_month", `${this.date.getMonth()+1}`))
        this.keywords.push(new Keyword("current_date_day", `${this.date.getDate()}`))

        //random format
        this.keywords.push(new Keyword("random_float", `${this.random}`))
        this.keywords.push(new Keyword("random_float2", `${Math.round(this.random*100)/100}`))
        this.keywords.push(new Keyword("random_binary", `${Math.round(this.random)}`))
        this.keywords.push(new Keyword("random_bool", `${!!Math.round(this.random)}`))
        this.keywords.push(new Keyword("random_int_10", `${Math.round(this.random*10)}`))
        this.keywords.push(new Keyword("random_int_100", `${Math.round(this.random*100)}`))
        this.keywords.push(new Keyword("random_int_1000", `${Math.round(this.random*1000)}`))
        this.keywords.push(new Keyword("random_int_10000", `${Math.round(this.random*10000)}`))
        this.keywords.push(new Keyword("random_int_100000", `${Math.round(this.random*100000)}`))

        //colors
        this.keywords.push(new Keyword("current_color_hsl", this.colorHsl))
        this.keywords.push(new Keyword("current_color_inverted_hsl", this.colorHslInverted))
        this.keywords.push(new Keyword("current_color_hex", this.colorHex.substring(1)))
        this.keywords.push(new Keyword("current_color_inverted_hex", this.colorHexInverted.substring(1)))

        //inserts from data
        this.keywords.push(new Keyword("insert_random_current_day_title", this.selectFromList(this._data.days[this.dayIndex], {titleNotNull: true}).title))
        this.keywords.push(new Keyword("insert_random_current_day_text", this.selectFromList(this._data.days[this.dayIndex], {textNotNull: true}).text))

        this.keywords.push(new Keyword("insert_random_current_day_title_chance", WeightedRandom(this.random, [1, 3]) ? this.selectFromList(this._data.days[this.dayIndex], {titleNotNull: true}).title : `# ${dayTextList[this.dayIndex]}`))
        this.keywords.push(new Keyword("insert_random_current_day_text_chance", WeightedRandom(this.random, [1, 3]) ? this.selectFromList(this._data.days[this.dayIndex], {textNotNull: true}).text : ""))

        this.keywords.push(new Keyword("insert_random_any_title", this.selectFromList(this._data.any, {titleNotNull: true}).title))
        this.keywords.push(new Keyword("insert_random_any_text", this.selectFromList(this._data.any, {textNotNull: true}).text))

        this.keywords.push(new Keyword("insert_random_any_title_chance", WeightedRandom(this.random, [1, 3]) ? this.selectFromList(this._data.any, {titleNotNull: true}).title : `# ${dayTextList[this.dayIndex]}`))
        this.keywords.push(new Keyword("insert_random_any_text_chance", WeightedRandom(this.random, [1, 3]) ? this.selectFromList(this._data.any, {textNotNull: true}).text : ""))

        this.keywords.push(new Keyword("insert_random_text", `insert_random_text`))
        this.keywords.push(new Keyword("insert_random_title", `insert_random_title`))

        this.keywords.push(new Keyword("random_everything", this.keywords[Math.floor(this.random*this.keywords.length)].replace))
    }

    selectFromList(list, settings) {

        let titleNotNull = settings.titleNotNull === true
        let textNotNull = settings.textNotNull === true
        let fList = []
        list.forEach((d) => {
            if(titleNotNull && d.title === null) return
            if(textNotNull && d.text === null) return
            fList.push(d)
        })
        if(!fList.length) return {title: null,text: null,author: null}
        let d = fList[WeightedRandom(this.random, fList.map((d) => d.weight))]
        return d
    }

    get titleStriped() {return stripHtml(marked(this.title)).result }
    get textStriped() {return stripHtml(marked(this.text)).result }
    get titleStripedHtml() {return stripHtml(this.title).result }
    get textStripedHtml() {return stripHtml(this.text).result }

    get titleFormatted() {return marked(this.title)}
    get textFormatted() {return marked(this.text)}

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