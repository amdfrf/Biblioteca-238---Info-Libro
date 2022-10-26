let fecha;
function fechaDevolucion (fecha, dias){
    let fechaDev = new Date();
    fechaDev.setDate(fecha.getDate() + dias);
    return fechaDev;
}

// Funcion que muestra la lista de libros en el cajon de prestamos:
function mostrarListaLibros() {
    document.getElementById("listaLibros").innerHTML += `
    <div class="row">
        <div class="col-2">   
        </div>
        <div class="col-3">
            <strong>Título</strong>
        </div>
        <div class="col-2">
            <strong>Páginas</strong>
        </div>
        <div class="col-3">
            <strong>Fecha de devolución</strong>
        </div>
        <div class="col-2"> 
        </div>
    </div>
    `;

    for (let libro in noCart) {
        let fecha = new Date();
        let fechaDev = fechaDevolucion(fecha, (parseInt(noCart[libro][0].paginas))/50);
        
        document.getElementById("listaLibros").innerHTML += `
        <div class="row mb-4">
            <div class="col-2">
                <img src="${noCart[libro][0].imagen}" class="img-thumbnail" height="100px">
            </div>
            <div class="col-3">
                ${noCart[libro][0].titulo}
            </div>
            <div class="col-2">
                ${noCart[libro][0].paginas}
            </div>
            <div class="col-3">
                ${fechaDev.getDate()}/${fechaDev.getMonth() + 1}/${fechaDev.getFullYear()}
            </div>
            <div class="col-2 text-end"> 
                <button type="button" class="btn btn-outline-secondary" onclick="eliminarLibro(${JSON.stringify(noCart[libro])})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                </button>
            </div>
        </div>
        <hr>
        `;
    }
}

// Funcion que elimina un libro del cajón:
function eliminarLibro(libro) {
    console.log(libro);
    let id = libro.getAttribute('id');
    console.log(id);
    delete noCart[id];
    localStorage.setItem("noCart", JSON.stringify(noCart));
    // event.target.parentNode.parentNode.remove();
}

// Funciones que se ejecutan una vez cargado el HTML:
document.addEventListener("DOMContentLoaded",function(){
    if (Object.entries(noCart).length === 0) {
        alert("No tienes libros en tu cajón de préstamos.");
    } else {
        mostrarListaLibros();
    }
});






