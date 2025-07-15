// Autenticacion (guardian)

const db = JSON.parse(localStorage.getItem("db")) || {
users: [
    { id: 1, name: "Juan Admin", email: "admin1@hotmail.com", password: "admin123", role: "A" },
    { id: 2, name: "Admin 2", email: "admin2@nana.com", password: "admin123", role: "A" },
    { id: 3, name: "Luis", email: "u1@hotmail.com", password: "user123", role: "U" },
    { id: 4, name: "Ana", email: "u2@hotmail.com", password: "user123", role: "U" },
    { id: 5, name: "Pedro", email: "u3@hotmail.com", password: "user123", role: "U" },
    { id: 6, name: "Valentina", email: "u4@hotmail.com", password: "user123", role: "U" },
    { id: 7, name: "Juan Andres", email: "u5@hotmail.com", password: "user123", role: "U" }
],
products: [],
purchases: [],
stockHistory: []
};

localStorage.setItem("db", JSON.stringify(db));

// Mostrar formularios
document.getElementById("show-register").addEventListener("click", () => {
document.getElementById("login-section").style.display = "none";
document.getElementById("register-section").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", () => {
document.getElementById("login-section").style.display = "block";
document.getElementById("register-section").style.display = "none";
});

// Login
document.getElementById("login-form").addEventListener("submit", function (e) {
e.preventDefault();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();
const user = db.users.find(u => u.email === email && u.password === password);

if (user) {
    localStorage.setItem("session", JSON.stringify(user));
    window.location.href = "pages/app.html";
} else {
    alert("Invalid Email or password");
}
});

// Registro
document.getElementById("register-form").addEventListener("submit", function (e) {
e.preventDefault();
const name = document.getElementById("reg-name").value.trim();
const email = document.getElementById("reg-email").value.trim();
const password = document.getElementById("reg-password").value.trim();

const exists = db.users.find(u => u.email === email);
if (exists) return alert("This mail already exist");

const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role: "U"
};

db.users.push(newUser);
localStorage.setItem("db", JSON.stringify(db));
alert("Success register, now log in");
document.getElementById("show-login").click();
});
