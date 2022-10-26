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

function validar(form,e){
    resu = true;
    e.preventDefault();
    e.stopPropagation();
    if(!form.checkValidity()){
        resu = false;
    }
    form.classList.add("was-validated");
    return resu
}

document.addEventListener("DOMContentLoaded",function(){
    let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit",function(e){
        if(validar(loginForm,e)){
            let mail = document.getElementById('inputEmail').value;
            localStorage.setItem('mail',mail);
            window.location.href = 'index.html';
            
        }
    });
});