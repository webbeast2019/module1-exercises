const card = document.getElementsByClassName("mem-card");
const game = document.getElementsByClassName("container")[0];
const scoreDis = document.getElementById("score");
let allCards = [...card];
let array = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
let flipCounter = 0;
let score = 0;
let flipedCards = [];
let bothCardFliped = false;
let tries = 0;

for (let i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener("click", displayCard);
    allCards[i].id = array[i]
    allCards[i].addEventListener("click", flipCards);
}
// shuffling the cards function 
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
// Shuffle at web load
shuffle(allCards);
// function for display the card 
function displayCard() {
    if (bothCardFliped) return;
    this.classList.toggle("flip");
}
// flip Cards function
function flipCards() {
    if (flipCounter === 0) {
        // firstCard = this;
        flipedCards.push(this);
        flipCounter++;
    }
    else if (flipCounter === 1) {
        flipedCards.push(this);
        flipCounter === 0;
        checkMatch();
    }
}
// check if match cards
function checkMatch() {
    if (flipedCards[0].id === flipedCards[1].id) {
        flipedCards[0].removeEventListener("click", displayCard);
        flipedCards[1].removeEventListener("click", displayCard);
        score++;
        flipedCards = [];
        flipCounter = 0;
        tries++;
        scoreDisplay();
        checkWon();
    }
    // if cards dont match
    else if (flipedCards[0].id !== flipedCards[1].id) {
        bothCardFliped = true;
        setTimeout(() => {
            flipedCards[0].classList.remove("flip");
            flipedCards[1].classList.remove("flip");
            flipedCards = [];
            flipCounter = 0;
            tries++;
            bothCardFliped = false;
            scoreDisplay();
        }, 900);
    }
}
// score and tries tracker
function scoreDisplay() {
    scoreDis.innerHTML = `Your Found ${score} out of 8 pairs with ${tries} tries`
}
// check if player won
function checkWon() {
    if (score === 8) {
        game.innerHTML = `<h2> You Won Baby ! ! ! </h2>`
    }
}
// createGame Creation
function createGame() {
    for (let row = 1; row <= 4; row++) {
        let newRow = document.createElement("div");
        newRow.className = "row";
        for (let i = 1; i <= 4; i++) {
            newRow.append(allCards.pop())
        }
        game.append(newRow)
    }
}
createGame();