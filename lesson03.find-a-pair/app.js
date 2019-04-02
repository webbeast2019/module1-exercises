'use strict'
const IMAGES = [
    'assets/css.png',
    'assets/html5.png',
    'assets/javaScript.png',
    'assets/mongodb.png',
    'assets/nodejs.jpg',
    'assets/github.jpg',
    'assets/react.png',
    'assets/Redux.png',
    'assets/angular.png',
    'assets/firebase.png',
    'assets/jquery.jpg',
    'assets/mysql.png',
    'assets/npm.png',
    'assets/slack.png',
    'assets/vscode.png',
    'assets/php.png',
    'assets/typescript.png',
    'assets/chrome.jpg'
];

const CARDS = [];//array of all card's objects
const GAME_STATE = { tries: 0, matchs: 0 };
let numOfCards = 0;
let cardsClicked = 1;
let prevCardNum = 0;
let timeoutID;

class Card {
    constructor(num, image, brother, visible, show) {
        this.num = num;
        this.image = image;
        this.brother = brother;
        this.visible = visible;//indicate if card is on the game borad
        this.show = show;//indicate if card image is shown
    }
}

const checkIfNumTaken = (numsArray, num) => {
    for (let i = 0; i <= numsArray.length; i++) {
        if (num === numsArray[i])
            return true;
    }
    return false;
};

const initCards = () => {//function that init all card's objects
    let cardsNumnersTacken = [];
    let imagesTacken = [];

    for (let i = 0; i <= (numOfCards / 2) - 1; i++) {
        let cardNum1 = Math.floor((Math.random() * numOfCards) + 1);
        while (checkIfNumTaken(cardsNumnersTacken, cardNum1)) {
            cardNum1 = Math.floor((Math.random() * numOfCards) + 1);
        }
        cardsNumnersTacken.push(cardNum1);
        let cardNum2 = Math.floor((Math.random() * numOfCards) + 1);
        while (checkIfNumTaken(cardsNumnersTacken, cardNum2)) {
            cardNum2 = Math.floor((Math.random() * numOfCards) + 1);
        }
        cardsNumnersTacken.push(cardNum2);

        let image = Math.floor((Math.random() * IMAGES.length));
        while (checkIfNumTaken(imagesTacken, image)) {
            image = Math.floor((Math.random() * IMAGES.length));
        }
        imagesTacken.push(image);

        CARDS[cardNum1 - 1] = new Card(cardNum1, IMAGES[image], cardNum2, true, false);
        CARDS[cardNum2 - 1] = new Card(cardNum2, IMAGES[image], cardNum1, true, false);
    }
};

const initDisplay = () => {//function that crate all card's divs and render them to the DOM
    let boradDisplay = ``;
    let boradSize = document.querySelector('main').offsetHeight;
    let cardSize = boradSize / Math.sqrt(numOfCards) - 10;
    cardSize += 'px';
    for (let i = 0; i <= CARDS.length - 1; i++) {
        boradDisplay += `<div class="card" id=${CARDS[i].num} style=" width: ${cardSize}; height: ${cardSize};" onClick="cardClick(this)">
                            <img src=${CARDS[i].image}>
                        </div>`;
    }
    document.querySelector('.board').innerHTML = boradDisplay;
};

const reversedAllCard = () => {
    for (let i = 0; i <= CARDS.length - 1; i++) {
        if (CARDS[i].show) {
            document.getElementById(CARDS[i].num).style.backgroundColor = 'Khaki';
            document.getElementById(CARDS[i].num).getElementsByTagName('img')[0].style.display = 'none';
        }
        CARDS[i].show = false;
    }
};

const showCard = (cardNum) => {
    CARDS[cardNum - 1].show = true;
    document.getElementById(cardNum).getElementsByTagName('img')[0].style.display = 'initial';
    document.getElementById(cardNum).style.backgroundColor = 'white';
};

const cardsMatch = (card1, card2) => {
    document.getElementById(card1).style.visibility = 'hidden';
    document.getElementById(card2).style.visibility = 'hidden';
    CARDS[card1 - 1].visible = false;
    CARDS[card2 - 1].visible = false;
    checkIfGameEnd();
};

const checkIfGameEnd = () => {
    for (let i = 0; i <= CARDS.length - 1; i++) {
        if (CARDS[i].visible)
            return;
    }
    alert('Congratulations, you found them all!');
};

const updateGameState = () => {
    if (GAME_STATE.matchs === 0 && GAME_STATE.tries === 0)
        document.querySelector('.gameState').innerHTML = 'Find all the pairs!';
    else
        document.querySelector('.gameState').innerHTML = `You found ${GAME_STATE.matchs} out of ${numOfCards / 2} pairs with ${GAME_STATE.tries} tries`;
};

const startNewGame = () => {
    document.querySelector('.board').innerHTML = ``;
    numOfCards = document.getElementById('numOfCards').value;
    while (CARDS.length > 0) {
        CARDS.pop();
    }
    initCards();
    initDisplay();

    GAME_STATE.matchs = 0;
    GAME_STATE.tries = 0;
    updateGameState();

    CARDS.forEach(card => showCard(card.num));
    setTimeout(reversedAllCard, 1000);
};

function cardClick(element) {
    let cardNum = parseInt(element.id);

    if (CARDS[cardNum - 1].show)
        return;

    if (cardsClicked === 3) {
        clearTimeout(timeoutID);
        reversedAllCard();
        cardsClicked = 1;
    }
    if (cardsClicked === 2) {
        showCard(cardNum);
        if (CARDS[cardNum - 1].brother === prevCardNum) {
            GAME_STATE.matchs++;
            setTimeout(cardsMatch, 500, cardNum, prevCardNum);
        }
        else
            timeoutID = setTimeout(reversedAllCard, 1000);
        cardsClicked++;
        GAME_STATE.tries++;
        updateGameState();
    }
    if (cardsClicked === 1) {
        showCard(cardNum);
        cardsClicked++;
        prevCardNum = cardNum;
    }
}

document.querySelector('button.start').addEventListener('click', startNewGame);
document.getElementById('numOfCards').addEventListener('change', startNewGame);
startNewGame();