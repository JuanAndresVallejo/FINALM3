// Crear el boton del modo oscuro y colocarlo al final del navbar
const navbar = document.getElementById("navbar");
const themeBtn = document.createElement("button");
themeBtn.id = "toggle-theme";
themeBtn.textContent = "🌙";
navbar.querySelector(".nav-links").appendChild(themeBtn);

// Aplicar modo oscuro desde localStorage si estaba activo
if (localStorage.getItem("darkMode") === "true") {
document.body.classList.add("dark");
themeBtn.textContent = "☀️";
}

// Cambiar tema al hacer clic
themeBtn.addEventListener("click", () => {
document.body.classList.toggle("dark");
const isDark = document.body.classList.contains("dark");
localStorage.setItem("darkMode", isDark);
themeBtn.textContent = isDark ? "☀️" : "🌙";
});
