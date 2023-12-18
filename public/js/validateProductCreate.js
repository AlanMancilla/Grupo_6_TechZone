let nameProduct = document.getElementById('name');
let description = document.getElementById('description');
let image = document.getElementById('input-image');
let price = document.getElementById('price');

let previewImage = document.getElementById('preview-image');
let guideImage = document.getElementById('guide-image');

nameProduct.addEventListener('change', function() {
    displayValidationMessage("productNameValidation", validateProductName(nameProduct.value));
});

description.addEventListener('change', function() {
    displayValidationMessage("productDescriptionValidation", validateProductDescription(description.value));
});

price.addEventListener('change', function() {
    displayValidationMessage("productPriceValidation", validateProductPrice(price.value));
});

image.addEventListener('change', function() {
    displayValidationMessage("productImageValidation", validateProductImage(image.value));
    showImagePreview();
});

function displayValidationMessage(elementId, message) {
    var validationMessageElement = document.getElementById(elementId);
    validationMessageElement.textContent = message;

    if (message === "¡Campo válido!") {
        validationMessageElement.classList.add("valid");
    } else {
        validationMessageElement.classList.remove("valid");
    }

    validationMessageElement.style.display = "block";
}

function validateProductName(productName) {
    if (productName.length <= 2) {
        return "¡El nombre del producto no puede estar vacío!";
    }
    return "¡Campo válido!";
}

function validateProductPrice(productPrice) {
    if (productPrice < 0) {
        return "El precio no puede esta vacio";
    }
    return "¡Campo válido!";
}

function validateProductImage(productImage) {
    let regeximage = /\.(jpg|jpeg|png|gif)$/i;
    if (!productImage) {
        return "¡Debe subir una imagen!";
    }
    if (!regeximage.test(productImage)) {
        guideImage.style.display = 'block';
        return "Por favor, sube una imagen válida (JPG, JPEG, PNG, GIF).";
    }
    guideImage.style.display = 'none';
    return "¡Campo válido!";
}

function validateProductDescription(productDescription) {
    if (productDescription.length <= 20) {
        return "¡La descripción del producto debe tener minimo 20 caracteres";
    }
    return "¡Campo válido!";
}

function showImagePreview() {
    if (image.files && image.files[0]) {

        const reader = new FileReader();

        reader.onload = function(e) {
            previewImage.src = e.target.result;
        };

        reader.readAsDataURL(image.files[0]);
    }
}

function validarProduct() {
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let image = document.getElementById('input-image').value;
    let price = document.getElementById('price').value;

    // Validar name
    if (name.length < 2) {
        alert('El name debe tener al menos 2 caracteres.');
        return false;
    }

    if (price < 1) {
        alert('Debe poner un precio');
        return false;
    }

    // Validar descripcion
    if (description.length < 20) {
        alert('La Descripcion debe tener al menos 20 caracteres.');
        return false;
    }

    // Validar image
    let regeximage = /\.(jpg|jpeg|png|gif)$/i;
    if (!regeximage.test(image)) {
        alert('Por favor, sube una imagen válida (JPG, JPEG, PNG, GIF).');
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