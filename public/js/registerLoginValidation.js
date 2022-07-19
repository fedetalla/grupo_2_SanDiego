window.addEventListener('load', function(){
    let register = document.querySelector("#formRegister");

    register.addEventListener("submit", function(e){

        let errors = [];

        let name = document.querySelector("#name");
        let email = document.querySelector("#email");
        let password = document.querySelector("#password");
        let image = document.querySelector("#image");
        

        

        // --------- NAME ------------
        if (name.value == "") {
            errors.push("El campo nombre no puede estar vacío");
            name.classList.remove("is-valid");
            name.classList.add("is-invalid");
        } else if (name.value.length < 2) {
            errors.push("El campo nombre debe tener al menos 2 caracteres");
            name.classList.remove("is-valid");
            name.classList.add("is-invalid");
        } else {
            name.classList.add("is-valid");
            name.classList.remove("is-invalid");
            register.email.focus();
        };

        // --------- EMAIL (regex) ------------
        let regEmail = /\S+@\S+\.\S+/;
        if (!regEmail.test(email.value)) {
            errors.push("Debe ingresar un email válido");
            email.classList.add("is-invalid");
        } else {
            email.classList.add("is-valid");
            email.classList.remove("is-invalid");
            register.password.focus();
        };

        // --------- PASSWORD ------------
        if (password.value == "") {
            errors.push("El campo contraseña no puede estar vacío");
            password.classList.remove("is-valid");
            password.classList.add("is-invalid");
        } else if (password.value.length < 8) {
            errors.push("El campo contraseña debe tener al menos 8 caracteres");
            password.classList.remove("is-valid");
            password.classList.add("is-invalid");
        } else {
            password.classList.add("is-valid");
            password.classList.remove("is-invalid");
        };

        // --------- IMAGE ------------
        
        if (image.value.length == 0) {
        errors.push ("El campo de imagen no puede estar vacío");
        }

        let acceptedExtensions = ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG'];
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
            alert("La validación fue exitosa")
            register.submit();
        }
    })



})
