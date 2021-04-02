import {Random, WeightedRandom} from "./random";
import {Keyword} from "./keywords";

const dayTextList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

class Day {
    date;
    randomInput;
    random = 0;
    data;
    dayData;
    keywords = [];

    constructor(date, data) {this.set(date, data)}

    set(date, data) {
        if(date != null && data != null) {
            this.date = date;// get Date from unix timestamp
            this.data = data;

            // generate randomness
            this.randomInput = Math.floor((this.date.getTime() + process.env.VUE_APP_DAY_OFFSET) / process.env.VUE_APP_DAY_DURATION)
            this.random = Random(this.randomInput)

            // select day data
            this.dayData = WeightedRandom(this.random, [2, 1]) ?
                this.dayList[WeightedRandom(this.random, this.dayList.map((d) => d.weight))] :
                this.data.any[WeightedRandom(this.random, this.data.any.map((d) => d.weight))];

            //create keywords
            this.createKeywords()

            // replace null
            if (this.dayData.title == null) this.dayData.title = `# {{current_day_text}}`
            if (this.dayData.text == null) this.dayData.text = ""

            // replace keywords
            this.keywords.forEach((k) => {
                this.dayData.title = k.replaceInString(this.title)
                this.dayData.text = k.replaceInString(this.text)
            })
        }
    }

    createKeywords() {
        this.keywords.push(new Keyword("current_day_text", dayTextList[this.dayIndex]))
        this.keywords.push(new Keyword("random_day_text", dayTextList[Math.floor(this.random*6)]))
        this.keywords.push(new Keyword("random_float", `${this.random}`))
        this.keywords.push(new Keyword("random_float2", `${Math.round(this.random*100)/100}`))
        this.keywords.push(new Keyword("random_binary", `${Math.round(this.random)}`))
        this.keywords.push(new Keyword("random_bool", `${!!Math.round(this.random)}`))
    }

    get title() {return this.dayData != null ? this.dayData.title : ""}
    get text() {return this.dayData != null ? this.dayData.text : ""}
    get author() {return this.dayData != null ? this.dayData.author : ""}

    get dayIndex() {return this.date != null ? this.date.getDay() : 0}
    get dayList() {return this.data != null && this.date != null ? this.data.days[this.dayIndex] : []}
    get colorHue() {return this.random * 360;}
    get colorHsl() {return `hsl(${this.colorHue},100%,50%)`}
    get colorHueInverted() {return (this.colorHue + 180) % 360;}
    get colorHslInverted() {return `hsl(${this.colorHueInverted},100%,50%)`}
}

export {Day}