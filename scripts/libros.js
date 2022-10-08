let listaLibros = [];
let min = undefined;
let max = undefined;
let search = undefined;

// Redirecciono a info del libro al seleccionar libro:
function redireccionar(id) {
    localStorage.setItem("libroID", id);
    window.location = "ver-libro.html";
}

// Muestro lista de libros aplicando filtros:
function mostrarLibros(arrayLibros) {
    document.getElementById("listado").innerHTML = "";
    for (let libro of arrayLibros) {
        libro.paginas = parseInt(libro.paginas);

        if  (!(libro.paginas < min) && !(libro.paginas > max))
         /* ((min == undefined && max == undefined) || (libro.paginas >= min && libro.paginas <= max) ||
        (libro.paginas >= min && max == undefined) || (libro.paginas <= max && min == undefined)) */ {

            if (search == undefined || search == "" || libro.titulo.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                let contenido = `
                <li class="list-group-item cursor-active bg-transparent" onclick="redireccionar(${libro.id})">
                    <h5>${libro.titulo}</h5>
                    <p class="mb-1 text-muted">${libro.autor}</p>
                    <p class="mb-1 text-muted" id="cantPaginas">Páginas: ${libro.paginas}</p>
                </li>
                `;
                document.getElementById("listado").innerHTML += contenido;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(LIBROS_URL).then(resultado => {
        if (resultado.status == "ok") {
            listaLibros = resultado.data;
            mostrarLibros(listaLibros);
            document.getElementById("filtrar").addEventListener("click", function () {
                if (document.getElementById("rango-min").value != "") {
                    min = parseInt(document.getElementById("rango-min").value);
                }else{
                    min = undefined;
                }
        
                if (document.getElementById("rango-max").value != "") {
                    max = parseInt(document.getElementById("rango-max").value);
                }else{
                    max = undefined;
                }
                mostrarLibros(listaLibros);
            })
        
            document.getElementById("limpiar").addEventListener("click", function () {
                min = undefined;
                max = undefined;
                document.getElementById("rango-min").value = "";
                document.getElementById("rango-max").value = "";
                mostrarLibros(listaLibros);
            })
        
            document.getElementById("buscador").addEventListener("input", function () {
                search = document.getElementById("buscador").value;
                mostrarLibros(listaLibros);
            })
        
            document.getElementById("sortPagDesc").addEventListener("click", function () {
                listaLibros.sort(function (a, b) {
                    return parseInt(b.paginas) - parseInt(a.paginas);
                })
                mostrarLibros(listaLibros);
            })

            
        }else{
            alert("Algo salió mal: " + resultado.data);
        }
    })


});
