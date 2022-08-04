window.addEventListener("load", () => {

    let form = document.querySelector("#form");

    form.addEventListener("submit", (e) => {
        
        form.name.focus();
        let errors = [];

        let name = document.querySelector("#name");
        let price = document.querySelector("#price");
        let category = document.querySelector("#category");
        let description = document.querySelector("#description");
        let image = document.querySelector("#image");


        // --------- name ------------
        if (name.value == "") {
            errors.push("El campo Nombre no puede estar vacío");
            name.classList.remove("is-valid");
            name.classList.add("is-invalid");
        } else if (name.value.length < 5) {
            errors.push("El campo Nombre debe tener al menos 5 caracteres");
            name.classList.remove("is-valid");
            name.classList.add("is-invalid");
        } else {
            name.classList.add("is-valid");
            name.classList.remove("is-invalid");
            form.price.focus();
        };


        // --------- price ------------
        if (price.value == "") {
            errors.push("El campo Precio no puede estar vacío");
            price.classList.remove("is-valid");
            price.classList.add("is-invalid");
        } else if (price.value.length < 3) {
            errors.push("El campo Precio debe tener al menos 3 caracteres");
            price.classList.remove("is-valid");
            price.classList.add("is-invalid");
        } else {
            price.classList.add("is-valid");
            price.classList.remove("is-invalid");
            form.category.focus();
        };

        // --------- category ------------
        if (category.value == "") {
            errors.push("Debe elegir una categoria");
            category.classList.remove("is-valid");
            category.classList.add("is-invalid");
        } else {
            category.classList.add("is-valid");
            category.classList.remove("is-invalid");
            form.description.focus();
        };

        // --------- desciption ------------
        if (description.value == "") {
            errors.push("El campo Descripción no puede estar vacío");
            description.classList.remove("is-valid");
            description.classList.add("is-invalid");
        } else if (description.value.length < 20) {
            errors.push("El campo Descripción debe tener al menos 20 caracteres");
            description.classList.remove("is-valid");
            description.classList.add("is-invalid");
        }else {
            description.classList.add("is-valid");
            description.classList.remove("is-invalid");
            form.image.focus();
        };

            // --------- IMAGE ------------

        if (image.value.length == 0) {
            errors.push ("El campo de imagen no puede estar vacío");
            }
    
            let acceptedExtensions = ['jpeg', 'jpg', 'gif', 'png'];
            let parts = image.value.split('.');
            let extension = parts[parts.length-1];
            if (!acceptedExtensions.includes(extension)){
            errors.push ("Las extensiones de imagen deben ser " + acceptedExtensions.join(", "));
            }
        
        // Controlamos si hay errores 
        /* console.log(errors) */
        if (errors.length > 0) {
            e.preventDefault();
            let ulErrors = document.querySelector(".errores");
            ulErrors.classList.add("alert-warning");
            ulErrors.innerHTML = "";
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>";
            };
        } else {
            form.submit();
        }
    });
})