function renderProfile(role) {
const content = document.getElementById("main-content");
const db = JSON.parse(localStorage.getItem("db"));
const session = JSON.parse(localStorage.getItem("session"));


// Diferenciamos de que es administrador

if (role === "U") {
    const myPurchases = db.purchases.filter(p => p.userId === session.id);

    const purchaseHTML = myPurchases.map(p => {
    const itemsHTML = p.items.map(i => `<li>${i.name} — ${i.quantity} x $${i.price}</li>`).join("");
    return `
        <details>
        <summary><strong>Total:</strong> $${p.total} — ${p.date}</summary>
        <ul>${itemsHTML}</ul>
        </details>
    `;
    }).join("");

    content.innerHTML = `
    <section>
        <h2>My Space</h2>
        <p><strong>Name:</strong> ${session.name}</p>
        <p><strong>Email:</strong> ${session.email}</p>
        <button onclick="showEditForm()">Edit my data</button>
        <h3>My history</h3>
        ${purchaseHTML || "<p>You don't have purchases</p>"}
        <div id="edit-form" style="display:none; margin-top:1rem;">
        <input type="email" id="edit-email" placeholder="New Email" />
        <input type="password" id="edit-pass" placeholder="New Password" />
        <button onclick="saveProfileChanges()">Save</button>
        </div>
    </section>
    `;
}

// Diferenciamos que es usuario

if (role === "A") {
    const userHTML = db.users.map(u => {
    const userPurchases = db.purchases.filter(p => p.userId === u.id);
    const purchaseHTML = userPurchases.map(p => {
        const items = p.items.map(i => `<li>${i.name} — ${i.quantity} x $${i.price}</li>`).join("");
        return `
        <details>
            <summary>Total: $${p.total} — ${p.date}</summary>
            <ul>${items}</ul>
        </details>
        `;
    }).join("");

    return `
        <div class="admin-user-box">
        <h4>${u.name} (${u.role === "A" ? "Admin" : "User"})</h4>
        <p><strong>Email:</strong> ${u.email}</p>
        <button onclick="editUser(${u.id})">Edit</button>
        <button onclick="deleteUser(${u.id})">Delete</button>
        <div>${purchaseHTML || "<em>No history purchases</em>"}</div>
        </div>
    `;
    }).join("");

    content.innerHTML = `
    <section>
        <h2>Users Logs</h2>
        ${userHTML}
    </section>
    `;
}
}

// Actualizacion de datos

function showEditForm() {
document.getElementById("edit-form").style.display = "block";
}

function saveProfileChanges() {
const email = document.getElementById("edit-email").value.trim();
const password = document.getElementById("edit-pass").value.trim();

const db = JSON.parse(localStorage.getItem("db"));
let session = JSON.parse(localStorage.getItem("session"));

if (email) session.email = email;
if (password) session.password = password;

const index = db.users.findIndex(u => u.id === session.id);
db.users[index] = session;

localStorage.setItem("db", JSON.stringify(db));
localStorage.setItem("session", JSON.stringify(session));

alert("Data updated");
renderProfile(session.role);
}

function editUser(id) {
alert("FUNCTION IN PROGRESS");
}

function deleteUser(id) {
const db = JSON.parse(localStorage.getItem("db"));
db.users = db.users.filter(u => u.id !== id);
localStorage.setItem("db", JSON.stringify(db));
renderProfile("A");
}
