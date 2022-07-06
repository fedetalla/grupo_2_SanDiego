const fs = require('fs');
const path = require('path');
const { config } = require('process');
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
		db.Product.findByPk(req.params.id, {
            include: [{association: 'categories'}]
        })
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
		let productRequired = db.Product.findByPk(req.params.id, { include: ["categories"] });
		let categoryRequired = db.Category.findAll()
		Promise.all([productRequired, categoryRequired])
		.then(([product, category])=>{
			return res.render('productEditForm',{product: product, allCategories: category})
		})
		.catch (error => {
            res.send (error)
        })
    },
    update: function (req,res) {
        db.Product.update({
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
			description: req.body.description,
			// image: req.file ? req.file.filename : 'default-image.png'
        }, {
            where: {id: req.params.id}
        })
    .then (()=>{
        return res.redirect('/products')
    })
	.catch (error => {
		res.send (error)
	})
	},
    create: (req,res) => {
        return res.render("productCreateForm")
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

    destroy: function (req,res) {
        let confirmDelete = confirm('¿Estás seguro de que quieres borrar este producto?')
        if(confirmDelete == true){
        db.Product.destroy({
            where: {id: req.params.id}
            .then(() =>{
                return res.redirect('/products')
            })
        })
        }else{
            return res.redirect('/products')
        }   
    }
}



module.exports = productsController;
