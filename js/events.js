function renderProducts(role) {
const content = document.getElementById("main-content");
const db = JSON.parse(localStorage.getItem("db"));

// Iniciamos la busqueda del evento

content.innerHTML = `
    <section class="product-section">
    <h2>Active Events</h2>
    <input type="text" id="search" placeholder="Search Event..." />
    <div id="product-list" class="grid"></div>
    </section>
`;

const productList = document.getElementById("product-list");

const renderList = (products) => {
    productList.innerHTML = "";
    products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <p>In stock: ${product.stock}</p>
        <div class="actions">
        ${
            role === "U" ? `
            <input type="number" min="1" max="${product.stock}" value="1" id="qty-${product.id}">
            <button onclick="addToCart(${product.id})">Add to cart</button>
            ` : `
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
            `
        }
        </div>
    `;

    productList.appendChild(card);
    });
};

renderList(db.products);

// Busqueda simple
document.getElementById("search").addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    const filtered = db.products.filter(p => p.name.toLowerCase().includes(query));
    renderList(filtered);
});
}

// Funcion para añadir al carrito
function addToCart(productId) {
const db = JSON.parse(localStorage.getItem("db"));
const session = JSON.parse(localStorage.getItem("session"));
const qtyInput = document.getElementById(`qty-${productId}`);
const quantity = parseInt(qtyInput.value);

const product = db.products.find(p => p.id === productId);
if (!product || product.stock < quantity) {
    alert("There's no more stock");
    return;
}

product.stock -= quantity;

if (!session.cart) session.cart = [];
const existing = session.cart.find(p => p.id === productId);
if (existing) {
    existing.quantity += quantity;
} else {
    session.cart.push({ id: product.id, name: product.name, price: product.price, quantity });
}

localStorage.setItem("session", JSON.stringify(session));
localStorage.setItem("db", JSON.stringify(db));
alert("Added to your cart");
}

// FUNCIONES ADMIN: editar y eliminar producto (placeholder)

function editProduct(id) {
alert("FUNCTION IN PROGRESS...");
}

function deleteProduct(id) {
let db = JSON.parse(localStorage.getItem("db"));
db.products = db.products.filter(p => p.id !== id);
localStorage.setItem("db", JSON.stringify(db));
renderProducts("A");
}
