let info_libro;
let contenido = document.getElementById("contenido");
let imagenes = document.getElementById("imagenes");


function mostrar_infolibro() {

    // Agrego informacion del libro al html:
    let htmlcontentoAppend = "";
    htmlcontentoAppend += `
        <h3>${info_libro.titulo}</h3>
        <h5 class="text-muted">${info_libro.autor}</h5>
        <hr>
        <p class="text-muted">${info_libro.isbn}<br>
        ${info_libro.editorial}<br>
        ${info_libro.paginas} páginas</p>
        <hr>
        <p>${info_libro.descripcion}</p>
        <hr>
        `
    contenido.innerHTML += htmlcontentoAppend;

    // Agrego imagenes del libro al html:
    let images = "";
    for (let imagen of info_libro.imagenes) {
        images += `
        <img height="200" src="${imagen}" alt="${imagen}">
        `;
    }
    imagenes.innerHTML += images;
}


document.addEventListener("DOMContentLoaded", function(){

    getJSONData(LIBRO_URL + localStorage.getItem("libroID") +".json").then(resultado => {
        
        if (resultado.status == "ok") {
            info_libro = resultado.data;
            mostrar_infolibro();
        } 
        
    })


})
