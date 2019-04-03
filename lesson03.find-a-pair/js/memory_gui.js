//////////////////////////////////////////////////////////////////////
//                              GUI                                 //
// drawBoard() -> re-draws the board and creates all html elements  //
// showHideCard-> deals with showing front or back of cards         //
//////////////////////////////////////////////////////////////////////
function drawBoard() {
    let htmlBuild = "";
    for (i = 0; i < memoryGlobal.deck.length; i++) {
        htmlBuild +=
            `<div class="card" onclick="cardSelected(${i})">
                        <img src="img/0.jpg">
                        <img src="img/${memoryGlobal.deck[i].face}.jpg" class="hidden">
                        </div>
                    </div>`;
    }
    document.querySelector("main").innerHTML = htmlBuild;
}

function showHideCard(card, show = true) {
    const selectedCard = document.querySelector('main').childNodes[card * 2];
    const selector = (show ? 1 : -1);
    selectedCard.childNodes[2 - selector].classList.add('hidden');
    selectedCard.childNodes[2 + selector].classList.remove('hidden');
}