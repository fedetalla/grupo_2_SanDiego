const fs = require('fs');
const path = require('path');
const { config } = require('process');
const db = require('../database/models');
const {validationResult} = require ('express-validator');
const {raw} = require("express")

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

    productSkates: (req, res) => {
		db.Product.findAll({
			includes: [{association: "productsCategory"}]
		})
		.then(products=>{
            let finalProducts = products.filter(product => product.category_id == 1)
                    res.render("productSkate", {products: finalProducts})
                }
		)
		.catch (error => {
            res.send (error)
        })
    },
    productAccessories: (req,res) => {
        db.Product.findAll({
			includes: [{association: "productsCategory"}]
		})
		.then(products=>{
            let finalProducts = products.filter(product => product.category_id == 2)
                    res.render("productAccessories", {products: finalProducts})
                }
		)
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
			return res.render('productEditForm',{ product, allCategories: category})
		})
		.catch (error => {
            res.send (error)
        })
    },
    update: function (req,res) {
        let errors = validationResult(req);    
        if (!errors.isEmpty()) {
            let productRequired = db.Product.findByPk(req.params.id, { include: ["categories"] });
		    let categoryRequired = db.Category.findAll()
            Promise.all([productRequired, categoryRequired])
            .then(function ([product, category]){
                return res.render ("productEditForm", {product, allCategories: category, errors: errors.mapped(), oldData: req.body});
            })
        } else {
            let product = db.Product.findByPk(req.params.id);
            db.Product.update ({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description,
                image: req.file ? req.file.filename : product.image
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then( () => {
                return res.redirect ("/");
            })
            .catch (error => {
                res.send (error)
            })
        }
    },

    create: (req,res) => {
        return res.render("productCreateForm")
    },
	store: function (req,res) {
        let resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            res.render('productCreateForm', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }else{
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
            }
    
	},

    destroy: function (req,res) {
        db.Product.destroy({
            where: {id: req.params.id}})
            .then(() =>{
                return res.redirect('/products')
            })
    }
}



module.exports = productsController;
