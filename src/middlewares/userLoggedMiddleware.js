const db = require('../database/models');

function userLoggedMiddleware (req,res,next){

     res.locals.isLogged = false;
        // Ponemos la variable isLogged en false por defecto, en caso que 
        // haya alguien logueado se cambiará a true.

     let emailInCookie = ''
     if(req.cookies.userEmail){
         emailInCookie = req.cookies.userEmail;
     }

     db.User.findOne( {where: {email: emailInCookie}} )
     .then((userFromCookie) => {
        // Si habia cookies del cliente, esto nos devolvería el cliente, y lo guardamos en session.
         if(userFromCookie){
             req.session.userLogged = userFromCookie
            }
            
        // Si hay un usuario logueado, ya sea por las cookies o porque acaba 
        // de loguearse en el método login del controlador (que tambien guarda en session al usuario)
        // nos encargamos de guardarlo en locals para poder acceder a esta información en cualquier
        // parte del proyecto

        if(req.session && req.session.userLogged){
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }
        next();
    })
    .catch(error=>{
        res.send(error)
    })
}

module.exports = userLoggedMiddleware;



    // acá usamos una logica para mostrar el register/login
    // en la navbar del header si el usuario no esta registrado,
    // o si está registrado que se vea solo el profile

//     // se hace con un if en el form de profile

