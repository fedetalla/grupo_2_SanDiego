function guestMiddleware(req, res, next){
    if(req.session.userLogged != null){
        return res.redirect('/users/profile')
    }
    next();
}

module.exports = guestMiddleware;