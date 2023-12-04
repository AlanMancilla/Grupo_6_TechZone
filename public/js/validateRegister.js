function validarRegistro() {
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('last_name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let checkPassword = document.getElementById('check_password').value;
    let image = document.getElementById('input-image').value;

    // Validar name
    if (name.length < 2) {
        alert('El name debe tener al menos 2 caracteres.');
        return false;
    }

    // Validar lastName
    if (lastName.length < 2) {
        alert('El Apellido debe tener al menos 2 caracteres.');
        return false;
    }

    // Validar email
    let regexEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!regexEmail.test(email)) {
        alert('Por favor, introduce un email válido.');
        return false;
    }

    // Validar contraseña
    let regexPassword = /^(?=|\d)(?=|[a-z])(?=|[A-Z])(?=|[^a-zA-Z0-9])(?!|\s*).{8,}$/;
    if (regexPassword.test(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas, un número y un carácter especial.');
        return false;
    }
    if (checkPassword !== password) {
        alert('La contraseña debe coincidir');
        return false;
    }

    // Validar image
    let regeximage = /.(jpg|jpeg|png|gif)$/i;
    if (!regeximage.test(image)) {
        alert('Por favor, sube una image válida (JPG, JPEG, PNG, GIF).');
        return false;
    }

    return true;
}

const form = document.querySelector('.formulario');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarRegistro()) {
        form.submit();
    }
})