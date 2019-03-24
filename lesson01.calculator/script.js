var tds = document.getElementsByTagName('td');
var result = document.querySelector('.result');

for (var i = 1; i < tds.length; i++) {
    tds[i].addEventListener('click', function() {
        if (this.textContent === '=') {
            try {
                result.textContent = eval(result.textContent);
            } catch (e) {
                if (e instanceof SyntaxError) {
                    result.textContent = 'NaN';
                }
            }
        } else if (this.textContent === 'CE'){
            result.textContent = null;    
        } else {
            if ((result.textContent === 'Infinity') || (result.textContent === 'NaN') || (result.textContent === '0')) {
                result.textContent = this.textContent;
            } else {
                result.textContent += this.textContent;
            }
        }
    });
}

