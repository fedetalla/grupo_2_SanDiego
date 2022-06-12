const User = require('../models/User');

function userLoggedMiddleware (req,res,next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
	let userFromCookie = User.findByField('email', emailInCookie);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    // acá usamos una logica para mostrar el register/login
    // en la navbar del header si el usuario no esta registrado,
    // o si está registrado que se vea solo el profile

    // se hace con un if en el form de profile
    next();
}

module.exports = userLoggedMiddleware;