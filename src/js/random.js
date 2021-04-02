const stringHash = require("string-hash");

function Random(input) {
    return stringHash(`${input}`) / 4294967295// hash time and make it a value between 0 and 1;
}

function normalizeWeights(weights){
    let normalized = [], sum = weights.reduce((acc, cur) => (acc + cur))
    weights.forEach((w) => {normalized.push(w / sum)})
    return normalized
}

function WeightedRandom(random, weights) {
    let w = normalizeWeights(weights), s = 0

    for (let i = 0; i < w.length - 1; ++i) {
        s += w[i];
        if (random < s) {
            return i
        }
    }

    return w.length - 1
}

export {Random, WeightedRandom}