import * as Utils from './utils.js';
import * as Consts from './consts.js';
import { Card } from './card.js';

class Game {
    constructor(numberOfCards = Consts.DEFAULT_NUMBER_OF_CARDS, maxCardId = Consts.MAX_CARD_ID) {
        this._maxCardId = maxCardId;
        // Make sure number of card is even and that it doesn't exceed max number of cards
        this._numberOfCards = Math.min(Math.ceil(numberOfCards / 2) * 2, maxCardId * 2);
        this._cards = [];
    }

    get numberOfCards() {
        return this._numberOfCards;
    }

    set numberOfCards(numberOfCards) {
        this._numberOfCards = numberOfCards;
    }

    get cards() {
        return this._cards;
    }

    init() {
        // Set a new array of cards
        this._cards = Array(this._numberOfCards);

        let cardIds = Array(this._maxCardId);
        let numberOfPairs = this._numberOfCards / 2;

        for (let index = 0; index < numberOfPairs; index++) {
            let cardId = Utils.getFreeIndex(cardIds) + 1;

            let firstCardIndex = Utils.getFreeIndex(this._cards);
            this._cards[firstCardIndex] = new Card(cardId);

            let secondCardIndex = Utils.getFreeIndex(this._cards);
            this._cards[secondCardIndex] = new Card(cardId);
        }
    }

    tryMatch(firstCardIndex, secondCardIndex) {
        if (this._cards[firstCardIndex].id === this._cards[secondCardIndex].id) {
            this._cards[firstCardIndex].isVisible = this._cards[secondCardIndex].isVisible = true;
            return true;
        }
        return false;
    }

    isGameOver() {
        return this._cards.every(card => card.isVisible);
    }
}

export { Game };