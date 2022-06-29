var process = require('process')
var args = process.argv.slice(2)

if(args.length != 4) {
    console.log(`\n\nWrong argumants list\n\n[e/d] [to process] [exit] [passcode]\nencode or decode\nfile to process\nexit file\npasscode\n\n`)
    return
}

if(args[0] === 'e') {

    var Encode = require('./scripts/encode.js')
    var encoder = new Encode((data) => {
        var sha512 = require('js-sha512').sha512
        return sha512(data)
    })

    var fs = require('fs')
    var data = fs.readFileSync(args[1], 'binary', () => {}).toString('utf-8')

    data = encoder.do(data, args[3])

    fs.writeFileSync(args[2], data.toString('binary'), 'binary', () => {})

} else if(args[0] === 'd') {


    var Decode = require('./scripts/decode.js')
    var decoder = new Decode((data) => {
        var sha512 = require('js-sha512').sha512
        return sha512(data)
    })

    var fs = require('fs')
    var data = fs.readFileSync(args[1], 'binary', () => {}).toString('utf-8')

    data = decoder.do(data, args[3])

    fs.writeFileSync(args[2], data.toString('binary'), 'binary', () => {})
}