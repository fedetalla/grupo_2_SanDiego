const db = require('../../database/models');

const productsAPIController = {
    'list': (req, res) => {
        db.Product.findAll({include: ['categories']})
        .then(products => {
            let skates = 0
            let accesorios = 0
            let productos = []
            products.forEach(product => {
                let finalProduct = {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    dbRelation: [
                        product.categories.name
                    ],
                    detail: 'http://localhost:3080/api/products/' + product.id
                }
                if(product.category_id === 1){
                    skates = skates + 1
                }else{
                    accesorios = accesorios + 1
                }
                productos.push(finalProduct)
            })
            let respuesta = {
                count: products.length,
                // meta: {
                //     status : 200,
                //     url: 'api/products'
                // },
                countByCategory: {
                    Skates: skates,
                    Accesorios: accesorios
                },
                products: productos
                 
            }
                res.json(respuesta);
            })
    },
    'detail': (req, res) => {
        db.Product.findByPk(req.params.id, {include: ['categories']} )
            .then(product => {
                let respuesta = {
                    product:{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                    category: product.categories.name},
                    dbRelation: [
                        'categoryId'
                    ],
                    imageURL: '/public/img/productos/' + product.image
                }
                res.json(respuesta);
            });
    }
}

module.exports = productsAPIController;