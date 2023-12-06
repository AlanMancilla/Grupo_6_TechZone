function validarLogin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Validar email
    let regexEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!regexEmail.test(email)) {
        alert("Por favor, introduce un email válido.");
        return false;
    }

    // Validar contraseña
    let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!regexPassword.test(password)) {
        alert("La contraseña es obligatoria.");
        return false;
    }
    return true;
}

const form = document.querySelector(".formulario");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validarLogin()) {
        form.submit();
    }
});
