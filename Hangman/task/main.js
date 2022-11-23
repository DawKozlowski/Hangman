// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

console.log(`H A N G M A N // 8 attempts`)

let winCounter=0
let loseCounter=0

while (true) {
    let operation = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: `)
    if(operation !=="play" && operation !=="results" && operation !=="exit") {
        continue
    }
    if(operation === "exit") {
        break;
    }
    if(operation === "results") {
        console.log(`You won: ${winCounter} times.
You lost: ${loseCounter} times.`)
        continue
    }

    let attempts = 8
    const word = getRandomWord();
    let wordWithDashes=printDash(word.length)
    console.log("")

    function printDash(times) {
        let str = "-"
        for (let i = 0; i < times - 1; i++) {
            str = str + "-"
        }
        return str
    }

    function getRandomWord() {
        const list = ["python", "java", "swift", "javascript"]
        let index = Math.floor(Math.random()*list.length)
        return list[index]
    }

    const words = []

    while (attempts > 0) {
        console.log("")
        console.log(wordWithDashes)
        let letter = input(`Input a letter:`)
        if (!checkLetter(letter, words)) {
            continue
        }
        words.push(letter)


        if (word.includes(letter)) {
            wordWithDashes = replaceLetters(letter, word, wordWithDashes)
            if (!wordWithDashes.includes("-")) {
                console.log("")
                console.log(`You guessed the word ${wordWithDashes}!`)
                console.log("You survived!")
                winCounter++
                break;
            }
            process.stdout.write(`// ${attempts} attempts`);
            console.log("")
        } else {
            attempts--
            console.log(`That letter doesn't appear in the word. // ${attempts} attempts`)
        }


        function checkLetter(letter, words) {
            if (Number.isInteger(letter) || letter === "") {
                console.log("Please, input a single letter.")
                return false
            }
            if (letter[1]) {
                console.log("Please, input a single letter.")
                return false
            }
            if (words.includes(letter)) {
                console.log("You've already guessed this letter.")
                return false
            }
            if (letter === letter.toUpperCase()) {
                console.log("Please, enter a lowercase letter from the English alphabet.")
                return false
            }
            return true
        }

        function replaceLetters(letter, word, wordWithDashes) {
            for (let i = 0; i < word.length; i++) {
                if (word.at(i) === letter) {
                    wordWithDashes = replaceAt(i, letter, wordWithDashes)
                }
            }
            return wordWithDashes
        }

        function replaceAt(index, replacement, word) {
            return word.substring(0, index) + replacement + word.substring(index + replacement.length);
        }

    }
    if (attempts <= 0) {
        console.log("")
        console.log("You lost!")
        loseCounter++
    }
}


