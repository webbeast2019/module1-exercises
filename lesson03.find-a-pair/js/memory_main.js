const memoryGlobal = {
    deck: [],
    gameStatus: 0,
    solved: 0,
    currentCard: null,
    pairCount: 8
};

class Card {
    constructor(face) {
        this.face = face;
        this.showing = false;
    }
}

function reset_game(pairCount = 8) {
    Object.assign(memoryGlobal, {
        deck: [],
        solved: 0,
        gameStatus: 0,
        currentCard: null
    });
    for (i = 1; i < pairCount + 1; i++) {
        memoryGlobal.deck.push(new Card(i));
        memoryGlobal.deck.push(new Card(i));
    }
    arrayShuffle(memoryGlobal.deck);
    drawBoard();
}
//////////////////////////////////////////////////
//     game status                              //
//  0 - no card selecet                         //
//  1 - first card selected                     //
//  2 - 2 cards selected wating to flip back    //
//////////////////////////////////////////////////
function cardSelected(selectedCard) {
    if (memoryGlobal.deck[selectedCard].showing === false) {
        switch (memoryGlobal.gameStatus) {
            case 0:
                flipCard(selectedCard);
                Object.assign(memoryGlobal, {
                    currentCard: selectedCard,
                    gameStatus: 1
                });
                break;
            case 1:
                flipCard(selectedCard);
                if (memoryGlobal.deck[memoryGlobal.currentCard].face === memoryGlobal.deck[selectedCard].face) {
                    memoryGlobal.gameStatus = 0;
                    memoryGlobal.solved += 1;
                } else {
                    memoryGlobal.gameStatus = 2;
                    setTimeout(() => {
                        flipCard(selectedCard);
                        flipCard(memoryGlobal.currentCard);
                        memoryGlobal.gameStatus = 0;
                    }, 1500);
                }
                break;
        }
    } else if (memoryGlobal.solved === memoryGlobal.pairCount) {
        reset_game(memoryGlobal.pairCount);
    }
}

function flipCard(card) {
    if (memoryGlobal.deck[card].showing) {
        memoryGlobal.deck[card].showing = false;
        showHideCard(card, false);
    } else {
        memoryGlobal.deck[card].showing = true;
        showHideCard(card);
    }
}