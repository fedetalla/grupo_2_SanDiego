const fs = require('fs');
const path = require('path');
const db = require('../database/models');


const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {

    index: (req, res) => {
		db.Product.findAll({
			includes: [{association: "productsCategory"}]
		})
		.then(products=>{
			res.render("productos", {products});
		})
		.catch (error => {
            res.send (error)
        })
    },
    detalleProducto: (req, res) => {
		db.Product.findByPk(req.params.id)
		.then(product=>{
			return res.render('productDetail',{product})
		})
		.catch (error => {
            res.send (error)
        })
    },
    carrito: (req, res) => {
        return res.render("productCart")
    },
    edit: (req,res) =>{
		db.Product.findByPk(req.params.id)
		.then(product=>{
			return res.render('productEditForm',{product})
		})
    },
	update: (req, res) => {
		const id = req.params.id;
		let productToEdit = products.find(product => product.id == id);
		
		let productToSave = {
			id: productToEdit.id,
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
			description: req.body.description,
			image: req.file ? req.file.filename : productToEdit.image
		}

		let indice = products.findIndex(product => {
			return product.id == id
		})
		products[indice] = productToSave;

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		res.redirect("/products")
	},


    create: (req,res) => {
        return res.render("productCreateForm")
    },
    store: (req,res) =>{
        let newProduct = {
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			price: parseInt(req.body.price),
			category_id: req.body.category_id,
			description: req.body.description,
			image: req.file ? req.file.filename : 'default-image.png'
		}
        products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

		res.redirect("/products");
    },
    destroy : (req, res) => {
		const id = req.params.id;
		let finalProducts = products.filter(product => product.id != id);

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect("/products")
	}
}


module.exports = productsController;
