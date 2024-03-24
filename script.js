
// ---Rooms stuff---
let room = 100
const rooms = {
    100: {
        text() {return constructSentence(['you', 'find', 'you', 'in', 'first', 'room'])},
    },
    101: {
        text() {return constructSentence(['you', 'find', 'you', 'in', 'second', 'room'])},
    },
    201: {
        text() {return constructSentence(['you', 'find', 'you', 'in', 'room', 'above', 'second', 'room'])},
    },
    1: {
        text() {return constructSentence(['you', 'find', 'you', 'in', 'room', 'below', 'second', 'room'])},
    },
}

// ---Translations stuff---
const defTranslations = {
    you: "sunku",
    find: "putuk",
    in: "ur",
    first: "1",
    second: "2",
    room: "dopo",
    above: "upa",
    below: "ipur",
}

let translations = {
}
for(word in defTranslations) {
    word = defTranslations[word]
    translations = {
        ...translations,
        [word]() {return document.getElementById(word+"Word") ? document.getElementById(word+"Word").value : ""},
    }
}

// ---Other stuff to make the game work---
function roomCheck(num) {
    return Object.keys(rooms).includes(String(room+num)) ? 'visible' : 'hidden'
}
function updateScene() {
    document.getElementById("up").style.visibility = roomCheck(100)
    document.getElementById("down").style.visibility = roomCheck(-100)
    document.getElementById("left").style.visibility = roomCheck(-1)
    document.getElementById("right").style.visibility = roomCheck(1)
    document.getElementById("display").textContent = rooms[room].text()
}
function updateJournal() {
    let journal = ""
    let wordbank = []
    for(defWord in defTranslations) {
        word = defTranslations[defWord]
        journal += (word+"<br><textarea id='"+word+"Word' class='input' style='background-color: "+(translations[word]() == defWord ? '#AAAAAA' : '#555555')+";'>"+translations[word]()+"</textarea><br><br>")
        if(translations[word]() != defWord) wordbank.push(defWord)
    }

    wordbank = wordbank
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    wordbankText = "<br><h2>Wordbank</h2>"
    for(word of wordbank) {
        wordbankText += (String(word)+"<br>")
    }
    
    document.getElementById("journal").innerHTML = journal
    document.getElementById("wordbank").innerHTML = wordbankText
}
setTimeout("updateScene(), updateJournal()", 1)

function constructSentence(words) {
    let snt = ""
    for(defWord in words) {
        defWord = words[defWord]
        word = defTranslations[defWord]
        snt += ((translations[word]() || defTranslations[defWord]) + " ")
    }
    return snt
}