function mostrarListaLibros() {
    for (let libro in noCart) {
        document.getElementById("listaLibros").innerHTML += `
        ${noCart[libro][0].titulo}
        <br>
        `;
    }
}

document.addEventListener("DOMContentLoaded",function(){
    if (Object.entries(noCart).length === 0) {
        alert("No tienes libros en tu cajón de préstamos.");
    } else {
        mostrarListaLibros();
    }
});