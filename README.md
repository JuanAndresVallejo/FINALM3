Ver eventos sin borrar usuarios ni compras
(consola del navegador)

let db = JSON.parse(localStorage.getItem("db"));
db.products = [
  { id: 1, name: "LolaPalooza", price: 2000, stock: 15 },
  { id: 2, name: "Estereo Picnic", price: 1800, stock: 10 },
  { id: 3, name: "AltaVoz", price: 2200, stock: 12 },
  { id: 4, name: "TomorrowLand", price: 2200, stock: 12 }
];
localStorage.setItem("db", JSON.stringify(db));

