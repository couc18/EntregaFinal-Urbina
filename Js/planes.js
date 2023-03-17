// Clases

class Plan {
    constructor (id,titulo,imagen,categoria,precio,descripcion){
        this.id = id;
        this.titulo= titulo;
        this.imagen = imagen;
        this.categoria = categoria;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}

class Categoria {
    constructor(nombre, id){
        this.nombre = nombre;
        this.id=id;
    }
}

// Fetch
const categoria = [ ];
let planes = [ ];

  fetch('http://127.0.0.1:5501/Js/planes.json')
  .then(response => response.json())
  .then(data => {
    
    planes = data; 
    cargarPlanes(planes)
  }).catch(error => {
    console.error(error)
  })


// Inicio del programa 
  const contenedorPlanes  = document.getElementById("contenedor-planes")
  const botonesCategoria = document.querySelectorAll(".boton-categoria")
  const tituloPrincipal = document.getElementById("titulo-principal")
  let botonesAgregar = document.querySelectorAll(".plan-boton")
  const numeroCarrito = document.querySelector("#numerito")


// Funciones
  
  function cargarPlanes(planesSeleccionados) {

    contenedorPlanes.innerHTML = " ";
    planesSeleccionados.forEach(plan => {
  
      const div = document.createElement("div");
      div.classList.add("Plan")
      div.innerHTML = `
      <img class= "plan-imagen" src="${plan.imagen}" alt="${plan.titulo}">
      <div class = "plan-detalle">
      <h3 class = "plan-titulo" >${plan.titulo}</h3>
      <p class= "plan-precio">${plan.precio}</p>
      <p class= "plan-descripcion">${plan.descripcion}</p>
      <button class="plan-boton" id="${plan.id}">Agregar</button>
      </div>`;
  
      contenedorPlanes.append(div);
      
    })
    actualizarBotonesAgregar()
 
  }  
 

  botonesCategoria.forEach(boton =>{
      boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos") {
            let planesCategoria = planes.find(plan => plan.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerHTML = planesCategoria.categoria.nombre;
            const planesBoton = planes.filter(plan => plan.categoria.id === e.currentTarget.id);
            cargarPlanes(planesBoton)
        } else {
            tituloPrincipal.innerText = "Todos los planes";
            cargarPlanes(planes)
        }


        
      })
  })
  
  function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".plan-boton")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
  }

 
  let carrito

  let planesEnCarritoLS = localStorage.getItem("carrito")
 
  if(planesEnCarritoLS){
    carrito = JSON.parse(planesEnCarritoLS);
    actualizarNumeroCarrito()
  }else {
    carrito = [];
  }
 

  function agregarAlCarrito(e) {

    Toastify({
      text: "Plan Agregado",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right,#ffffff, #068f02, #131010)",
        borderRadius: "2rem",
        fontsize: "0.50rem"
      }, offset: {
        x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: '1.5rem', // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      onClick: function(){} // Callback after click
    }).showToast();

    const idboton = e.currentTarget.id;
    const planAgregado = planes.find(plan => plan.id === idboton)

    if(carrito.some(plan => plan.id === idboton)){
        const index = carrito.findIndex(plan => plan.id === idboton)
        carrito[index].cantidad++;
    }else {
        planAgregado.cantidad = 1;
        carrito.push(planAgregado)
    }
    actualizarNumeroCarrito()
    
    localStorage.setItem("carrito", JSON.stringify(carrito))
  }
  
  function actualizarNumeroCarrito() {
    let nuevoNumero = carrito.reduce((acc, plan) => acc + plan.cantidad, 0)
    numerito.innerText = nuevoNumero;
  }

