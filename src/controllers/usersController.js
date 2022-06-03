const fs = require('fs');
const path = require("path");

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
        return res.send("Se procesó tu formulario con éxito")
    },
    profile: (req,res)=>{
        return res.render("userProfile", {users})
    }
}

module.exports = usersController;