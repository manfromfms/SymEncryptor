module.exports = class Random {
    constructor() {
        this.seed = Date.now()
    }

    random() {
        var a = 90071992547409
        var b = 10000
        var c = 9007199254740991

        this.seed = (this.seed * a + b) % c

        return this.seed / c
    }
}