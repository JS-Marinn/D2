import express from 'express';
const router = express.Router();
import { registrar, autenticar } from "../controllers/usuarioController.js";
import logAdminAction from '../middleware/logger.js';

// Registro de usuarios y autenticación
router.post('/', registrar); // Registrar nuevo usuario
router.post('/login', autenticar); // Iniciar sesión

// Aplicar middleware para registrar acciones de administradores
router.use(logAdminAction);

export default router;
