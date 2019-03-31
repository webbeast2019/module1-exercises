let users = document.querySelector('.users');
let usersString = '';

fetch('https://api.github.com/users')
.then(res => res.json())
.then((data) => {    
     data.forEach(user => {        
        usersString +=
            `<div class="card">
            <img src=${user.avatar_url} >
            <div class="container">              
              <h4>Login: <b>${user.login}</b></h4>
            </div>
          </div>`
    })
    users.innerHTML = usersString;    
});





