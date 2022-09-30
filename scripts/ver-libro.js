let info_libro;
let contenido = document.getElementById("contenido");
let imagenes = document.getElementById("imagenes");



function mostrar_infolibro(){

    let htmlcontentoAppend = "";

        htmlcontentoAppend += `
        
            <h3>${info_libro.titulo} </h3>
            <p>${info_libro.isbn} <br>
            ${info_libro.editorial} <br>
            ${info_libro.paginas}   <br>
            ${info_libro.autor} <br>
            ${info_libro.descripcion}
            </p>


        `

    contenido.innerHTML += htmlcontentoAppend;

}


document.addEventListener("DOMContentLoaded", function(){

        getJSONData(LIBRO_URL + localStorage.getItem("libroID") +".json").then(resultado => {
            if (resultado.status == "ok") {
            info_libro = resultado.data;
            mostrar_infolibro();
        }
        
        
        })

});