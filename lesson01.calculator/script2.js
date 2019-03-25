const display = document.querySelector("#display");
const ac = document.querySelector(".ac");
const equal = document.querySelector(".result");

let input = 0;
let counter = [];

// Inserting the pressed number to display
const count = (num)=>{
    document.querySelector("#display").value += num;
    input += num;

}


const operatorBtn = (arg) => {
    input = parseFloat(input);
    addToCounter(input);
    addToCounter(arg);
    document.querySelector("#display").value += arg;
    input = 0;
}

const addToCounter = (input) => 
    counter.push(input);


    // clear display
const clear = ()=>{
    display.value = "";
    input = 0;
    counter = [];
}


// evaluate the result of the display
const result = (arg)=>{
        if (input !== 0) {
        input = parseFloat(input);
        addToCounter(input);
        }
        let answer = counter[0];
        for (let i=2; i< counter.length; i = i+2){
            switch (counter[1]) {
                case '+':
                    answer+= counter[i];
                    break;
                case '-':
                    answer-= counter[i];
                    break;
                case '/':    if (counter[i] === 0) {
                    alert("Cant divided By Zero !")
                }
                    else  
                    answer = answer / counter[i];
                    break;
                 case'*': answer = answer * counter[i];
                    break;
            } 
        }        document.querySelector("#display").value = answer;
        input = 0;
} 

// adding event listeners
ac.addEventListener("click", clear)
equal.addEventListener("click", result);