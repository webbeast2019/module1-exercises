import { Game } from './game.js';

const game = new Game();

const audio_game_over = new Audio('../audio/game-over.mp3');

const cardsImagesFolder = '../img/cards';
const boardElement = document.querySelector('.game-board');
const gameOverElement = document.querySelector('#game-over');

let isProcessing = false;

game.init();

const cardTemplate = document.getElementById('card-template');
const fragment = document.createDocumentFragment();

game.cards.forEach((card, index) => {
    const newCardElement = cardTemplate.content.cloneNode(true);
    newCardElement.querySelector('.card-front img').src = `${cardsImagesFolder}/${card.id}.png`;
    const containerElement = newCardElement.querySelector('.flip-container');
    containerElement.setAttribute('data-card-index', index);
    containerElement.onclick = card_click;
    containerElement.ontouchstart = card_click;  // support touch screens
    fragment.appendChild(newCardElement);
});

boardElement.appendChild(fragment);

let previousCardElement;

async function card_click() {
    if (isProcessing)
        return;

    let cardElement = this;

    // If the card is already flipped - return
    if (cardElement.classList.contains('flipped')) {
        return;
    }

    // Flip card
    cardElement.classList.add('flipped');

    // If the card is the first to be chosen => store it in a global variable and return
    if (!previousCardElement) {
        previousCardElement = cardElement;
        return;
    }

    // Get the data-card-index attribute from both current and previous cards
    var firstCardIndex = previousCardElement.getAttribute('data-card-index');
    var secondCardIndex = cardElement.getAttribute('data-card-index');

    if (game.tryMatch(firstCardIndex, secondCardIndex))
        handleMatch();
    else
        await handleNoMatch(cardElement);

    previousCardElement = undefined;
}

function handleMatch() {
    if (game.isGameOver())
        endGame();
}

async function handleNoMatch(flippedCard) {
    isProcessing = true;
    // flip cards back in 1 second
    return new Promise(resolve => {
        setTimeout(() => {
            flippedCard.classList.remove('flipped');
            previousCardElement.classList.remove('flipped');
            isProcessing = false;
            resolve();
        }, 1000);
    });
}

function endGame() {
    audio_game_over.play();
    boardElement.appendChild(gameOverElement);
    gameOverElement.classList.remove('hidden');
}
