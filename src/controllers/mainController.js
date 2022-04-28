const path = require("path");

const mainController = {

    index: (req, res) => {
        return res.render("index")
    },

}

module.exports = mainController;
