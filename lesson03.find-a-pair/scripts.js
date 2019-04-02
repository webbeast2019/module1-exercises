class Cards {
    constructor(name, color, selected) {
        this.name = name;
        this.color = color;
        this.selected = false;
    }
}
class GroupOne extends Cards {
}
class GroupTwo extends Cards {
}
const card_1 = new GroupOne('1', 'orange', 'false');
const card_2 = new GroupOne('2', '#f25', 'false');
const card_3 = new GroupOne('3', 'green', 'false');
const card_4 = new GroupOne('4', 'blue', 'false');
const card_5 = new GroupOne('5', 'yellow', 'false');
const card_6 = new GroupOne('6', 'purple', 'false');
const card_7 = new GroupOne('7', 'brown', 'false');
const card_8 = new GroupOne('8', 'red', 'false');
const card_9 = new GroupTwo('9', 'purple', 'false');
const card_10 = new GroupTwo('10', 'brown', 'false');
const card_11 = new GroupTwo('11', 'red', 'false');
const card_12 = new GroupTwo('12', 'yellow', 'false');
const card_13 = new GroupTwo('13', 'green', 'false');
const card_14 = new GroupTwo('14', 'orange', 'false');
const card_15 = new GroupTwo('15', '#f25', 'false');
const card_16 = new GroupTwo('16', 'blue', 'false');
"use strict";
let allSections = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
let numOfClick = 0;

let card1 = `<section class="cards" onclick="openCardFun('1')"  id="1"></section>`;
let card2 = `<section class="cards" onclick="openCardFun('2')"  id="2"></section>`;
let card3 = `<section class="cards" onclick="openCardFun('3')"  id="3"></section>`;
let card4 = `<section class="cards" onclick="openCardFun('4')" id="4"></section>`;
let card5 = `<section class="cards" onclick="openCardFun('5')" id="5"></section>`;
let card6 = `<section class="cards" onclick="openCardFun('6')" id="6"></section>`;
let card7 = `<section class="cards" onclick="openCardFun('7')" id="7"></section>`;
let card8 = `<section class="cards" onclick="openCardFun('8')" id="8"></section>`;
let card9 = `<section class="cards" onclick="openCardFun('9')" id="9"></section>`;
let card10 = `<section class="cards" onclick="openCardFun('10')" id="10"></section>`;
let card11 = `<section class="cards" onclick="openCardFun('11')" id="11"></section>`;
let card12 = `<section class="cards" onclick="openCardFun('12')" id="12"></section>`;
let card13 = `<section class="cards" onclick="openCardFun('13')" id="13"></section>`;
let card14 = `<section class="cards" onclick="openCardFun('14')" id="14"></section>`;
let card15 = `<section class="cards" onclick="openCardFun('15')" id="15"></section>`;
let card16 = `<section class="cards" onclick="openCardFun('16')" id="16"></section>`;
//put all sections to array
let cardsArray = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16];
//random sections in array
shuffle(cardsArray);
// load sections (cards) to html 
document.querySelectorAll('main').forEach((item) => {
    item.innerHTML = cardsArray[0] + cardsArray[1] + cardsArray[2] + cardsArray[3] + cardsArray[4] + cardsArray[5] + cardsArray[6] + cardsArray[7] + cardsArray[8] + cardsArray[9] + cardsArray[10] + cardsArray[11] + cardsArray[12] + cardsArray[13] + cardsArray[14] + cardsArray[15];
});
//random function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// this function close cards
function closeCards() {
    for (let i = 0; i < allSections.length; i++) {
        x = document.getElementById(allSections[i]);
        x.style.background = 'rgb(89, 109, 93)';
    }
}
//this function change status of cards to false after 2 clicks
function change_Card_Selected_To_False() {
    card_1.selected = false;
    card_2.selected = false;
    card_3.selected = false;
    card_4.selected = false;
    card_5.selected = false;
    card_6.selected = false;
    card_7.selected = false;
    card_8.selected = false;
    card_9.selected = false;
    card_10.selected = false;
    card_11.selected = false;
    card_12.selected = false;
    card_13.selected = false;
    card_14.selected = false;
    card_15.selected = false;
    card_16.selected = false;
}
const openCardFun = function openCard(type) {
    let x = document.getElementById(type);

    if (numOfClick >= 2) {
        change_Card_Selected_To_False();
         closeCards();
        return numOfClick = 0;
    } else {
        if (type === card_1.name) {
            x.style.backgroundColor = card_1.color;
            card_1.selected = true;
            if (card_14.selected) {
                allSections.remove('1', '14');
                return numOfClick = 0;
            }
        }
        else if (type === card_2.name) {
            x.style.backgroundColor = card_2.color;
            card_2.selected = true;
            if (card_15.selected) {
                allSections.remove('2', '15');
                return numOfClick = 0;
            }
        }
        else if (type === card_3.name) {
            x.style.backgroundColor = card_3.color;
            card_3.selected = true;
            if (card_13.selected) {
                allSections.remove('3', '13');
                return numOfClick = 0;
            }
        }
        else if (type === card_4.name) {
            x.style.backgroundColor = card_4.color;
            card_4.selected = true;
            if (card_16.selected) {
                allSections.remove('4', '16');
                return numOfClick = 0;
            }
        }
        else if (type === card_5.name) {
            x.style.backgroundColor = card_5.color;
            card_5.selected = true;
            if (card_12.selected) {
                allSections.remove('5', '12');
                return numOfClick = 0;
            }
        }
        else if (type === card_6.name) {
            x.style.backgroundColor = card_6.color;
            card_6.selected = true;
            if (card_9.selected) {
                allSections.remove('6', '9');
                return numOfClick = 0;
            }
        }
        else if (type === card_7.name) {
            x.style.backgroundColor = card_7.color;
            card_7.selected = true;
            if (card_10.selected) {
                allSections.remove('7', '10');
                return numOfClick = 0;
            }
        }
        else if (type === card_8.name) {
            x.style.backgroundColor = card_8.color;
            card_8.selected = true;
            if (card_11.selected) {
                allSections.remove('8', '11');
                return numOfClick = 0;
            }
        }
        else if (type === card_9.name) {
            x.style.backgroundColor = card_9.color;
            card_9.selected = true;
            if (card_6.selected) {
                allSections.remove('9', '6');
                return numOfClick = 0;
            }
        }
        else if (type === card_10.name) {
            x.style.backgroundColor = card_10.color;
            card_10.selected = true;
            if (card_7.selected) {
                allSections.remove('10', '7');
                return numOfClick = 0;
            }
        }
        else if (type === card_11.name) {
            x.style.backgroundColor = card_11.color;
            card_11.selected = true;
            if (card_8.selected) {
                allSections.remove('11', '8');
                return numOfClick = 0;
            }
        }
        else if (type === card_12.name) {
            x.style.backgroundColor = card_12.color;
            card_12.selected = true;
            if (card_5.selected) {
                allSections.remove('12', '5');
                return numOfClick = 0;
            }
        }
        else if (type === card_13.name) {
            x.style.backgroundColor = card_13.color;
            card_13.selected = true;
            if (card_3.selected) {
                allSections.remove('13', '3');
                return numOfClick = 0;
            }
        }
        else if (type === card_14.name) {
            x.style.backgroundColor = card_14.color;
            card_14.selected = true;
            if (card_1.selected) {
                allSections.remove('14', '1');
                return numOfClick = 0;
            }
        }
        else if (type === card_15.name) {
            x.style.backgroundColor = card_15.color;
            card_15.selected = true;
            if (card_2.selected) {
                allSections.remove('15', '2');
                return numOfClick = 0;
            }
        }
        else if (type === card_16.name) {
            x.style.backgroundColor = card_16.color;
            card_16.selected = true;
            if (card_4.selected) {
                allSections.remove('16', '4');
                return numOfClick = 0;
            }
        } numOfClick++;
    }
    //if two cards compatible this function remove them from array 
    Array.prototype.remove = function () {
        let what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };
}