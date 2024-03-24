
// ---Rooms stuff---
let room = 100
const rooms = {
    100: {
        text() {return `
        You are in a room and there are two signs.<br><br>
        ${constructSentence(['fruit'])}<br> and it has a picture of a fruit on it.<br><br>
        ${constructSentence(['instrument'])}<br> and it has a picture of a musical instrument on it.<br>
        `},
    },
    200: {
        text() {return `
        In this next room there is only one sign.<br><br>
        ${constructSentence(['fruit', 'and', 'instrument'])}<br> and it has a picture of a fruit and a musical instrument on it.<br><br>
        `},
    },
    300: {
        text() {return `
        You advance into another room and there is another sign.<br><br>
        ${constructSentence(['instrument', 'make', 'music'])}<br> and it has a picture of a musical instrument being played.<br><br>
        `},
    },
    301: {
        text() {return `
        You go outside and meet someone playing an instrument.<br><br>
        ${constructSentence(['me', 'make', 'music'])}<br> is what they say.<br><br>
        ${constructSentence(['you', 'make', 'music'])}?<br> is said afterwards.<br><br>
        `},
    },
    302: {
        text() {return `
        You go across to see another person playing an instrument with someone watching.<br><br>
        ${constructSentence(['me', 'like', 'music'])}<br> is what the person watching says.<br><br>
        You also see a sign pointing up with a picture of some stalls in it.<br><br>
        ${constructSentence(['market'])}<br> is shown on the sign.<br><br>
        `},
    },
    401: {
        text() {return `
        You go up and see a sign pointing to the left with a picture of some stalls in it.<br><br>
        ${constructSentence(['market'])}<br> is shown on the sign.<br><br>
        `},
    },
    402: {
        text() {return `
        You enter a large, open area resembling a market. There is a large sign on a wall<br><br>
        ${constructSentence(['market'])}<br> is shown on the sign.<br><br>
        You also see a smaller sign in front of you.<br><br>
        ${constructSentence(['market', 'have', 'fruit', 'and', 'instrument', 'and', 'food'])}<br>is shown on the sign and there is a picture on it with a fruit, an instrument and a piece of meat.<br><br>
        `},
    },
    502: {
        text() {return `
        You go up to one of the stalls and it sells instruments. They start talking to you.<br><br>
        ${constructSentence(['me', 'have', 'instrument'])}<br>
        ${constructSentence(['you', 'like', 'music'])}<br>
        ${constructSentence(['instrument', 'make', 'music'])}<br>
        `},
    },
    403: {
        text() {return `
        You continue through the market.<br><br>
        `},
    },
    503: {
        text() {return `
        You go up to one of the stalls and it sells food. They start talking to you.<br><br>
        ${constructSentence(['me', 'have', 'food'])}<br>
        ${constructSentence(['you', 'like', 'food'])}<br>
        ${constructSentence(['you', 'need', 'food'])}<br>
        `},
    },
}

// ---Translations stuff---
const defTranslations = {
    //
    fruit: 'grut',
    instrument: 'inturem',
    and: 'ari',
    music: 'turem',
    make: 'rit',
    
    me: 'fahr',
    you: 'fuhr',
    food: 'spah',
    market: 'varit',
    like: 'grahi',
    //
    have: 'vaka',
    need: 'nahr',



    
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
    document.getElementById("display").innerHTML = rooms[room].text()
}
function updateJournal() {
    let journal = ""
    let wordbankText = "<br><h2>Wordbank</h2>"
    let wordbank = []

    let i = 0
    for(defWord in defTranslations) {
        let idx = Object.keys(defTranslations).indexOf(defWord)
        word = defTranslations[defWord]
        journal += (word+"<br><textarea id='"+word+"Word' class='input' style='background-color: "+(translations[word]() == defWord ? '#AAAAAA' : '#555555')+";'>"+translations[word]()+"</textarea><br><br>")
        if(translations[word]() != defWord) {wordbank.push(defWord)} else {wordbank.push("<i style='color: #aaaaaa'>"+defWord+"</i>")}

        i++
        if(i % 10 === 0) journal += "<br><br>"
        if(i % 5 === 0) journal += "<br>"
    }

    wordbank = chunkArray(wordbank, 10)
    for(wordbankChunk in wordbank) {
        wordbankChunk = wordbank[wordbankChunk]
        wordbankChunk = wordbankChunk
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

        for(word of wordbankChunk) {
            wordbankText += (String(word)+"<br>")
        }
        wordbankText += "<br>"
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
        snt += ((translations[word]() || defTranslations[defWord] || defWord) + " ")
    }
    return "<u>"+snt+"</u>"
}

function chunkArray(arr, size) {
    let result = []
    while(arr.length > 0) {
        result.push(arr.splice(0, size))
    }
    return result
}