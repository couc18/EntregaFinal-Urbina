//Carrito
let planesEnCarrito = localStorage.getItem("carrito")
planesEnCarrito = JSON.parse(planesEnCarrito)
  
  
function actualizarNumeroCarrito() {
  let nuevoNumero = planesEnCarrito.reduce((acc, plan) => acc + plan.cantidad, 0)
  numerito.innerText = nuevoNumero;
  }
  actualizarNumeroCarrito()