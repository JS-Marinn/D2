import express from 'express';
import { agregarProducto, obtenerProductos } from '../controllers/productController.js';  // Controladores que vamos a crear

const router = express.Router();

// Ruta para agregar un nuevo producto (solo administradores)
router.post('/', agregarProducto);

// Ruta para obtener todos los productos
router.get('/', obtenerProductos);

export default router;