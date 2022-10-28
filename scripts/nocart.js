let fecha;
let formPrestamo = document.getElementById('formPrestamo');
let fechaDev = 0;
let textoErrorReserva = document.getElementById('textoErrorReserva');
let dias = 0;
let cantLibros = 0;

// Funcion que calcula la fecha de devolucion del libro:
function fechaDevolucion(fecha, dias) {
    let fechaDev = new Date();
    fechaDev.setDate(fecha.getDate() + dias);
    return fechaDev;
}

// Funcion que muestra la lista de libros en el cajon de prestamos:
function mostrarListaLibros() {
    document.getElementById("tituloTabla").innerHTML += `
    <div class="row">
        <div class="col-2">   
        </div>
        <div class="col-3">
            <h5>Título</h5>
        </div>
        <div class="col-2">
            <h5>Páginas</h5>
        </div>
        <div class="col-3">
            <h5>Fecha de devolución</h5>
        </div>
        <div class="col-2"> 
        </div>
    </div>
    `;
    
    
    for (let libro in noCart) {
        cantLibros++;
        dias += (parseInt(noCart[libro][0].paginas)) / 50
        
        
        document.getElementById("listaLibros").innerHTML += `
        <hr>
        <div class="libroEnCarrito row mb-4" data-paginas='${noCart[libro][0].paginas}'>
            <div class="col-4 col-md-2">
                <img src="${noCart[libro][0].imagen}" height="150px">
            </div>
            <div class="col-3 d-none d-md-block">
                <strong>${noCart[libro][0].titulo}</strong>
            </div>
            <div class="col-2 d-none d-md-block">
                ${noCart[libro][0].paginas}
            </div>
            <div class="fechaDevolucion col-3 d-none d-md-block">
            </div>
            <div class="col-2 text-end d-none d-md-block"> 
                <button type="button" class="btn btn-outline-secondary btn-sm" onclick="eliminarLibro(${noCart[libro][0].id})">
                    Quitar
                </button>
            </div>
            <div class="col-8 d-block d-md-none">
                <h6>${noCart[libro][0].titulo}</h6><br>
                ${noCart[libro][0].paginas} páginas<br>
                <strong>Devolución: </strong><span class='fechaDevolucion'></span> <br>
                <button type="button" class="btn btn-outline-secondary btn-sm" onclick="eliminarLibro(${noCart[libro][0].id})">
                    Quitar
                </button>
            </div>
        </div>
        `;
    }
    let fecha = new Date();
    fechaDev = fechaDevolucion(fecha,dias);
    let devoluciones = document.getElementsByClassName('fechaDevolucion');
    for(let i = 0;i < devoluciones.length;i++){
        devoluciones[i].innerHTML = `${fechaDev.getDate()}/${fechaDev.getMonth() + 1}/${fechaDev.getFullYear()}`;
    }
}

// Funcion que elimina un libro del cajón:
function eliminarLibro(libroID) {
    let id = "A" + libroID;
    delete noCart[id];
    localStorage.setItem("noCart", JSON.stringify(noCart));
    event.target.parentNode.parentNode.remove();
    // Aviso si el cajon queda vacio:
    if (Object.entries(noCart).length === 0) {
        avisoListaVacia()
    }
    window.location.href = window.location.href
}

// Funcion que avisa si el cajon de prestamos esta vacio:
function avisoListaVacia() {
    document.getElementById("listaLibros").innerHTML = `
        <hr>
        <p class="lead text-muted text-center fw-bold">No tienes libros en tu cajón de préstamos.</p>
    `;
    document.getElementById("solicitarLibros").disabled = true;
}

// Funciones que se ejecutan una vez cargado el HTML:
document.addEventListener("DOMContentLoaded", function () {
    if (Object.entries(noCart).length === 0) {
        avisoListaVacia()
    } else {
        mostrarListaLibros();
    }
});

formPrestamo.addEventListener("submit", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!formPrestamo.checkValidity()) {
            flag = false;
        }
        else{
            if(dias>15 || cantLibros > 3)
                document.getElementById('alertaError').classList.add('show')
            if(dias > 15)
                textoErrorReserva.innerHTML += '<li>Se pasa de días</li>'
            if(cantLibros > 3)
                textoErrorReserva.innerHTML += '<li>Solo puedes reservar como máximo 3 libros</li>'
        }
        formPrestamo.classList.add("was-validated");
});

let calleDireccion = document.getElementById('calle');
let numeroDireccion = document.getElementById('numero');

/*
`
<div class="modal fade" id="tiket" tabindex="-1" aria-labelledby="tiketPrestamo" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title">¡Gracias por tu reserva!</h5>
  </div>
  <div class="modal-body">
  <p>${localStorage.getItem("mail")}, tu préstamo ya fue aceptado.</p>
  <p>Libros reservados:${noCart[libro][0].titulo}</P>
  <p>Fecha de devolución: ${fechaDev.getDate()}/${fechaDev.getMonth() + 1}/${fechaDev.getFullYear()}<p
  <p>Dirección de envío:${calleDireccion.value} ${numeroDireccion.value} </P>
  
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Aceptar</button>
  </div>
</div>
</div>
<
`*/