const express = require("express");

const router = express.Router();

const productsController = require("../controllers/productsController.js")
const authMiddleware = require('../middlewares/authMiddleware')
const path = require('path')

const multer = require('multer')


// ************ multer config ************
const storage=multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, './public/img/productos')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage})

// inicio
router.get("/", productsController.index);
router.get("/skates", productsController.productSkates);
router.get("/accessories", productsController.productAccessories);

// carrito
router.get("/cart", authMiddleware, productsController.carrito);

// detalle de producto
router.get("/:id/detail", productsController.detalleProducto);

//******* edicion de producto *********/
router.get("/edit/:id", authMiddleware, productsController.edit);
router.patch("/edit/:id", upload.single('product-image'), productsController.update)

//******* creación de producto *********/
router.get("/create", authMiddleware,productsController.create);
router.post("/create",upload.single('product-image') ,productsController.store);

//******* borrado de producto *********/
router.post('/delete/:id', productsController.destroy);



module.exports = router;