function validarProduct() {
    let name = document.getElementById('name').value;
    let Description = document.getElementById('Description').value;
    let image = document.getElementById('input-image').value;

    // Validar name
    if (name.length < 2) {
        alert('El name debe tener al menos 2 caracteres.');
        return false;
    }

   // Validar descripcion
   if (Description.length < 20) {
    alert('La Descripcion debe tener al menos 20 caracteres.');
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
    if (validarProduct()) {
        form.submit();
    }
})