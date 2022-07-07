const fs = require('fs');
const path = require("path");
//importamos el modelo de usuarios para utilizar los métodos que definimos
const User = require('../models/User');
const bcryptjs = require('bcrypt');
const {validationResult} = require ('express-validator');
const db = require('../database/models');


const usersController = {
    register: (req, res) => {
        return res.render("register")
    },
    store: function (req,res) {
        db.Product.create({
            name: req.body.name,
			price: req.body.price,
	 		category_id: req.body.category_id,
	 		description: req.body.description,
	 		image: req.file ? req.file.filename : 'default-image.png'
        })
	.then(()=>{
    return res.redirect('/products')
	})
	.catch (error => {
	res.send (error)
	})
    },
    processRegister:(req, res) => {
        db.User.findOne({where: {email: req.body.email}})
        .then((userInDB)=>{
            console.log(userInDB)
            if(userInDB === null){
                const resultValidation = validationResult(req);
            if(resultValidation.errors.length > 0){
                res.render('register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                })
            }else{
                db.User.create({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    category: req.body.category,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    image: req.file ? req.file.filename : 'default-image.png'
                })
                .then(()=>{
                     return res.redirect('/users/profile')})
            }
        }else{
                return res.render('register', {
                    errors: {
                        email: {
                            msg:'Este email ya está registrado' 
                        }
                    },
                    oldData: req.body
                })
            }
        })
        
    },
    
    login: (req, res) => {
        return res.render("login")
    },
    processLogin: (req,res) => {
        let userToLog = User.findByField('email', req.body.email)
        if(userToLog){
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLog.password);
            if(isOkThePassword){
                delete userToLog.password
                req.session.userLogged = userToLog;
                
                if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

                return res.redirect('/users/profile')
            }
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: 'Credenciales inválidas'
                }
            }
    })
    },
    profile: (req,res)=>{
        return res.render("userProfile", {user : req.session.userLogged})
    },
    
    logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = usersController;