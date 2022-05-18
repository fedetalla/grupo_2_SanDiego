const express = require("express");

const router = express.Router();

const productsController = require("../controllers/productsController.js")

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


router.get("/", productsController.index);
router.get("/detail/:id", productsController.detalleProducto);
router.get("/cart", productsController.carrito);

router.get('/edit/:id', productsController.edit);

//******* Create Product *********/
router.get('/create', productsController.create)
router.post('/create',upload.single('product-image') ,productsController.store);
router.get('/list', productsController.list)

module.exports = router;