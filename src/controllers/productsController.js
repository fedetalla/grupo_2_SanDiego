
const productsController = {

    detalleProducto: (req, res) => {
        return res.render("productDetail")
    },
    carrito: (req, res) => {
        return res.render("productCart")
    },
    edit: (req,res) =>{
        return res.render("productEditForm")
    }

}

module.exports = productsController;
