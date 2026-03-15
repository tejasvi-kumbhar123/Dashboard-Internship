function register() {
    localStorage.setItem("user", u.value);
    localStorage.setItem("pass", p.value);
    msg.innerText = "Registered successfully";
}

function login() {
    if (
        u.value === localStorage.getItem("user") &&
        p.value === localStorage.getItem("pass")
    ) {
        localStorage.setItem("logged", "yes");
        window.location.href = "dashboard.html";
    } else {
        msg.innerText = "Login failed";
    }
}

function checkAuth() {
    if (localStorage.getItem("logged") !== "yes") {
        window.location.href = "index.html";
    } else {
        welcome.innerText = "Welcome!";
    }
}

function logout() {
    localStorage.removeItem("logged");
    window.location.href = "index.html";
}
