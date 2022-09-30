let info_libro;
let contenido = document.getElementById("contenido");
let imagenes = document.getElementById("imagenes");



function mostrar_infolibro(){

    let htmlcontentoAppend = "";

        htmlcontentoAppend += `
        
            <h3>${info_libro.titulo} </h3>
            <p>${info_libro.isbn}</p>
            <p>${info_libro.editorial} </p>
            <p>${info_libro.paginas} páginas</p>
            <p>${info_libro.autor}</p>
            <p>${info_libro.descripcion}</p>`

    contenido.innerHTML += htmlcontentoAppend;

}


document.addEventListener("DOMContentLoaded", function(){

        getJSONData(LIBRO_URL + localStorage.getItem("libroID") +".json").then(resultado => {
            if (resultado.status == "ok") {
            info_libro = resultado.data;
            mostrar_infolibro();
        } 
        
    })


})