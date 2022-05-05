const express = require("express");

const router = express.Router();

const productsController = require("../controllers/productsController.js")

router.get("/detalle", productsController.detalleProducto);
router.get("/carrito", productsController.carrito);
router.get('/edit', productsController.edit)


module.exports = router;