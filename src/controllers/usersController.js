const fs = require('fs');
const path = require("path");
const bcryptjs = require('bcrypt');
const {validationResult} = require ('express-validator');
const db = require('../database/models');
const { raw } = require('express');
const { traceDeprecation } = require('process');


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
            if(userInDB == null){
                const resultValidation = validationResult(req);
            if(resultValidation.errors.length > 0){
                // console.log(resultValidation.errors)
                res.render('register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                })
            }else{
                db.User.create({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    category_id: req.body.category_id,
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
        db.User.findOne({
            where: {email: req.body.email}, 
            include: ["userCategory"]})
        .then(userToLog=>{
            let user = JSON.stringify(userToLog)
            let userFinal = JSON.parse(user)
            if(userFinal != null){
                let isOkThePassword = bcryptjs.compareSync(req.body.password, userFinal.password);
                if(isOkThePassword){
                     //sin la contraseña para guardarlo en la sesion
                    delete userFinal.password
                    req.session.userLogged = userFinal;
                    if(req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }
                    return res.redirect('/users/profile') 
                }
            } return res.render('login', {
                    errors: {
                        email: {
                            msg: 'Credenciales inválidas'
                        }
                    }
            })
        })
        .catch (error => {
            res.send (error)
        })

    },
    profile: (req,res)=>{
        return res.render("userProfile")
    },
    editProfile: (req,res)=>{
        db.UserCategory.findAll()
        .then((categories)=>{
             res.render ('userProfileEdit', {categories: categories})
        })
        .catch (error => {
            res.send (error)
        })
    },
    processEdit: (req,res)=>{
        db.User.update({
            fullName: req.body.fullName,
            email: req.body.email,
            category: req.body.category,
            image: req.file ? req.file.filename : req.session.userLogged.image
            },  
            {
            where: {id: req.session.userLogged.id}
            })
            .then(() =>{
                db.User.findOne({
                    where: {id: req.session.userLogged.id},
                    include: ["userCategory"]})
                    .then(userFinal => {
                        req.session.userLogged = userFinal.dataValues
                        return res.redirect('/users/profile')
                    })

                
            })
            .catch((error) => {
                console.log(error)
            })
    },
    
    logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = usersController;