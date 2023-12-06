function validarProduct() {
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;

    // Validar name
    if (name.length < 2) {
        alert('El name debe tener al menos 2 caracteres.');
        return false;
    }

    // Validar descripcion
    if (description.length < 20) {
        alert('La Descripcion debe tener al menos 20 caracteres.');
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
});