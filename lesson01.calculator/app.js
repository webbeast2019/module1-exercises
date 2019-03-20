var screen = '';//string that represent what we can see on the calculator screen

var operators = ['*','/','+','-','='];

var buttons =['.zero','.one','.two','.three','.four','.five','.six','.seven','.eight','.nine','.plus','.div','.multi','.minus','.point'];//exept 'C' button

var buttonsDisableFlag = false;

var showingResultFlag = false; //flag that tells us if an equal result is shwon or not on the screen 


//function that update the calculator screen after a click on a number button (except zero)
function numberClick(number){
    
    if(showingResultFlag === true){
        screen = '';
        showingResultFlag = false;
    }
    
    //fixig erorr for eval func. in some cases when dividing by a nuber that start with unnecessary zero the eval function carsh (exemple "1/07.09") 
    if(screen[screen.length-1] === "0"){
        for(var i = 0; i <= operators.length-1 ; i++){
            if(screen[screen.length-2] === operators[i]){
                screen = screen.substring(0, screen.length-1);
            }
        }
    }
    
    screen += document.querySelector(number).innerHTML;
    document.querySelector('.screen').innerHTML = screen;
    
    screenCheck();
}


//function that update the calculator screen after clicking on an operator button (exept equal)
function operatorClick(operator, operatorSing){
    if(screen.length === 0 && operatorSing !== "-")
        return;
    
    if(screen.length === 1 && screen[0] === "-")
        return;
    
    showingResultFlag = false; 
    
    //loop that take care of the case of clicking on two operators buttons in a row
    for(var i = 0; i<=operators.length-1; i++){
        if(screen[screen.length-1] === operators[i]){
            screen = screen.substring(0, screen.length-1) + operatorSing;
            document.querySelector('.screen').innerHTML = screen;
            return;
        }
    }
    
    if(screen.length === 24){
        return;
    }
    
    screen += document.querySelector(operator).innerHTML;
    document.querySelector('.screen').innerHTML = screen;
    
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
    for(var i=0 ; i<=buttons.length-1; i++){
        document.querySelector(buttons[i]).disabled = buttonsDisableFlag;
    }
}




//----------------Event Listeners for all the numbers buttons----------//
document.querySelector('.zero').addEventListener('click', function(){
    if(screen.length === 1)
        return;
    
    if(showingResultFlag === true){
        screen = '';
        document.querySelector('.screen').innerHTML = screen;
        showingResultFlag = false;
    }
    
    if(screen[screen.length-1] === "0"){
        for(var i = 0; i <= operators.length-1 ; i++){
            if(screen[screen.length-2] === operators[i]){
                screen = screen.substring(0, screen.length-1);
            }
        }
    }
    
    screen += document.querySelector('.zero').innerHTML;
    document.querySelector('.screen').innerHTML = screen;
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




//----------------Event Listeners for all the math operators buttons----------//
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
    
    for(var i = 0; i<=operators.length-1; i++){
        if(screen[screen.length-1] === operators[i])
            return;
    }
    
    if(eval(screen).toString() === "Infinity" || eval(screen).toString() === "NaN"){
        alert("Can't divide by zero");
        screen = '';
        document.querySelector('.screen').innerHTML = screen;
        return;
    }
    
    document.querySelector('.screen').innerHTML = eval(screen);
    screen = eval(screen).toString();
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
    
    //loop that check if the last user action wat a math operators. if it was a point can't be clicked
    for(var i = 0; i<=operators.length-1; i++){
        if(screen[screen.length-1]===operators[i])
            return;
    }
    
    screen += document.querySelector('.point').innerHTML; 
    document.querySelector('.screen').innerHTML = screen;
});


document.querySelector('.clear').addEventListener('click', function(){
    screenCheck();
    screen = '';
    document.querySelector('.screen').innerHTML = screen;   
});


document.querySelector('.delete').addEventListener('click', function(){
    if(screen.length === 0){
        return;
    }
    
    screen = screen.substring(0, screen.length-1);
    document.querySelector('.screen').innerHTML = screen;
    
    buttonsDisableFlag = false;
    buttonsDisable(buttonsDisableFlag);
});





















