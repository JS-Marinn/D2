// pedidoRoutes.js
import express from 'express';
const router = express.Router();
import { registrarPedido, obtenerPedidos, eliminarPedido } from '../controllers/pedidoController.js';
import { verificarAutenticacion, verificarAdministrador } from '../middleware/auth.js';

// Rutas para pedidos
router.post('/', verificarAutenticacion, registrarPedido);
router.get('/', verificarAutenticacion, verificarAdministrador, obtenerPedidos);
router.delete('/:id', verificarAutenticacion, verificarAdministrador, eliminarPedido);

export default router;