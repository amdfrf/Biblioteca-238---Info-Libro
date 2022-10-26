let info_libro;
let contenido = document.getElementById("contenido");
let imagenes = document.getElementById("imagenes");
let libroID = localStorage.getItem("libroID");

// Funcion para agregar libro al cajon de prestamos:
function guardarLibro() {
    let libro = "A" + libroID; // concateno con letra al principio porque solo numeros da problemas
    if (noCart[libro]) {
        alert("El libro ya está en el cajón.");
    } else {
        noCart[libro] = [
            {
                id: libroID,
                titulo: info_libro.titulo,
                paginas: info_libro.paginas,
                imagen: info_libro.imagenes[0]
            }
        ]
        localStorage.setItem("noCart",JSON.stringify(noCart));
        alert("Libro agregado al cajón.");
    }
}

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
    
    getJSONData(LIBRO_URL + libroID +".json").then(resultado => {
        
        if (resultado.status == "ok") {
            info_libro = resultado.data;
            mostrar_infolibro();

            document.getElementById("addToCart").addEventListener("click",function(){
                guardarLibro();
            });
        } 
        
    });
    
})