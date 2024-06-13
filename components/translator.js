const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    britishToAmerican(text) {
        const britishToAmericanSpelling = Object.fromEntries(Object.entries(americanToBritishSpelling).map(([key, val]) => [val, key]))

        const dict = { ...britishToAmericanSpelling, ...britishOnly }
        let arr = text.split(' ');


        arr.map((word, index) => {

            const str = word.match(/[a-zA-Z:0-9']+/)
            let front = word.slice(0, str.index)
            let back = word.slice(str[0].length + front.length)
            let newWord = str[0];

            for (let x in dict) {
                if (str[0].toLowerCase() == x) {
                    newWord = `<span class="highlight">${dict[x]}</span>`;   
                }
            }

            arr[index] = front + newWord + back
        })

        arr.map((word, index) => {
            for (let x in americanToBritishTitles) {
                if (word.toLowerCase() == americanToBritishTitles[x]) {
                    arr[index] = '<span class="highlight">' + x[0].toUpperCase() + x.slice(1) + '</span>'
                }
            }
        })

        console.log(arr.join(' '))
        const spaced = Object.fromEntries(Object.entries(dict).filter(([key, val]) => key.includes(' ')))
        // console.log(spaced)
        let new_str = arr.join(' ')
        let new_arr = []
        for (let x in spaced) {
            // console.log(x)
            if (new_str.includes(x)) {
                console.log(x)
                const match = new_str.match(x)
                new_arr = new_str.split('')
                new_arr.splice(match.index, match[0].length, `<span class="highlight">${spaced[x]}</span>`)
                new_str = new_arr.join('')
            }
        }
        
        new_str = new_str.replace(/(\d+).(\d+)/g, '<span class="highlight">$1:$2</span>')
        console.log(new_str)
        // str = new_arr.join(' ')

        return new_str;

    }


    americanToBritish(text) {

        const dict = { ...americanToBritishSpelling, ...americanOnly }
        let arr = text.split(' ');

        // console.log(arr)
        arr.map((word, index) => {

            let front; let back;
            const str = word.match(/[a-zA-Z:0-9']+/)
            front = word.slice(0, str.index)
            back = word.slice(str[0].length + front.length)
            let newWord = str[0];

            for (let x in dict) {
                if (str[0].toLowerCase() == x) {
                    newWord = `<span class="highlight">${dict[x]}</span>`
                }
            }

            arr[index] = front + newWord + back
        })

        arr.map((word, index) => {
            for (let x in americanToBritishTitles) {
                if (word.toLowerCase() == x) {
                    arr[index] = '<span class="highlight">' + americanToBritishTitles[x][0].toUpperCase() + americanToBritishTitles[x].slice(1) + '</span>'
                }
            }
        })

        const spaced = Object.fromEntries(Object.entries(dict).filter(([key, val]) => key.includes(' ')))
        // console.log(spaced)
        let new_str = arr.join(' ')
        let new_arr = []
        for (let x in spaced) {
            // console.log(x)
            if (new_str.includes(x)) {
                // console.log(x)
                const match = new_str.match(x)
                new_arr = new_str.split('')
                new_arr.splice(match.index, match[0].length, `<span class="highlight">${spaced[x]}</span>`)
                new_str = new_arr.join('')
            }
        }

        new_str = new_str.replace(/(\d+):(\d+)/g, '<span class="highlight">$1:$2</span>')
        // str = new_arr.join(' ')
        console.log(new_str)
        // return (new_arr == [] ? arr.join('') : new_arr.join('') )
        // console.log(arr.join(''))
        return new_str

    }
}

module.exports = Translator;