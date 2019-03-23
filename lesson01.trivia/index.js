const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var value = form.elements['choice'].value;
    var tag = document.getElementsByClassName(value)[0];
    tag.style.display = 'inline';
});