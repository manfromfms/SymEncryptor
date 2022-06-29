module.exports = class Encode {
    constructor(hash) {
        this.seed = Date.now()
        this.Random = require('./random.js')
        this.hashFunction = hash
    }

    do (data, password) {
        console.log('\n\n')

        var startGenSetup = Date.now()
        console.log('Setting up random generators')

        var ranGens = [new this.Random(), new this.Random(), new this.Random(), new this.Random(), new this.Random(), new this.Random(), new this.Random(), new this.Random()]
        ranGens[0].seed = parseInt(this.hashFunction(password).slice(0, 16), 16)
        ranGens[1].seed = parseInt(this.hashFunction(password).slice(17, 32), 16)
        ranGens[2].seed = parseInt(this.hashFunction(password).slice(33, 48), 16)
        ranGens[3].seed = parseInt(this.hashFunction(password).slice(49, 64), 16)
        ranGens[4].seed = parseInt(this.hashFunction(password).slice(65, 80), 16)
        ranGens[5].seed = parseInt(this.hashFunction(password).slice(81, 96), 16)
        ranGens[6].seed = parseInt(this.hashFunction(password).slice(97, 112), 16)
        ranGens[7].seed = parseInt(this.hashFunction(password).slice(113, 128), 16)

        console.log('Generators has been set in ' + (Date.now() - startGenSetup) + 'ms')

        var startRandomise = Date.now()
        console.log('Starting to randomise data')
        var result = ''
        var j = 0
        for(let i = 0; i < data.length; i++) {
            //console.log(data.charCodeAt(i))

            result += String.fromCharCode((data.charCodeAt(i) + Math.floor(ranGens[j + 2].random() * 256)) % 256)

            if(j >= 5) j = 0

            if(ranGens[0].random() <= 0.1) {
                result += String.fromCharCode(Math.floor(ranGens[1].random() * 256) % 256)
            }
        }
        console.log('Data has been seccessfuly randomised in ' + (Date.now() - startRandomise) + 'ms')

        console.log('\n\n')
        return result
    }
}