const display = document.querySelector("#display");
const ac = document.querySelector(".ac");
const equal = document.querySelector(".result");


// Inserting the pressed number to display
const count = (num)=>{
    display.value  += num
}

// clear display
const clear = ()=>{
    display.value = "";
}


// evaluate the result of the display
const result = ()=>{
    if(display.value == Infinity){
        alert("Cant divide By Zero (0)")
        clear();
    } else {
display.value = eval(display.value)
} 
}

ac.addEventListener("click", clear)
equal.addEventListener("click", result)