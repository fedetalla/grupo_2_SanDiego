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
router.get("/cart", productsController.carrito);
router.get("/:id/detail", productsController.detalleProducto);
//******* Edit Product *********/
router.get("/edit/:id", productsController.edit);
router.patch("/edit/:id", upload.single('product-image'), productsController.update)

//******* Create Product *********/
router.get("/create", productsController.create);
router.post("/create",upload.single('product-image') ,productsController.store);


//******* Delete Product *********/
router.delete('/delete/:id', productsController.destroy);



module.exports = router;