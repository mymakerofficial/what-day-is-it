let hljs = require('highlight.js');

let emoji = require('markdown-it-emoji')

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

md.use(emoji)

let markdown = function (string) {
    return md.render(string)
}

export {markdown}