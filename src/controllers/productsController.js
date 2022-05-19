const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {

    index: (req, res) => {
        res.render("productos", {products});
    },
    detalleProducto: (req, res) => {
        let id = req.params.id;
        let product = products.find(product=> product.id == id);
       return res.render('productDetail',{product})
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
    store: (req,res) =>{
        let newProduct = {
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			price: parseInt(req.body.price),
			category: req.body.category,
			description: req.body.description,
			image: req.file ? req.file.filename : 'default-image.png'
		}
        products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

		res.redirect("/products");
        
    },
    list:(req,res) => {
        return res.render("ProductList")
    },


}

module.exports = productsController;
