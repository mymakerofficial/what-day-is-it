const replaceString = require('replace-string');

class Keyword {
    scope;
    replace;
    author;

    constructor(scope, replace, author = null) {
        this.scope = scope;
        this.replace = replace;
        this.author = author
    }

    replaceInString(string){
        let replace = replaceString(string, `{{${this.scope}}}`, this.replace)
        return {string: replace, found: string !== replace, author: this.author}
    }
}

export {Keyword}