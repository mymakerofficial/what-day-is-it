const replaceString = require('replace-string');

class Keyword {
    scope;
    replace;

    constructor(scope, replace) {
        this.scope = scope;
        this.replace = replace;
    }

    replaceInString(string){
        return replaceString(string, `{{${this.scope}}}`, this.replace)
    }
}

export {Keyword}