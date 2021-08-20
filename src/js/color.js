import hsl from "hsl-to-hex";

//const forbidden = [[10,70],[185,220]] // this blocks to many colors
//const forbidden = [[23,52]]
//const forbidden = [[23,33]]
const light = [[50,200]]
const dark = [[10,40],[210,290]]

let hueInside = function (hue, list) {
    let inside = false
    list.forEach((l) => {
        if (hue % 360 >= l[0] && hue % 360 <= l[1]) inside = true
    })
    return inside
}

let rotateHue = function (hue,deg) {
    return (hue + deg) % 360
}

let invertHue = function (hue) {
    return rotateHue(hue, 180)
}

class Color {
    originalHue = 0;
    constructor(hue){
        this.originalHue = hue;
    }
    //get hue() {return Math.round(hueInside(this.originalHue, forbidden) ? rotateHue(this.originalHue,90) : this.originalHue)}
    get hue() {return Math.round(this.originalHue)}
    get hueInverted() {return invertHue(this.hue)}
    get hueSecondaryLight() {return hueInside(this.hueInverted, light) ? invertHue(this.hueInverted) : this.hueInverted}
    get hueSecondaryDark() {return hueInside(this.hueInverted, dark) ? invertHue(this.hueInverted) : this.hueInverted}
    // hsl
    get hsl() {return `hsl(${this.hue},100%,50%)`}
    get hslInverted() {return `hsl(${this.hueInverted},100%,50%)`}
    get hslSecondaryLight() {return `hsl(${this.hueSecondaryLight},100%,50%)`}
    get hslSecondaryDark() {return `hsl(${this.hueSecondaryDark},100%,50%)`}
    // hex
    get hex() {return hsl(this.hue,100,50)}
    get hexInverted() {return hsl(this.hueInverted,100,50)}
    get hexSecondaryLight() {return hsl(this.hueSecondaryLight,100,50)}
    get hexSecondaryDark() {return hsl(this.hueSecondaryDark,100,50)}
}

export { Color }