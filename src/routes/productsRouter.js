const express = require("express");

const router = express.Router();

const productsController = require("../controllers/productsController.js")



router.get("/", productsController.index);
router.get("/detalle", productsController.detalleProducto);
router.get("/carrito", productsController.carrito);
router.get('/edit', productsController.edit);
router.get('/create', productsController.create)


module.exports = router;