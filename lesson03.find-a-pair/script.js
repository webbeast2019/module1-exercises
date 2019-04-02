"use strict";

class Card {
    constructor(index, pairCard, image) {
        this.index = index
        this.pairCard = pairCard;
        this.image = image;
    }
}

const innerCards = [...document.querySelectorAll('.flip-card-inner')];
const cardWrap = document.querySelector('.card-wrap');
const cardImages = [...document.querySelectorAll('.flip-card img')];
const bravo = document.querySelector('.bravo');
const bravoWrap = document.querySelector('.bravoWrap');
const playAgain = document.querySelector('.play-again');
const NUM_OF_CARDS = 16;
let leftNumOfPairs = NUM_OF_CARDS/2;
let cardsLeft = NUM_OF_CARDS;
const cardsNum = [];
// create 16 cards index
for (let num = 0; num < NUM_OF_CARDS; num++) {
    cardsNum.push(num);
}
const cardsArray = [];
const images = [
    'https://images.unsplash.com/photo-1546190255-451a91afc548?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511216113906-8f57bb83e776?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1545664373-f9e0c12a3072?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1471602671180-19fb2b491359?ixlib=rb-1.2.1&auto=format&fit=crop&w=626&q=80',
    'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=660&q=80',
    'https://images.unsplash.com/flagged/photo-1553053998-66fc2c520821?ixlib=rb-1.2.1&auto=format&fit=crop&w=684&q=80',
    'https://images.unsplash.com/photo-1551189014-fe516aed0e9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=805&q=80',
    'https://images.unsplash.com/photo-1550553484-c46651e02af6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=638&q=80'
];

randomize();

cardImages.forEach((img, idx) => {
    img.setAttribute('src', cardsArray[idx].image);
});

let alreadyOpen = false;
let twoCardsOpen = false;
let cardOpen;
let blockToggle = [];
for (let i = 0; i < NUM_OF_CARDS; i++) {
    blockToggle.push(false);
}

playAgain.addEventListener('click', function() {
    location.reload();
});

innerCards.forEach((card, idx) => {
    card.addEventListener('click', function () {
        if (!blockToggle[idx] && !twoCardsOpen) {  
            this.classList.toggle('rotate');
            if (alreadyOpen) {
                // one card already open
                openSecondCard.call(this, idx);
            } else {
                openFirstCard(idx);
            }
        }
    });
});

function openSecondCard(idx) {
    twoCardsOpen = true;
    if ((cardsArray[idx].pairCard === cardOpen.index) && (cardsArray[idx].index === cardOpen.pairCard)) {
        pairFound.call(this, idx);
        leftNumOfPairs--;
    } else {
        pairNotFound.call(this);
    }
    alreadyOpen = false;
}

function openFirstCard(idx) {
    alreadyOpen = true;
    cardOpen = cardsArray[idx];
    blockToggle[idx] = true;
}

function pairFound(idx) {
    setTimeout(function () {
        cardImages[idx].classList.add('finished');
        cardImages[cardOpen.index].classList.add('finished');
        twoCardsOpen = false;
        if (leftNumOfPairs === 0) {
            // game finished
            bravoWrap.style.display = 'block';
            cardWrap.classList.add('d-none');
            bravo.classList.add('bravo-move');
        }
    }.bind(this), 500);
    blockToggle[idx] = true;
    blockToggle[cardOpen.index] = true;
}

function pairNotFound() {
    // close the open cards
    setTimeout(function () {
        this.classList.toggle('rotate');
        innerCards[cardOpen.index].classList.toggle('rotate');
        twoCardsOpen = false;
    }.bind(this), 1000);
    blockToggle[cardOpen.index] = false;
}

// randomize two cards for every single image
function randomize() {
    for (let i = 0; i < images.length; i++) {
        let pair = randomizePairCards();
        cardsArray[pair[0]] = new Card(pair[0], pair[1], images[i]);
        cardsArray[pair[1]] = new Card(pair[1], pair[0], images[i]);
    }
}

function randomizePairCards() {
    let random;
    let pairCards = [];
    for (let i = 0; i < 2; i++) {
        random = Math.floor(Math.random() * cardsLeft);
        pairCards.push(cardsNum[random]);
        cardsNum.splice(random, 1);
        cardsLeft--;
    }
    return pairCards;
}