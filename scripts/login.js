// user:        eljose1960@mail.com
// password:    pepe1960

/*
document.getElementById("submitBtn").addEventListener("click", function () {
    let email = document.getElementById("inputEmail");
    let password = document.getElementById("inputPassword");
    let seCumple = true;

    if (email == "") {
        seCumple = false;
        alert("Falta el email");
    }

    if (password == "") {
        seCumple = false;
        alert("Falta el password");
    }

    if (seCumple) {
        window.location.href = "index.html";
    }
});
*/

function validar(form, e) {
    let flag = true;
    e.preventDefault();
    e.stopPropagation();
    if (!form.checkValidity()) {
        flag = false;
    }
    form.classList.add("was-validated");
    return flag
}

document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (e) {
        if (validar(loginForm, e)) {
            let email = document.getElementById('inputEmail').value;
            localStorage.setItem('email', email);
            window.location = 'index.html';
        }
    });
});