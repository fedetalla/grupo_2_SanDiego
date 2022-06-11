const fs = require('fs');
const path = require("path");
//importamos el modelo de usuarios para utilizar los métodos que definimos
const User = require('../models/User');
const bcryptjs = require('bcrypt');
const {validationResult} = require ('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    register: (req, res) => {
        return res.render("register")
    },
    processRegister:(req, res) => {
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
    
    let userInDB = User.findByField('email', req.body.email)

        if(userInDB){
            return res.render('register', {
                errors: {
                    email: {
                        msg:'Este email ya está registrado' 
                    }
                },
                oldData: req.body
            })
        }
        let userToCreate = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            category: req.body.category,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file ? req.file.filename : 'default-image.png'
        }
            User.create(userToCreate)
        return res.send('Tu formulario se procesó con éxito :)')
        
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
                res.redirect('/users/profile')
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
    }
}

module.exports = usersController;