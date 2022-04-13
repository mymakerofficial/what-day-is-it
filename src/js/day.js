import {Random, WeightedRandom} from "./random";
import {Keyword} from "./keywords";

import {markdown} from "../js/markdown";
import { stripHtml } from "string-strip-html";
import {Color} from "./color";
import {getDateFromDate} from "./date";

const dayTextList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

let isSameDay = function (d1, d2) {
    try {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
    } catch (error) {
        return false
    }
}

class Day {
    date;
    randomInput;
    random = 0;
    title = "";
    text = "";
    author = "";
    authors = [];
    keywords = [];
    dayData = {};
    color = new Color();

    noData = false;
    invalidDate = false;

    constructor(date, data) {this.set(date, data)}

    set(date, data) {
        if(date != null && data != null) {
            this.date = getDateFromDate(date);
            this._data = data

            // generate randomness
            this.randomInput = this.date.getTime()
            this.random = Random(this.randomInput)

            // select day data
            this.setDayData()

            //set color
            this.color.originalHue = this.random * 360

            if(!this.invalidDate){
                //create keywords
                this.createKeywords()

                this.replaceKeywords()
            }
        }
    }

    getFilteredList() {
        // get list of all data for any day and day specific
        let list = this._data.any.concat(this._data.days[this.dayIndex])

        let timestampToday = this.date.getTime() / 1000

        // remove all data that was made *after* specified date
        list = list.filter(e => e.created_timestamp <= timestampToday);

        return list;
    }

    setDayData() {
        if(isNaN(this.date)){ // checks for invalid date
            this.dayData = {"title": "# ???","text": null,"author": null,"weight": 20,"created_timestamp": 0};
            this.invalidDate = true;
        }else{
            let list = this.getFilteredList();

            if(list.length === 0) { // checks for no data
                this.dayData = {"title": null,"text": null,"author": null,"weight": 20,"created_timestamp": 0};
                this.noData = true;
            }else {
                // get data for specified day
                this.dayData = list[WeightedRandom(this.random, list.map((d) => d.weight))];
            }
        }

        this.title = this.dayData.title
        this.text = this.dayData.text
        this.author = this.dayData.author
        this.authors.push(this.author)
    }

    replaceKeywords() {
        // replace null
        if (this.title == null || this.title == "") this.title = `# {{current_day_text}}`
        if (this.text == null) this.text = ""

        // replace keywords
        this.keywords.forEach((k) => {
            let title = k.replaceInString(this.title)
            let text = k.replaceInString(this.text)
            this.title = title.string
            this.text = text.string
            if(title.found && !this.authors.includes(title.author) && title.author !== null) this.authors.push(title.author)
            if(text.found && !this.authors.includes(text.author) && title.author !== null) this.authors.push(text.author)
        })
    }

    containsKeywords(input){
        if(input == null) return false
        let found = false;
        this.keywords.forEach((k) => {
            if(k.replaceInString(input).found) found = true
        })
        return found
    }

    createKeywords() {
        this.keywords = []

        //days
        this.keywords.push(new Keyword("current_day_text", new Intl.DateTimeFormat('en', { weekday: 'long' }).format(this.date)))
        this.keywords.push(new Keyword("current_day_text_short", new Intl.DateTimeFormat('en', { weekday: 'short' }).format(this.date)))
        this.keywords.push(new Keyword("current_day_text_narrow", new Intl.DateTimeFormat('en', { weekday: 'narrow' }).format(this.date)))
        this.keywords.push(new Keyword("current_month_text", new Intl.DateTimeFormat('en', { month: 'long' }).format(this.date)))
        this.keywords.push(new Keyword("current_month_text_short", new Intl.DateTimeFormat('en', { month: 'short' }).format(this.date)))
        this.keywords.push(new Keyword("current_month_text_narrow", new Intl.DateTimeFormat('en', { month: 'narrow' }).format(this.date)))
        this.keywords.push(new Keyword("current_day_index_start_mo", `${(((this.dayIndex-1)% 6) + 6) % 6}`))
        this.keywords.push(new Keyword("random_day_text", dayTextList[Math.floor(this.random*6)]))
        this.keywords.push(new Keyword("current_date_formatted", this.date.toLocaleDateString("de-de")))
        this.keywords.push(new Keyword("current_date_year", `${this.date.getFullYear()}`))
        this.keywords.push(new Keyword("current_date_month", `${this.date.getMonth()+1}`))
        this.keywords.push(new Keyword("current_date_day", `${this.date.getDate()}`))
        this.keywords.push(new Keyword("current_utc_day_unixtimestamp", `${this.date.getTime() / 1000}`))

        //random format
        this.keywords.push(new Keyword("random_float", `${this.random}`))
        this.keywords.push(new Keyword("random_float2", `${Math.round(this.random*100)/100}`))
        this.keywords.push(new Keyword("random_binary", `${Math.round(this.random)}`))
        this.keywords.push(new Keyword("random_bool", `${!!Math.round(this.random)}`))
        this.keywords.push(new Keyword("random_yes_no", `${(!Math.round(this.random)) ? 'no' : 'yes'}`))
        this.keywords.push(new Keyword("random_string", `${btoa(this.random).slice(0, -1)}`))
        this.keywords.push(new Keyword("random_int_10", `${Math.round(this.random*10)}`))
        this.keywords.push(new Keyword("random_int_100", `${Math.round(this.random*100)}`))
        this.keywords.push(new Keyword("random_int_1000", `${Math.round(this.random*1000)}`))
        this.keywords.push(new Keyword("random_int_10000", `${Math.round(this.random*10000)}`))
        this.keywords.push(new Keyword("random_int_100000", `${Math.round(this.random*100000)}`))
        this.keywords.push(new Keyword("random_int_1000000", `${Math.round(this.random*1000000)}`))

        //colors
        this.keywords.push(new Keyword("current_color_hsl", this.color.hsl))
        this.keywords.push(new Keyword("current_color_inverted_hsl", this.color.hslInverted))
        this.keywords.push(new Keyword("current_color_secondary_hsl", this.color.hslSecondaryLight))
        this.keywords.push(new Keyword("current_color_hex", this.color.hex.substring(1)))
        this.keywords.push(new Keyword("current_color_inverted_hex", this.color.hexInverted.substring(1)))
        this.keywords.push(new Keyword("current_color_secondary_hex", this.color.hexSecondaryLight.substring(1)))

        //inserts from data
        let chance = WeightedRandom(this.random, [1, 3])

        let insert_random_current_day_title = this.selectFromList(this._data.days[this.dayIndex], {titleNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_current_day_title", insert_random_current_day_title.title, insert_random_current_day_title.author))
        let insert_random_current_day_text = this.selectFromList(this._data.days[this.dayIndex], {textNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_current_day_text", insert_random_current_day_text.text, insert_random_current_day_text.author))

        let insert_random_current_day_title_chance = this.selectFromList(this._data.days[this.dayIndex], {titleNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_current_day_title_chance", chance ? insert_random_current_day_title_chance.title : `# ${dayTextList[this.dayIndex]}`, chance ? insert_random_current_day_title_chance.author : null))
        let insert_random_current_day_text_chance = this.selectFromList(this._data.days[this.dayIndex], {textNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_current_day_text_chance", chance ? insert_random_current_day_text_chance.text : "", chance ? insert_random_current_day_text_chance.author : null))

        let insert_random_any_title = this.selectFromList(this._data.any, {titleNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_any_title", insert_random_any_title.title, insert_random_any_title.author))
        let insert_random_any_text =  this.selectFromList(this._data.any, {textNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_any_text", insert_random_any_text.text, insert_random_any_text.author))

        let insert_random_any_title_chance = this.selectFromList(this._data.any, {titleNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_any_title_chance", chance ? insert_random_any_title_chance.title : `# ${dayTextList[this.dayIndex]}`, chance ? insert_random_any_title_chance.author : null))
        let insert_random_any_text_chance = this.selectFromList(this._data.any, {textNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_any_text_chance", chance ? insert_random_any_text_chance.text : "", chance ? insert_random_any_text_chance.author : null))

        let insert_random_title = this.selectFromList(this._data.days.flat().concat(this._data.any), {titleNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_title", insert_random_title.title, insert_random_title.author))
        let insert_random_text = this.selectFromList(this._data.days.flat().concat(this._data.any), {textNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_text", insert_random_text.text, insert_random_text.author))

        let insert_random_title_chance = this.selectFromList(this._data.days.flat().concat(this._data.any), {titleNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_title_chance", chance ? insert_random_title_chance.title : `# ${dayTextList[this.dayIndex]}`, chance ? insert_random_title_chance.author : null))
        let insert_random_text_chance = this.selectFromList(this._data.days.flat().concat(this._data.any), {textNotNull: true, noKeywords: true})
        this.keywords.push(new Keyword("insert_random_text_chance", chance ? insert_random_text_chance.text : "", chance ? insert_random_text_chance.author : null))

        this.keywords.push(new Keyword("random_everything", this.keywords[Math.floor(this.random*this.keywords.length)].replace))
    }

    selectFromList(list, settings) {
        let titleNotNull = settings.titleNotNull === true
        let textNotNull = settings.textNotNull === true
        let noKeywords = settings.noKeywords === true
        let fList = []
        list.forEach((d) => {
            if(noKeywords) {
                if(this.containsKeywords(d.title)) return
                if(this.containsKeywords(d.text)) return
            }
            if(titleNotNull && d.title === null) return
            if(textNotNull && d.text === null) return

            fList.push(d)
        })
        if(!fList.length) return {title: null,text: null,author: null}
        let d = fList[WeightedRandom(this.random, fList.map((d) => d.weight))]
        return d
    }

    static getPathFromDate(date) {
        try {
            return `/${date.getFullYear()}/${('0'+(date.getMonth()+1)).slice(-2)}/${('0'+date.getDate()).slice(-2)}`
        } catch (error) {
            return `/`
        }
    }

    get titleStriped() {return stripHtml(markdown(this.title)).result.replace(/(\r\n|\n|\r)/gm, ""); }
    get textStriped() {return stripHtml(markdown(this.text)).result.replace(/(\r\n|\n|\r)/gm, ""); }
    get titleStripedCompletely() {return this.titleStriped.replaceAll(/\s/g,''); }
    get textStripedCompletely() {return this.textStriped.replaceAll(/\s/g,''); }
    get titleStripedHtml() {return stripHtml(this.title).result }
    get textStripedHtml() {return stripHtml(this.text).result }
    get titleEmptyStriped() {return this.title !== '' && this.titleStripedCompletely === ''}
    get textEmptyStriped() {return this.text !== '' && this.textStripedCompletely === ''}

    get titleFormatted() {return markdown(this.title)}
    get textFormatted() {return markdown(this.text)}

    get path() {
        return Day.getPathFromDate(this.date)
    }

    get dayIndex() {return this.date !== null ? this.date.getDay() : 0}

    get hasAuthor() {
        return this.authors.length > 1 ? true : this.authors[0] !== null
    }
}

export {Day, isSameDay}