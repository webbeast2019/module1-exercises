const tds = document.getElementsByTagName('td');
let result = document.querySelector('.result');
let action = null;
let Num1 = '0';
let Num2 = '';

for (var i = 1; i < tds.length; i++) {
    tds[i].addEventListener('click', function() {
        let content = this.textContent;
        if (content === '=') {
            result.textContent = calculateResult();
            Num1 = result.textContent;
            Num2 = '';
            action = null;
        } else if (content === 'CE'){
            result.textContent = '0';  
            Num1 = '0';
            Num2 = '';
            action = null;
        } else if ((content === '+') || (content === '*') || (content === '/') || (content === '-')) {
            if (action) {
                result.textContent = calculateResult();
                Num1 = result.textContent;
                Num2 = ''; 
            } else if ((result.textContent === 'Infinity') || (result.textContent === 'NaN') || (result.textContent === '.')) {
                result.textContent = '0'
                Num1 = '0';
            }
            action = content;
            result.textContent += content;
        } else {
            if ((result.textContent === 'Infinity') || (result.textContent === 'NaN') || (result.textContent === '0')) {
                result.textContent = content;
                Num1 = content;
            } else {
                result.textContent += content;
                if (action) {
                    Num2 += content;
                } else {
                    Num1 += content;
                }
            }
        }
    });
}


function calculateResult() {
    if (Num2 === '') {return 'NaN';}
    n1 = Number(Num1);
    n2 = Number(Num2);
    switch(action) {
        case '+':
            return n1 + n2;
        case '-':
            return n1 - n2;
        case '*':
            return n1 * n2;
        case '/':
            return n1 / n2;
    }
}
