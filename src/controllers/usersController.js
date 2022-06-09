const fs = require('fs');
const path = require("path");
const User = require('../models/User');
const bcryptjs = require('bcrypt');
const {validationResult} = require ('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

    login: (req, res) => {
        return res.render("login")
    },
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
    
    let userInDB = User.findByField("email", req.body.email)

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
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file.filename
        }
            User.create(userToCreate)
        return res.send('Tu formulario se procesó con éxito :)')
    },
    profile: (req,res)=>{
        return res.render("userProfile", {users})
    }
}

module.exports = usersController;