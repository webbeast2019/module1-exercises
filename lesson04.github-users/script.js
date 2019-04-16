
const ul = document.querySelector('ul');

fetch('https://api.github.com/users')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        return myJson;
    })
    .then(function (users) {
       printUsers(users);
       ul.innerHTML = li;
    });


let li = '';

 function printUsers(users) {
    users.forEach(user => {
        const userName = user.login;
        const userImg = user.avatar_url;
        const userHTML = `<li>
                            <img src=${userImg}>
                            <h2>${userName}</h2>
                        </li>`;
        li += userHTML;
    });
 }   

