const LIBROS_URL = "https://danielk2020.github.io/biblioteca/libros.json";
const LIBRO_URL = "https://danikho2020.github.io/libros-biblioteca/"
let nocart = {}

function getJSONData(url) {
  let result = {};
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      return result;
    });
}

// Inicializo cajon de prestamos:
let noCart = JSON.parse(localStorage.getItem("noCart")); // trae la lista guardada si ya existia
if (noCart == null) {
  noCart = {}; // crea lista vacia para llenar luego, si no habia lista previa
}