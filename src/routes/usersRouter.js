const express = require("express");
const multer = require('multer');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')
    

const usersController = require("../controllers/usersController.js")

//realizamos la configuración de multer, indicando nombre y donde se van a guardar las imágenes
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, './public/img/users');
    },
    filename: (req,file,cb)=>{
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

const uploadFile = multer({storage})

const { body } = require('express-validator')

// Definimos las validaciones correspondientes al register
const validations = [
    body('fullName').notEmpty().withMessage('Tienes que escribir un nombre')
    .isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),
<<<<<<< HEAD
    // body('category').notEmpty().withMessage('Tienes que seleccionar una categoría'),
=======
    body('category_id').notEmpty().withMessage('Tienes que seleccionar una categoría'),
>>>>>>> 2c1faf7003555d70a21753666c3ff783b57e24d4
    body('email') .notEmpty().withMessage('Por favor, escribe un correo electrónico')
    .isEmail().withMessage('Tienes que escribir un correo electrónico válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña')
    .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('image').custom((value, {req}) => {
        let file = req.file;
        let extensionsAccepted = [ '.png', '.jpg', '.jpeg', '.gif' ];
        
        if(file){
            // throw new Error('Tienes que subir una imagen')
        let fileExtension = path.extname(file.originalname)
        if(!extensionsAccepted.includes(fileExtension)){
            throw new Error('Las extensiones permitidas son: ".png", ".jpg" , ".jpeg" , ".gif" ');
        }
    }
        return true
    })
]

// LOGIN
router.get("/login", guestMiddleware, usersController.login);
router.post("/login", usersController.processLogin);

// REGISTER
router.get("/register", guestMiddleware, usersController.register);
router.post("/register", uploadFile.single('image'), validations , usersController.processRegister);

// PERFIL
router.get("/profile", authMiddleware, usersController.profile);

// EDICIÓN DEL PERFIL
router.get("/profile/edit", authMiddleware, usersController.editProfile);
router.post("/profile/edit", authMiddleware, uploadFile.single('image'),  usersController.processEdit);

// LOGOUT
router.get('/logout/', usersController.logout);

module.exports = router ;