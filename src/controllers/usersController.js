const path = require("path");

const usersController = {

    login: (req, res) => {
        return res.render("login")
    },
    register: (req, res) => {
        return res.render("register")
    },

}

module.exports = usersController;