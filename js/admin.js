// Esta funcion puede llamarse cuando se cree, edite o elimine un producto

function logStockAction(action, productName, adminName) {
const db = JSON.parse(localStorage.getItem("db"));
const logEntry = {
    action,
    productName,
    adminName,
    date: new Date().toLocaleString()
};
db.stockHistory.push(logEntry);
localStorage.setItem("db", JSON.stringify(db));
}

// Esta funcion se puede usar para visualizar el historial desde el perfil de admin si se desea

function showStockHistory() {
const db = JSON.parse(localStorage.getItem("db"));
const content = document.getElementById("main-content");

const historyHTML = db.stockHistory.map(entry => `
    <li>
    <strong>${entry.action.toUpperCase()}</strong> the product <em>${entry.productName}</em>
    by <strong>${entry.adminName}</strong> the ${entry.date}
    </li>
`).join("");

content.innerHTML = `
    <section>
    <h2>Stock History</h2>
    <ul>${historyHTML || "<p>There's no history</p>"}</ul>
    </section>
`;
}
