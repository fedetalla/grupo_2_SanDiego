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

//validations
const { body } = require('express-validator')

// Definimos las validaciones correspondientes al register
const productsValidations = [
    body('name').notEmpty().withMessage('Tienes que escribir el nombre del producto')
    .isLength({min: 5}).withMessage('El nombre del producto debe tener al menos 5 caracteres'),
    body('category_id').notEmpty().withMessage('Tienes que seleccionar una categoría'),
    body('price').notEmpty().withMessage('Tienes que ponerle un precio al producto'),
    body('description').notEmpty().withMessage('Tienes que escribir una descripción')
    .isLength({min: 20}).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('productImage').custom((value, {req}) => {
        let file = req.file;
        let extensionsAccepted = [ '.png', '.jpeg','.jpg' , '.gif' ];
        
        if(!file){
            throw new Error('Tienes actualizar la imagen')
        }else{
        let fileExtension = path.extname(file.originalname)
        if(!extensionsAccepted.includes(fileExtension)){
            throw new Error('Las extensiones permitidas son: ".png", ".jpeg" , ".jpg" , ".gif" ');
        }
    }
        return true
    })
]


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
router.patch("/edit/:id", upload.single('productImage'),productsValidations , productsController.update)

//******* creación de producto *********/
router.get("/create", authMiddleware,productsController.create);
router.post("/create",upload.single('productImage'), productsValidations ,productsController.store);

//******* borrado de producto *********/
router.post('/delete/:id', productsController.destroy);



module.exports = router;