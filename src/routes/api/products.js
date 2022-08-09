const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

//Rutas
//Listado de todos los productos
router.get('/', productsAPIController.list);
// //Detalle del product
router.get('/:id', productsAPIController.detail);

module.exports = router;