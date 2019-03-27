'use strict'
let screen = '';//string that represent what we can see on the calculator screen

let operations = ['*','/','+','-','='];

let buttons =['.zero','.one','.two','.three','.four','.five','.six','.seven','.eight','.nine','.plus','.div','.multi','.minus','.point'];//exept 'C' button

let elementsHistory = [];//an array that hold all the action history of the user, every element is insert to the start of the array and shift all the rest of the elemnsts to the right

let element = '';//element that represent one user action (elemnt can be a number or an operator)

let buttonsDisableFlag = false;

let showingResultFlag = false; //flag that tells us if an equal result is shwon or not on the screen 


//function that update the elements history array and the calculator screen after a click on a number button (except zero)
function numberClick(number){
    
    if(showingResultFlag === true){
        screen = '';
        document.querySelector('.screen').innerHTML = screen;
        element = '';
        elementsHistory=[];
        showingResultFlag = false;
    }
    
    screen += document.querySelector(number).innerHTML;
    document.querySelector('.screen').innerHTML = screen;
    element += document.querySelector(number).innerHTML;
    elementsHistory[0] = element;
  
    screenCheck();
}


////function that update the elements history array and the calculator screen after a click on some of the operations buttons (exept equal)
function operatorClick(operator, operatorSing){
    
    if(screen.length === 0 && operatorSing !== '-')
        return;
    
    if(screen.length === 1 && screen[0] === '-')
        return;
    
    if(screen[screen.length-1] === '.')
        return;
    
    showingResultFlag = false;
    
    
    //this part deal with the option of allowing the user to insert negative numbers to the arithmetic expression (e.g, "<NUM> * - <NUM>" and so on)
    let check1 = false;
    let check2 = false;
    
    if(operatorSing === '-'){
        for(let i = 0; i <= operations.length-1 ; i++){
            if(screen[screen.length-1] === operations[i]){
                check1 = true;
            }
        }   
    }
    
    for(let i = 0 ; i <= operations.length-1 ; i++){
        if(screen[screen.length-2] === operations[i] && screen.length > 2){
            check2 = true;
        }
    }
    
    if(check2)
        return;
    else if(check1){
        elementsHistory.shift();
    }
    else{
        //loop that take care of the case of clicking on two operations buttons in a row
        for(let i = 0; i<=operations.length-1; i++){
            if(screen[screen.length-1] === operations[i]){
                elementsHistory[1] = operatorSing;
                screen = screen.substring(0, screen.length-1) + operatorSing;
                document.querySelector('.screen').innerHTML = screen;
                return;
            }
        }
    }

    if(screen.length === 24){
        return;
    }
    
    elementsHistory.unshift(operatorSing);
    screen += document.querySelector(operator).innerHTML;
    document.querySelector('.screen').innerHTML = screen;
    element = '';
    elementsHistory.unshift(element);
    screenCheck();  
}


//function that check the calculator screen string length, that can't be more then 25 chars
function screenCheck(){
    if (screen.length === 25){
        buttonsDisableFlag = !buttonsDisableFlag;
        buttonsDisable(buttonsDisableFlag);
    }
        
 }


//function that disable some of the buttons when calculator screen string length is 25 (max)
function buttonsDisable(buttonsDisableFlag){
    for(let i=0 ; i<=buttons.length-1; i++){
        document.querySelector(buttons[i]).disabled = buttonsDisableFlag;
    }
}




//----------------Event Listeners for all the numbers buttons----------//
document.querySelector('.zero').addEventListener('click', function(){
    
    if(screen.length === 1 && screen[0] === '0')
        return;
    
    if(showingResultFlag === true){
        screen = '';
        showingResultFlag = false;
    }
    
    if(screen[screen.length-1] === '0'){
        for(let i = 0; i <= operations.length-1 ; i++){
            if(screen[screen.length-2] === operations[i])
                return;
        }
    }
    
    screen += document.querySelector('.zero').innerHTML;
    document.querySelector('.screen').innerHTML = screen;
    element += document.querySelector('.zero').innerHTML;
    elementsHistory[0] = element;
});

document.querySelector('.one').addEventListener('click', function(){
    numberClick('.one');
});

document.querySelector('.two').addEventListener('click', function(){
    numberClick('.two');  
});

document.querySelector('.three').addEventListener('click', function(){
    numberClick('.three');
});

document.querySelector('.four').addEventListener('click', function(){
    numberClick('.four');
});

document.querySelector('.five').addEventListener('click', function(){
    numberClick('.five');
});

document.querySelector('.six').addEventListener('click', function(){
    numberClick('.six');
});

document.querySelector('.seven').addEventListener('click', function(){
    numberClick('.seven');   
});

document.querySelector('.eight').addEventListener('click', function(){
    numberClick('.eight');
});

document.querySelector('.nine').addEventListener('click', function(){
    numberClick('.nine');
});




//----------------Event Listeners for all the math operations buttons----------//
document.querySelector('.plus').addEventListener('click', function(){
    operatorClick('.plus', '+');
    
});

document.querySelector('.div').addEventListener('click', function(){
    operatorClick('.div', '/'); 
});

document.querySelector('.multi').addEventListener('click', function(){
    operatorClick('.multi', '*');
});

document.querySelector('.minus').addEventListener('click', function(){
    operatorClick('.minus', '-'); 
});


document.querySelector('.equal').addEventListener('click', function(){
    
    screenCheck();
    
    if(screen.length === 0)
        return;
    
    if(screen[screen.length-1] === '.')
        return;
    
    
    //taking care of the case when clicking on equal and only minus and a number is on the screen (e.g, "- <NUM>")
    if(elementsHistory[elementsHistory.length-1] === '-' && screen.length > 1){
        elementsHistory[elementsHistory.length-2] = parseFloat(elementsHistory[elementsHistory.length-2]) * (-1);
        elementsHistory.pop();
    }
    
    
    //taking care of the case when clicking equal but the last action was an operator
    for (let i = 0 ; i <= operations.length-1 ; i++){
        if(screen[screen.length-1] === operations[i])
            return;
    }
    
    
    //fixing the elementsHistory array when there are negative numbers in the arithmetic expression
    for (let i = elementsHistory.length-1 ; i >= 0 ; i--){
        for (let j = 0 ; j <= operations.length-1 ; j++){
            if(elementsHistory[i] === operations[j] && elementsHistory[i-1] === '-'){
                elementsHistory[i-2] = parseFloat(elementsHistory[i-2]) * (-1);
                elementsHistory.splice(i-1,1);
            }
        }
    }
    
    
    for (let i = 0; i <= elementsHistory.length-1  ; i+=2) {
        elementsHistory[i] = parseFloat(elementsHistory[i]);
    }
    
    
    //calculation the arithmetic expression
    let result;
    
    for (let i = elementsHistory.length - 1; i >= 0 ; i--) {
        if(elementsHistory[i] === '/' ||  elementsHistory[i] === '*'){
            if(elementsHistory[i] === "/"){
                if(elementsHistory[i-1] === 0){
                    elementsHistory=[];
                    document.querySelector('.screen').innerHTML = 'ERORR';
                    screen='';
                    element='';
                    return;
                }
                else    
                    result = elementsHistory[i+1] / elementsHistory[i-1];
            }
            else if(elementsHistory[i] === '*')
                result = elementsHistory[i+1] * elementsHistory[i-1];
            
            elementsHistory[i+1] = result;
            elementsHistory.splice(i-1, 2);
            i = elementsHistory.length -1;
        }
    }
    
    for (let i = elementsHistory.length - 1; i >= 0 ; i--) {
        if(elementsHistory[i] === '+' ||  elementsHistory[i] === '-'){
            if(elementsHistory[i] === '+')
                result = elementsHistory[i+1] + elementsHistory[i-1];
            else if(elementsHistory[i] === '-')
                result = elementsHistory[i+1] - elementsHistory[i-1];

            elementsHistory[i+1] = result;
            elementsHistory.splice(i-1, 2);
            i = elementsHistory.length - 1;
        }
    }
    //end of the calculation


    elementsHistory[0] = elementsHistory[0].toFixed(10);
    elementsHistory[0] = parseFloat(elementsHistory[0]);
    elementsHistory[0] = elementsHistory[0].toString();
    document.querySelector('.screen').innerHTML = elementsHistory[0];
    screen = elementsHistory[0];
    element = '';
    showingResultFlag = true;                               
});




//----------------Event Listeners for all the special buttons----------//
document.querySelector('.point').addEventListener('click', function(){
    if(screen.length === 0)
        return;
    
    if(screen[screen.length-1] === '.')
        return;
    
    if(showingResultFlag === true)
        return;
    
    //loop that check if the last user action wat a arithmetic operations. if it was a point can't be clicked
    for(let i = 0; i<=operations.length-1; i++){
        if(screen[screen.length-1]===operations[i])
            return;
    }
    
    screen += document.querySelector('.point').innerHTML;
    element += document.querySelector('.point').innerHTML;
    elementsHistory[0] = element;
    document.querySelector('.screen').innerHTML = screen; 
});


document.querySelector('.clear').addEventListener('click', function(){
    screenCheck();
    screen = '';
    document.querySelector('.screen').innerHTML = screen;
    elementsHistory=[];
    element = '';
});


document.querySelector('.delete').addEventListener('click', function(){
    if(screen.length === 0){
        return;
    }
    
    screen = screen.substring(0, screen.length-1);
    document.querySelector('.screen').innerHTML = screen;
    
    let check = false; 
    
    if(elementsHistory[0].length > 1){
        elementsHistory[0] = elementsHistory[0].substring(0, elementsHistory[0].length-1);
        element = elementsHistory[0];
    }
    else{
        if(elementsHistory[0] === ''){
            elementsHistory.shift()
            for(let i = 0; i <= operations.length; i++){
                if(elementsHistory[1] === operations[i]){
                    element='';
                    elementsHistory[0] = element;
                    check = true;
                }
            }
            if(!check){
                elementsHistory.shift()
                element = elementsHistory[0];
            }
        }
        else{
            elementsHistory.shift()
            element='';
            elementsHistory.unshift(element);
        }
    }
   
    buttonsDisableFlag = false;
    buttonsDisable(buttonsDisableFlag);
});





















