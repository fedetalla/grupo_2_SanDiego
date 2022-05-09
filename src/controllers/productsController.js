const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/dataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {

    index: (req, res) => {
        res.render("productos", {products});
    },
    detalleProducto: (req, res) => {
        return res.render("productDetail")
    },
    carrito: (req, res) => {
        return res.render("productCart")
    },
    edit: (req,res) =>{
        return res.render("productEditForm")
    },
    create: (req,res) => {
        return res.render("productCreateForm")
    },
    list:(req,res) => {
        return res.render("ProductList")
    },


}

module.exports = productsController;
