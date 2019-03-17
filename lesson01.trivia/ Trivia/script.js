const btn = document.getElementById("submitBtn");
const answerInput = document.getElementById("answerInput");


let checkAnswer = function() {
    if (Number(answerInput.value) === 2){
        alert("Correct, You Are A Genius!")
        
    } else {
        alert("Wrong Answer,Try Again!")
    }
}

btn.addEventListener("click", checkAnswer);