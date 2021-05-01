let hljs = require('highlight.js');

const emoji = require('markdown-it-emoji')
const mdi = require('markdown-it-mdi');
const video = require('markdown-it-video')
const { html5Media } = require('markdown-it-html5-media');

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

md.use(emoji).use(mdi).use(video).use(html5Media)

let markdown = function (string) {
    return md.render(string)
}

export {markdown}