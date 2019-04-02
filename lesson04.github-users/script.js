
fetch('https://api.github.com/search/users?q=created:%3E=2019-01-01')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        myJson.items.forEach(user => {
            addUser(user);
        });
    });

function addUser(userData) {
    const userNode = document.createElement('section');
    userNode.className = 'user-card';
    userNode.innerHTML = `
            <section class="user-card ">
                <img class="user-card img" src="${userData.avatar_url}">
                <figure class="user-name">
                    <h3>User name: <a href="${userData.html_url}"> ${userData.login} </a></h3>
                </figure>
            </section> 
            `;
    document.querySelector('.output').appendChild(userNode);
}

