let hljs = require('highlight.js');

const emoji = require('markdown-it-emoji')
const mdi = require('markdown-it-mdi');
const video = require('markdown-it-video')
const { html5Media } = require('markdown-it-html5-media');
const sup = require('markdown-it-sup')
const mark = require('markdown-it-mark')
const underline = require('markdown-it-underline');
const spoiler = require("@traptitech/markdown-it-spoiler")
const kbd = require('markdown-it-kbd');


import twemoji from "twemoji"

let md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (err) {
                console.log(err)
            }
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

md.use(kbd).use(emoji).use(mdi).use(video).use(html5Media).use(sup).use(mark).use(underline).use(spoiler)

let markdown = function (string) {
    return twemoji.parse(md.render(string), {
        folder: 'svg',
        ext: '.svg'
    })
}

export {markdown}