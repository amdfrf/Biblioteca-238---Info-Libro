let fecha;

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
        let fecha = new Date();
        let fechaDev = fechaDevolucion(fecha, (parseInt(noCart[libro][0].paginas)) / 50);

        document.getElementById("listaLibros").innerHTML += `
        <hr>
        <div class="row mb-4">
            <div class="col-4 col-md-2">
                <img src="${noCart[libro][0].imagen}" height="150px">
            </div>
            <div class="col-3 d-none d-md-block">
                <strong>${noCart[libro][0].titulo}</strong>
            </div>
            <div class="col-2 d-none d-md-block">
                ${noCart[libro][0].paginas}
            </div>
            <div class="col-3 d-none d-md-block">
                ${fechaDev.getDate()}/${fechaDev.getMonth() + 1}/${fechaDev.getFullYear()}
            </div>
            <div class="col-2 text-end d-none d-md-block"> 
                <button type="button" class="btn btn-outline-secondary btn-sm" onclick="eliminarLibro(${noCart[libro][0].id})">
                    Quitar
                </button>
            </div>
            <div class="col-8 d-block d-md-none">
                <h6>${noCart[libro][0].titulo}</h6><br>
                ${noCart[libro][0].paginas} páginas<br>
                <strong>Devolución:</strong> ${fechaDev.getDate()}/${fechaDev.getMonth() + 1}/${fechaDev.getFullYear()}<br>
                <button type="button" class="btn btn-outline-secondary btn-sm" onclick="eliminarLibro(${noCart[libro][0].id})">
                    Quitar
                </button>
            </div>
        </div>
        `;
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