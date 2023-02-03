let api = 'https://localhost:7262/api/Users/register'
let form = document.getElementById('signup-form') 
let loginForm = document.getElementById('login-form')
form.addEventListener('submit', formHandler);
let toast = document.querySelector(".toast-text");
if (isAuthenticated()) {
    window.location.href = "/";
}
function formHandler(event) {
    event.preventDefault();
    let username = document.querySelector('#username').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    addUser(username, email, password);
}
async function addUser(username, email, password) {
    let data = {
        username: username,
        email: email,
        password: password,
    }
    let response = await fetch("https://localhost:7262/api/Users/register", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    let register = await response.text();
    toast.innerHTML = register;
    $(".error").toast("show");
}

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    login(document.querySelector('#login-form input[name="txt"]').value, document.querySelector('#login-form input[name="pswd"]').value);
});
async function login(username, password) {
    let data = {
        username: username,
        password: password
    }
    let response = await fetch("https://localhost:7262/api/Users/login", {
        method: "POST",
        headers: {
            'accept': 'text/plain',
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    var login = await response.text();
    if (response.status == 400) {
        toast.innerHTML = login;
        $(".error").toast("show");
    }
    if (response.status === 200) {
        var roleResponse = await fetch("https://localhost:7262/api/Users/info/" + username, {
            method: "GET",
            headers: {
                'accept': 'text/plain',
                'content-type': 'application/json'
            }
        });
        var role = await roleResponse.text();
        var sessionData = { username: username, role: role, token: login }
        localStorage.setItem('auth', JSON.stringify(sessionData));
        if (role == 'Admin') {
            window.location.href = "/admin";
        } else {
            window.location.href = "/";
        }
    } else {
        response.text().then((login) => {
            $(".error").toast("show");
        })
    }
}
function isAuthenticated() {
    if (localStorage.getItem('auth') != null) {
        return true;
    }
    return false;
}